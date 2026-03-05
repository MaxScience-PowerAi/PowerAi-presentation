import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShieldAlert, Eye, EyeOff, LogOut, RefreshCw,
    X, Star, Bot, CheckCircle, Clock, XCircle,
    Users, BarChart3, UserCheck, Briefcase, GraduationCap,
    Key, Loader2, AlertCircle
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface Application {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    understanding: string;
    contribution: string;
    ai_assessment: string;
    moderation_status: 'pending' | 'accepted' | 'rejected';
    submitted_at: string;
}

interface Member {
    id: number;
    name: string;
    role: string;
    bio: string;
    image_url: string;
    is_founder: number;
    has_star: number;
    joined_at: string;
}

interface FoundersPortalProps {
    t: any;
    lang: 'fr' | 'en';
    onBack: () => void;
    theme: string;
}

function cn(...cls: (string | false | undefined | null)[]) {
    return cls.filter(Boolean).join(' ');
}

export const FoundersPortal = ({ t, lang, onBack, theme }: FoundersPortalProps) => {
    const [password, setPassword] = useState('');
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [applications, setApplications] = useState<Application[]>([]);
    const [members, setMembers] = useState<Member[]>([]);
    const [activeTab, setActiveTab] = useState<'analytics' | 'applications' | 'members'>('analytics');
    const [moderating, setModerating] = useState<number | null>(null);
    const [storedPassword, setStoredPassword] = useState('');

    // Try auto-login from sessionStorage on mount
    useEffect(() => {
        const saved = sessionStorage.getItem('powerai_founder_key') || '';
        if (saved) {
            setPassword(saved);
            setStoredPassword(saved);
            loginWith(saved);
        }
    }, []);

    const loginWith = async (pass: string) => {
        if (!pass.trim()) return;
        setLoading(true);
        setLoginError(null);
        try {
            const resp = await fetch('/api/founders/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: pass.trim() }),
            });
            if (resp.ok) {
                const data = await resp.json();
                setApplications(data.applications || []);
                setIsAuthorized(true);
                sessionStorage.setItem('powerai_founder_key', pass.trim());
                fetchMembers();
            } else {
                sessionStorage.removeItem('powerai_founder_key');
                setLoginError(t.report.communityPortal.foundersPortal.error);
            }
        } catch {
            setLoginError(lang === 'fr' ? 'Erreur de connexion au serveur.' : 'Server connection error.');
        } finally {
            setLoading(false);
        }
    };

    const fetchMembers = async () => {
        try {
            const resp = await fetch('/api/members');
            if (resp.ok) setMembers(await resp.json());
        } catch { /* silent */ }
    };

    const fetchApplications = async () => {
        try {
            const resp = await fetch('/api/founders/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: storedPassword || password }),
            });
            if (resp.ok) {
                const d = await resp.json();
                setApplications(d.applications || []);
            }
        } catch { /* silent */ }
        await fetchMembers();
    };

    const handleModeration = async (id: number, status: 'accepted' | 'rejected') => {
        setModerating(id);
        try {
            const pass = storedPassword || password;
            const resp = await fetch(`/api/applications/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'x-founders-password': pass },
                body: JSON.stringify({ moderation_status: status, password: pass }),
            });
            if (resp.ok) {
                setApplications(prev =>
                    prev.map(a => a.id === id ? { ...a, moderation_status: status } : a)
                );
                if (status === 'accepted') {
                    await fetchMembers();
                }
            }
        } catch { /* ignore */ }
        setModerating(null);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('powerai_founder_key');
        setIsAuthorized(false);
        setPassword('');
        setStoredPassword('');
        setApplications([]);
    };

    // ─── Login Screen ───────────────────────────────────────────────
    if (!isAuthorized) {
        return (
            <div className="min-h-[85vh] flex items-center justify-center px-4">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">
                    <Card className="p-10 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-cyan-700" />
                        <div className="w-16 h-16 mx-auto mb-6 bg-cyan-500/10 rounded-2xl flex items-center justify-center">
                            <ShieldAlert size={32} className="text-cyan-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                            {t.report.communityPortal.foundersPortal.login}
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-zinc-500 uppercase tracking-widest mb-8">
                            {t.report.communityPortal.foundersPortal.title}
                        </p>

                        <div className="relative mb-4">
                            <Key size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-600" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={e => { setPassword(e.target.value); setLoginError(null); }}
                                onKeyDown={e => e.key === 'Enter' && loginWith(password)}
                                placeholder={t.report.communityPortal.foundersPortal.password}
                                className="w-full pl-10 pr-12 py-4 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-center text-slate-900 dark:text-white focus:border-cyan-500 outline-none transition-colors text-sm font-mono tracking-widest"
                            />
                            <button
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-600 hover:text-slate-700 dark:hover:text-zinc-300"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>

                        <AnimatePresence>
                            {loginError && (
                                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="flex items-center justify-center gap-2 text-xs text-red-600 dark:text-red-400 mb-4">
                                    <AlertCircle size={12} /> {loginError}
                                </motion.p>
                            )}
                        </AnimatePresence>

                        <Button className="w-full" onClick={() => { setStoredPassword(password); loginWith(password); }} isLoading={loading}>
                            <Key size={16} className="mr-2" />
                            {t.report.communityPortal.foundersPortal.enter}
                        </Button>

                        <button onClick={onBack} className="mt-6 text-xs text-slate-400 hover:text-slate-700 dark:hover:text-zinc-300 transition-colors">
                            ← {t.report.communityPortal.onboarding.back}
                        </button>
                    </Card>
                </motion.div>
            </div>
        );
    }

    // ─── Analytics data ───────────────────────────────────────────────
    const fp = t.report.communityPortal.foundersPortal;
    const pending = applications.filter(a => a.moderation_status === 'pending');
    const accepted = applications.filter(a => a.moderation_status === 'accepted');
    const rejected = applications.filter(a => a.moderation_status === 'rejected');
    const students = applications.filter(a => a.role?.toLowerCase().match(/etud|stud/));
    const workers = applications.filter(a => !a.role?.toLowerCase().match(/etud|stud/));

    const pieData = [
        { name: fp.analytics.studentRatio, value: students.length, color: '#22d3ee' },
        { name: fp.analytics.workerRatio, value: workers.length, color: '#f97316' },
    ];

    const tabs = [
        { id: 'analytics', label: fp.analytics.title, icon: BarChart3 },
        { id: 'applications', label: 'Candidatures', icon: Users },
        { id: 'members', label: fp.members.title, icon: UserCheck },
    ] as const;

    return (
        <div className="min-h-screen max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{fp.title}</h1>
                    {pending.length > 0 && (
                        <p className="text-xs text-amber-600 dark:text-amber-400 font-bold mt-1">
                            {fp.notifications.newApplications.replace('{count}', String(pending.length))}
                        </p>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={fetchApplications}
                        className="w-9 h-9 rounded-xl border border-slate-200 dark:border-zinc-800 flex items-center justify-center text-slate-500 hover:text-cyan-500 transition-colors">
                        <RefreshCw size={16} />
                    </button>
                    <Button variant="ghost" size="sm" onClick={handleLogout} className="flex items-center gap-2">
                        <LogOut size={14} />
                        {fp.logout}
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-slate-100 dark:bg-zinc-900 rounded-2xl mb-8 w-fit">
                {tabs.map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            'flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all',
                            activeTab === tab.id
                                ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-sm'
                                : 'text-slate-500 dark:text-zinc-500 hover:text-slate-700 dark:hover:text-zinc-300'
                        )}>
                        <tab.icon size={14} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* ── ANALYTICS TAB ── */}
            <AnimatePresence mode="wait">
                {activeTab === 'analytics' && (
                    <motion.div key="analytics" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            {[
                                { label: fp.analytics.totalMembers, value: members.length, icon: Users, color: 'cyan' },
                                { label: fp.analytics.pendingApps, value: pending.length, icon: Clock, color: 'amber' },
                                { label: fp.analytics.studentRatio, value: students.length, icon: GraduationCap, color: 'cyan' },
                                { label: fp.analytics.workerRatio, value: workers.length, icon: Briefcase, color: 'orange' },
                            ].map((stat, i) => (
                                <Card key={i} className="p-6 hover:border-cyan-500/30">
                                    <stat.icon size={20} className={stat.color === 'cyan' ? 'text-cyan-500 mb-3' : stat.color === 'amber' ? 'text-amber-500 mb-3' : 'text-orange-500 mb-3'} />
                                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                                    <p className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-zinc-500 font-bold mt-1">{stat.label}</p>
                                </Card>
                            ))}
                        </div>
                        <Card className="p-8">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-widest">{fp.analytics.distribution}</h3>
                            {applications.length === 0 ? (
                                <p className="text-center text-slate-400 dark:text-zinc-600 py-12 text-sm">{fp.noApplications}</p>
                            ) : (
                                <div className="h-[250px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie data={pieData} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={3} dataKey="value">
                                                {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                                            </Pie>
                                            <Tooltip contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '12px', fontSize: '12px' }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            )}
                        </Card>
                    </motion.div>
                )}

                {/* ── APPLICATIONS TAB ── */}
                {activeTab === 'applications' && (
                    <motion.div key="applications" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="space-y-4">
                        {applications.length === 0 ? (
                            <div className="text-center py-20 text-slate-400 dark:text-zinc-600">
                                <Users size={48} className="mx-auto mb-4 opacity-30" />
                                <p className="text-sm">{fp.noApplications}</p>
                            </div>
                        ) : applications.map(app => (
                            <motion.div key={app.id} layout
                                className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl p-6 space-y-4 shadow-sm dark:shadow-none">
                                <div className="flex justify-between items-start flex-wrap gap-3">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{app.name}</h3>
                                        <p className="text-[10px] text-slate-500 dark:text-zinc-500 uppercase tracking-widest font-bold mt-0.5">{app.role}</p>
                                    </div>
                                    <span className={cn(
                                        'px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border flex items-center gap-1.5',
                                        app.moderation_status === 'accepted' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' :
                                            app.moderation_status === 'rejected' ? 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20' :
                                                'bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-500 border-slate-200 dark:border-zinc-700'
                                    )}>
                                        {app.moderation_status === 'accepted' && <CheckCircle size={10} />}
                                        {app.moderation_status === 'rejected' && <XCircle size={10} />}
                                        {app.moderation_status === 'pending' && <Clock size={10} />}
                                        {fp.actions[app.moderation_status as keyof typeof fp.actions]}
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                                    <div>
                                        <p className="text-slate-400 dark:text-zinc-600 uppercase tracking-widest font-bold mb-1">{fp.table.email}</p>
                                        <p className="text-cyan-700 dark:text-cyan-400 font-mono font-bold break-all">{app.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-400 dark:text-zinc-600 uppercase tracking-widest font-bold mb-1">{fp.table.date}</p>
                                        <p className="text-slate-700 dark:text-zinc-300 font-bold">
                                            {new Date(app.submitted_at).toLocaleString(lang)}
                                        </p>
                                    </div>
                                    {app.understanding && (
                                        <div className="col-span-full">
                                            <p className="text-slate-400 dark:text-zinc-600 uppercase tracking-widest font-bold mb-1">{fp.table.understanding}</p>
                                            <p className="text-slate-700 dark:text-zinc-300 leading-relaxed">{app.understanding}</p>
                                        </div>
                                    )}
                                    {app.contribution && (
                                        <div className="col-span-full">
                                            <p className="text-slate-400 dark:text-zinc-600 uppercase tracking-widest font-bold mb-1">{fp.table.contribution}</p>
                                            <p className="text-slate-700 dark:text-zinc-300 leading-relaxed">{app.contribution}</p>
                                        </div>
                                    )}
                                </div>

                                {app.ai_assessment && (
                                    <div className="p-4 bg-cyan-500/5 border border-cyan-500/10 rounded-2xl text-xs text-cyan-700 dark:text-cyan-400 italic leading-relaxed">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Bot size={12} className="text-cyan-600" />
                                            <span className="font-bold uppercase tracking-widest not-italic">POWER {fp.table.aiAssessment}</span>
                                        </div>
                                        {app.ai_assessment}
                                    </div>
                                )}

                                {app.moderation_status === 'pending' && (
                                    <div className="flex gap-3 pt-2">
                                        <button
                                            onClick={() => handleModeration(app.id, 'accepted')}
                                            disabled={moderating === app.id}
                                            className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"
                                        >
                                            {moderating === app.id ? <Loader2 size={14} className="animate-spin" /> : <Star size={14} fill="currentColor" />}
                                            {fp.actions.accept}
                                        </button>
                                        <button
                                            onClick={() => handleModeration(app.id, 'rejected')}
                                            disabled={moderating === app.id}
                                            className="w-12 h-12 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all border border-red-500/20 flex items-center justify-center disabled:opacity-50"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* ── MEMBERS TAB ── */}
                {activeTab === 'members' && (
                    <motion.div key="members" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                        <p className="text-xs text-slate-500 dark:text-zinc-500 mb-6">{fp.members.membersDesc}</p>
                        {members.length === 0 ? (
                            <div className="text-center py-20 text-slate-400 dark:text-zinc-600">
                                <Users size={48} className="mx-auto mb-4 opacity-30" />
                                <p className="text-sm">Aucun membre pour l'instant.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {members.map(member => (
                                    <motion.div key={member.id} layout
                                        className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-[2rem] p-6 relative overflow-hidden group shadow-sm dark:shadow-none">
                                        {member.is_founder === 1 && (
                                            <div className="absolute top-4 right-4 px-3 py-1 bg-cyan-500 text-white text-[8px] font-black uppercase tracking-[0.2em] rounded-full">
                                                {fp.members.founders}
                                            </div>
                                        )}
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-700 shadow-sm bg-slate-100 dark:bg-zinc-800">
                                                <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                            </div>
                                            <div>
                                                <h3 className="text-base font-bold text-slate-900 dark:text-white">{member.name}</h3>
                                                <p className="text-[10px] text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-widest">{member.role}</p>
                                            </div>
                                        </div>
                                        {member.bio && (
                                            <p className="text-slate-600 dark:text-zinc-400 text-xs leading-relaxed mb-4 line-clamp-3">{member.bio}</p>
                                        )}
                                        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-zinc-800">
                                            <span className="text-[9px] text-slate-400 dark:text-zinc-600 uppercase font-bold tracking-widest">
                                                {fp.members.joined} {new Date(member.joined_at).toLocaleDateString(lang)}
                                            </span>
                                            <div className="flex gap-2 items-center">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                {member.has_star === 1 && <Star size={12} className="text-amber-500" fill="currentColor" />}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
