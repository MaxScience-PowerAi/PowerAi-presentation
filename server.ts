import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("applications.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    role TEXT,
    status TEXT,
    understanding TEXT,
    contribution TEXT,
    ai_assessment TEXT,
    moderation_status TEXT DEFAULT 'pending',
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    role TEXT,
    bio TEXT,
    image_url TEXT,
    is_founder INTEGER DEFAULT 0,
    has_star INTEGER DEFAULT 0,
    joined_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed all 8 founders if not exists
const foundersCount = db.prepare("SELECT COUNT(*) as count FROM members WHERE is_founder = 1").get() as { count: number };
if (foundersCount.count === 0) {
  const insertMember = db.prepare("INSERT INTO members (name, role, bio, image_url, is_founder, has_star) VALUES (?, ?, ?, ?, ?, ?)");

  const founders = [
    { name: "Maxime (Christ Lowe)", role: "L'Alchimiste Fondateur", bio: "Membre fondateur de la grande communauté qui souhaite innover l'intelligence artificielle en Afrique, plus précisément au Cameroun.", img: "maxime-profile.png" }
  ];

  // Using ui-avatars to generate nice initial avatars for the magical UI
  for (const f of founders) {
    const parts = f.name.split(' ');
    const initials = parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : parts[0][0];
    const imageUrl = `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff&size=400&font-size=0.4&bold=true`;
    insertMember.run(f.name, f.role, f.bio, imageUrl, 1, 1);
  }
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT || 3000);
  const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  const founderPasswords = (process.env.FOUNDER_PASSWORDS || "")
    .split(",")
    .map((password) => password.trim().toLowerCase())
    .filter(Boolean);

  if (founderPasswords.length === 0) {
    throw new Error("Missing FOUNDER_PASSWORDS environment variable. Refusing to start with insecure defaults.");
  }

  // Restrictive CORS configuration (explicit allowlist)
  app.use(cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("CORS blocked for origin"));
    },
    credentials: true,
    methods: ["GET", "POST", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-founders-password", "Accept", "Origin"]
  }));

  app.use(express.json({ limit: "30kb" }));

  const isValidEmail = (value: string) => /^\S+@\S+\.\S+$/.test(value);
  const normalizeText = (value: unknown, maxLength: number) => {
    if (typeof value !== "string") return "";
    return value.trim().slice(0, maxLength);
  };

  const normalizeApplicationPayload = (payload: any) => {
    const candidate = {
      name: normalizeText(payload?.name, 120),
      email: normalizeText(payload?.email, 200),
      role: normalizeText(payload?.role, 120),
      status: normalizeText(payload?.status, 300),
      understanding: normalizeText(payload?.understanding, 2000),
      contribution: normalizeText(payload?.contribution, 2000),
      ai_assessment: normalizeText(payload?.ai_assessment, 1000),
    };

    if (!candidate.name || !candidate.email || !candidate.role) {
      return { error: "Missing required fields" };
    }

    if (!isValidEmail(candidate.email)) {
      return { error: "Invalid email format" };
    }

    return { value: candidate };
  };

  const checkPassword = (req: express.Request) => {
    const headerPassword = (req.headers["x-founders-password"] as string)?.trim().toLowerCase();
    const bodyPassword = req.body?.password?.trim().toLowerCase();

    const provided = bodyPassword || headerPassword;
    if (!provided) return false;

    return founderPasswords.includes(provided);
  };

  // API Routes
  app.post("/api/applications", (req, res) => {
    const result = normalizeApplicationPayload(req.body);
    if (result.error || !result.value) {
      return res.status(400).json({ error: result.error || "Invalid payload" });
    }

    const { name, email, role, status, understanding, contribution, ai_assessment } = result.value;
    try {
      const stmt = db.prepare(`
        INSERT INTO applications (name, email, role, status, understanding, contribution, ai_assessment)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      stmt.run(name, email, role, status, understanding, contribution, ai_assessment);
      res.json({ success: true });
    } catch (error) {
      console.error("Error saving application:", error);
      res.status(500).json({ error: "Failed to save application" });
    }
  });

  app.patch("/api/applications/:id", (req, res) => {
    if (!checkPassword(req)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { id: idParam } = req.params;
    const { moderation_status } = req.body;
    const id = Number(idParam);

    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "Invalid application id" });
    }

    if (moderation_status !== "accepted" && moderation_status !== "rejected") {
      return res.status(400).json({ error: "Invalid moderation_status" });
    }

    try {
      const updateStmt = db.prepare("UPDATE applications SET moderation_status = ? WHERE id = ?");
      updateStmt.run(moderation_status, id);

      if (moderation_status === 'accepted') {
        const app = db.prepare("SELECT * FROM applications WHERE id = ?").get(id) as any;
        if (app) {
          const existing = db.prepare("SELECT id FROM members WHERE name = ?").get(app.name);
          if (!existing) {
            const initials = app.name.slice(0, 2).toUpperCase();
            const imageUrl = `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff&size=400`;
            const insertMember = db.prepare("INSERT INTO members (name, role, bio, image_url, has_star) VALUES (?, ?, ?, ?, ?)");
            insertMember.run(
              app.name,
              app.role || 'Membre',
              app.contribution || app.understanding || '',
              imageUrl,
              1
            );
          }
        }
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Error updating application:", error);
      res.status(500).json({ error: "Failed to update application" });
    }
  });

  app.post("/api/founders/login", (req, res) => {
    if (checkPassword(req)) {
      try {
        const applications = db.prepare("SELECT * FROM applications ORDER BY submitted_at DESC").all();
        res.json({ success: true, applications });
      } catch (error) {
        console.error("Error fetching applications:", error);
        res.status(500).json({ error: "Failed to fetch applications" });
      }
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  });

  app.get("/api/members", (req, res) => {
    try {
      const members = db.prepare("SELECT * FROM members ORDER BY is_founder DESC, joined_at ASC").all();
      res.json(members);
    } catch (error) {
      console.error("Error fetching members:", error);
      res.status(500).json({ error: "Failed to fetch members" });
    }
  });

  app.get("/api/applications", (req, res) => {
    if (!checkPassword(req)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const applications = db.prepare("SELECT * FROM applications ORDER BY submitted_at DESC").all();
      res.json(applications);
    } catch (error) {
      console.error("Error fetching applications:", error);
      res.status(500).json({ error: "Failed to fetch applications" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
