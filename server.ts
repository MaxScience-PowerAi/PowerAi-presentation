import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

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

// Seed founders if not exists
const foundersCount = db.prepare("SELECT COUNT(*) as count FROM members WHERE is_founder = 1").get() as { count: number };
if (foundersCount.count === 0) {
  const insertMember = db.prepare("INSERT INTO members (name, role, bio, image_url, is_founder) VALUES (?, ?, ?, ?, ?)");
  insertMember.run("Lowe Christ", "Expert Technique & IA", "Visionnaire technologique spécialisé dans le développement de solutions d'intelligence artificielle avancées.", "https://picsum.photos/seed/lowe/400/400", 1);
  insertMember.run("Wilfred Kouam", "Stratégie & Partenariats", "Expert en développement stratégique et gestion des relations institutionnelles.", "https://picsum.photos/seed/wilfred/400/400", 1);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/applications", (req, res) => {
    const { name, email, role, status, understanding, contribution, ai_assessment } = req.body;
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
    const headerPassword = (req.headers["x-founders-password"] as string)?.trim();
    const bodyPassword = req.body.password?.trim();
    const password = bodyPassword || headerPassword;

    if (password !== "PowerAi_Founders_2026!") {
      console.warn(`Unauthorized moderation attempt with password: ${password}`);
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { id } = req.params;
    const { moderation_status } = req.body;

    try {
      const updateStmt = db.prepare("UPDATE applications SET moderation_status = ? WHERE id = ?");
      updateStmt.run(moderation_status, id);

      if (moderation_status === 'accepted') {
        const app = db.prepare("SELECT * FROM applications WHERE id = ?").get() as any;
        const insertMember = db.prepare("INSERT INTO members (name, role, bio, image_url, has_star) VALUES (?, ?, ?, ?, ?)");
        insertMember.run(app.name, app.role, app.contribution, `https://picsum.photos/seed/${app.name}/400/400`, 1);
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Error updating application:", error);
      res.status(500).json({ error: "Failed to update application" });
    }
  });

  app.post("/api/founders/login", (req, res) => {
    const { password } = req.body;
    const trimmedPassword = password?.trim();
    
    if (trimmedPassword === "PowerAi_Founders_2026!") {
      try {
        const applications = db.prepare("SELECT * FROM applications ORDER BY submitted_at DESC").all();
        res.json({ success: true, applications });
      } catch (error) {
        console.error("Error fetching applications:", error);
        res.status(500).json({ error: "Failed to fetch applications" });
      }
    } else {
      console.warn(`Unauthorized login attempt with password: ${trimmedPassword}`);
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
    const password = (req.headers["x-founders-password"] as string)?.trim();
    if (password !== "PowerAi_Founders_2026!") {
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
