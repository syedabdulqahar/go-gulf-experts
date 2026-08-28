"use client";

import { useState, useRef, useEffect, useCallback } from "react";

/* ═══════════════════════════════════════════════════════
   ICONS
═══════════════════════════════════════════════════════ */
const Icon = {
  Star: ({ size = 20 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
  ),
  Dashboard: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  File: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  ),
  Briefcase: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
  ),
  Send: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  Brain: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.07-4.48A3 3 0 0 1 4.5 9.5a3 3 0 0 1 1-5.5A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.07-4.48A3 3 0 0 0 19.5 9.5a3 3 0 0 0-1-5.5A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  ),
  Settings: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  Search: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Bell: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  Check: ({ color = "#4ade80", size = 14 }: { color?: string; size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Warning: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  Download: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  Upload: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e5b72b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  ),
  X: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Edit: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
};

/* ═══════════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════════ */
interface AnalysisResult {
  overall: number;
  technical: number;
  experience: number;
  education: number;
  industry: number;
  language: number;
  cultural: number;
  strengths: string[];
  gaps: string[];
  verdict: string;
}

interface Notification {
  id: number;
  title: string;
  desc: string;
  time: string;
  read: boolean;
  dot: string;
}

type NavView = "dashboard" | "resumes" | "jobs" | "applications" | "insights" | "settings";

/* ═══════════════════════════════════════════════════════
   MOCK DATA
═══════════════════════════════════════════════════════ */
const SAMPLE_JD = `Senior Investment Analyst — PIF, Riyadh

We are seeking an elite Senior Investment Analyst to manage strategic sovereign allocations. Requirements:
• 8-10+ years of direct experience in private equity or sovereign wealth funds.
• Deep expertise in financial modeling, deal screening, and cross-border transactions.
• CFA Level II or III preferred. MBA from a top institution is a plus.
• Bilingual: Arabic and English fluency required.
• Strong Python and quantitative analytics skills.`;

const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: 1, title: "New job match found", desc: "Senior PM role at NEOM — 91% match", time: "2 min ago", read: false, dot: "#e5b72b" },
  { id: 2, title: "Resume viewed", desc: "PIF recruiter viewed your profile", time: "18 min ago", read: false, dot: "#4ade80" },
  { id: 3, title: "Analysis complete", desc: "Your last screening report is ready", time: "1 hr ago", read: true, dot: "#7788a5" },
  { id: 4, title: "Application update", desc: "Aramco moved you to next round", time: "3 hrs ago", read: true, dot: "#60a5fa" },
];

const JOB_MATCHES = [
  { title: "Senior Investment Analyst", company: "PIF, Riyadh", score: 87, tag: "KSA SOVEREIGN HUB", status: "Active" },
  { title: "VP — Portfolio Management", company: "Mubadala, Abu Dhabi", score: 79, tag: "UAE SOVEREIGN", status: "Active" },
  { title: "Head of Deal Structuring", company: "QIA, Doha", score: 74, tag: "QATAR SOVEREIGN", status: "Active" },
  { title: "Senior Private Equity Analyst", company: "ADIA, Abu Dhabi", score: 82, tag: "UAE SOVEREIGN", status: "Applied" },
  { title: "ESG Investment Lead", company: "Aramco, Dhahran", score: 71, tag: "ENERGY SECTOR", status: "Active" },
];

const SAVED_RESUMES = [
  { name: "Ahmed_AlRashid_CV.pdf", size: "2.4 MB", date: "Aug 20, 2026", status: "Active" },
  { name: "Ahmed_AlRashid_CV_v2.pdf", size: "2.1 MB", date: "Jul 14, 2026", status: "Draft" },
  { name: "Ahmed_Finance_Resume.docx", size: "1.8 MB", date: "Jun 3, 2026", status: "Draft" },
];

const APPLICATIONS = [
  { role: "Senior Investment Analyst", company: "PIF", date: "Aug 24, 2026", stage: "Interview", score: 87 },
  { role: "VP Portfolio Management", company: "Mubadala", date: "Aug 18, 2026", stage: "Screening", score: 79 },
  { role: "ESG Investment Lead", company: "Aramco", date: "Aug 10, 2026", stage: "Applied", score: 71 },
];

/* ═══════════════════════════════════════════════════════
   AI ANALYSIS ENGINE (mock)
═══════════════════════════════════════════════════════ */
function runMockAnalysis(resumeText: string, jdText: string): AnalysisResult {
  const r = resumeText.toLowerCase();
  const j = jdText.toLowerCase();

  const score = (keywords: string[], source: string) =>
    Math.min(98, Math.round(
      55 + keywords.filter(k => source.includes(k)).length * (40 / Math.max(keywords.length, 1))
      + Math.random() * 6
    ));

  const technical = score(["python", "financial modeling", "excel", "bloomberg", "quantitative", "analytics", "cfa", "deal", "valuation"], r + j);
  const experience = score(["10+", "8+", "senior", "lead", "head", "director", "years", "fund management", "private equity", "sovereign"], r);
  const education = score(["mba", "cfa", "master", "bachelor", "finance", "economics", "university", "certified"], r);
  const industry = score(["sovereign wealth", "pif", "private equity", "investment", "portfolio", "assets", "gcc", "fund"], r + j);
  const language = score(["arabic", "english", "bilingual", "fluent", "native", "professional"], r);
  const cultural = score(["saudi", "ksa", "gcc", "uae", "qatar", "riyadh", "dubai", "middle east", "regional"], r + j);
  const overall = Math.round((technical * 0.25 + experience * 0.25 + education * 0.15 + industry * 0.15 + language * 0.1 + cultural * 0.1));

  const strengths: string[] = [];
  const gaps: string[] = [];

  if (experience >= 80) strengths.push("Strong senior-level investment experience");
  if (technical >= 80) strengths.push("Technical skills align with role requirements");
  if (language >= 80) strengths.push("Language proficiency meets bilingual requirements");
  if (education >= 75) strengths.push("Educational credentials match expectations");
  if (industry >= 80) strengths.push("Deep industry domain knowledge confirmed");
  if (cultural >= 70) strengths.push("Regional GCC market exposure verified");

  if (technical < 75) gaps.push("Strengthen quantitative & Python skills");
  if (!r.includes("cfa")) gaps.push("CFA certification not detected — recommended");
  if (!r.includes("python")) gaps.push("Missing: Advanced Python & data analytics experience");
  if (!r.includes("deal structuring")) gaps.push("Direct deal structuring experience not evident");
  if (overall < 80) gaps.push("Overall profile needs further alignment to JD requirements");

  if (strengths.length === 0) strengths.push("Profile uploaded and parsed successfully");
  if (gaps.length === 0) gaps.push("No critical gaps identified — excellent match!");

  const verdict =
    overall >= 88 ? "EXCELLENT" :
    overall >= 75 ? "GOOD" :
    overall >= 60 ? "FAIR" : "NEEDS WORK";

  return { overall, technical, experience, education, industry, language, cultural, strengths, gaps, verdict };
}

/* ═══════════════════════════════════════════════════════
   COMPONENTS
═══════════════════════════════════════════════════════ */
function ScoreDonut({ score, verdict }: { score: number; verdict: string }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const verdictColor = score >= 88 ? "#22c55e" : score >= 75 ? "#e5b72b" : score >= 60 ? "#f97316" : "#f87171";

  return (
    <div style={{ position: "relative", width: "140px", height: "140px", margin: "0 auto 8px" }}>
      <svg width="140" height="140" viewBox="0 0 140 140" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="70" cy="70" r={radius} fill="none" stroke="#1a2540" strokeWidth="12" />
        <circle
          cx="70" cy="70" r={radius} fill="none" stroke="#e5b72b" strokeWidth="12"
          strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", lineHeight: 1 }}>
        <div style={{ fontSize: "26px", fontWeight: 800, color: "#f4d17e", transition: "all 0.5s" }}>{score}%</div>
        <div style={{ fontSize: "9px", fontWeight: 800, color: verdictColor, letterSpacing: "0.5px", marginTop: "3px" }}>{verdict}</div>
      </div>
    </div>
  );
}

function SkillBar({ label, value, color = "#e5b72b" }: { label: string; value: number; color?: string }) {
  return (
    <div style={{ marginBottom: "13px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
        <span style={{ fontSize: "13px", color: "#a0aec0", fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: "13px", color: "#fff", fontWeight: 700 }}>{value}%</span>
      </div>
      <div style={{ height: "5px", borderRadius: "3px", background: "#1a2540", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${value}%`, borderRadius: "3px", background: color, transition: "width 1s ease" }} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════ */
export default function DashboardPage() {
  /* ── State ───────────────────────────────────────────── */
  const [activeNav, setActiveNav] = useState<NavView>("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);

  // Upload
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>({ name: "Ahmed_AlRashid_CV.pdf", size: "2.4 MB" });
  const [resumeText, setResumeText] = useState("Ahmed Al-Rashid\nSenior Finance Professional | Riyadh, KSA\n\nExperience: 10+ years in sovereign wealth fund management and private equity\nCFA Level III Charterholder\nBilingual: Native Arabic & Professional English fluency\nSkills: Financial modeling, deal screening, cross-border transactions, portfolio management\nEducation: MBA Finance, King Abdullah University");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // JD
  const [jdText, setJdText] = useState(SAMPLE_JD);
  const [editingJD, setEditingJD] = useState(false);

  // Analysis
  const [analysis, setAnalysis] = useState<AnalysisResult | null>({
    overall: 87, technical: 92, experience: 85, education: 90,
    industry: 78, language: 95, cultural: 82,
    strengths: ["10+ years in sovereign wealth fund management", "CFA Level III Charterholder certified", "Bilingual: Native Arabic & Professional English fluency"],
    gaps: ["Missing parameters: Advanced Python & Quantitative validation", "Direct private equity deal structuring experience is limited"],
    verdict: "EXCELLENT"
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisDone, setAnalysisDone] = useState(true);
  const [analyzeProgress, setAnalyzeProgress] = useState(0);

  // Modals
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyForm, setApplyForm] = useState({ name: "Ahmed Al-Rashid", email: "ahmed@example.com", phone: "+966 50 000 0000", coverNote: "" });
  const [applySubmitted, setApplySubmitted] = useState(false);

  const notifCount = notifications.filter(n => !n.read).length;

  /* ── File Upload ─────────────────────────────────────── */
  const handleFile = useCallback((file: File) => {
    const sizeKB = file.size / 1024;
    const sizeStr = sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${Math.round(sizeKB)} KB`;
    setUploadedFile({ name: file.name, size: sizeStr });
    setAnalysisDone(false);

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setResumeText(text || `[Uploaded: ${file.name}]\n${resumeText}`);
    };
    reader.readAsText(file);
  }, [resumeText]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  /* ── AI Analysis ─────────────────────────────────────── */
  const handleAnalyze = () => {
    if (!uploadedFile && !resumeText.trim()) return;
    setIsAnalyzing(true);
    setAnalyzeProgress(0);

    const interval = setInterval(() => {
      setAnalyzeProgress(p => {
        if (p >= 95) { clearInterval(interval); return 95; }
        return p + Math.random() * 18;
      });
    }, 120);

    setTimeout(() => {
      clearInterval(interval);
      setAnalyzeProgress(100);
      const result = runMockAnalysis(resumeText, jdText);
      setTimeout(() => {
        setAnalysis(result);
        setIsAnalyzing(false);
        setAnalysisDone(true);
        setAnalyzeProgress(0);
        // Add notification
        setNotifications(prev => [{
          id: Date.now(), title: "Analysis complete",
          desc: `Match score: ${result.overall}% — ${result.verdict}`,
          time: "just now", read: false, dot: "#4ade80"
        }, ...prev]);
      }, 300);
    }, 1600);
  };

  /* ── Download Report ─────────────────────────────────── */
  const handleDownload = () => {
    if (!analysis) return;
    const lines = [
      "═══════════════════════════════════════════════",
      "       NAJM AI CAREERS — SCREENING REPORT",
      "═══════════════════════════════════════════════",
      `Candidate:        ${applyForm.name}`,
      `Date:             ${new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}`,
      `Resume:           ${uploadedFile?.name ?? "Pasted text"}`,
      "",
      "─── OVERALL MATCH SCORE ───────────────────────",
      `   ${analysis.overall}% — ${analysis.verdict}`,
      "",
      "─── SKILL BREAKDOWN ───────────────────────────",
      `   Technical Skills:     ${analysis.technical}%`,
      `   Experience Level:     ${analysis.experience}%`,
      `   Education Match:      ${analysis.education}%`,
      `   Industry Alignment:   ${analysis.industry}%`,
      `   Language Proficiency: ${analysis.language}%`,
      `   Cultural Fit:         ${analysis.cultural}%`,
      "",
      "─── STRENGTHS ─────────────────────────────────",
      ...analysis.strengths.map(s => `   ✓ ${s}`),
      "",
      "─── GAPS & RECOMMENDATIONS ────────────────────",
      ...analysis.gaps.map(g => `   ⚠ ${g}`),
      "",
      "─── JOB DESCRIPTION MATCHED ───────────────────",
      ...jdText.split("\n").map(l => `   ${l}`),
      "",
      "═══════════════════════════════════════════════",
      "   Generated by NAJM AI Careers Platform",
      "   Sovereign-backed matching gateway",
      "═══════════════════════════════════════════════",
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `NAJM_Screening_Report_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ── Apply Modal ─────────────────────────────────────── */
  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplySubmitted(true);
    setNotifications(prev => [{
      id: Date.now(), title: "Application submitted!",
      desc: `Applied to Senior Investment Analyst — PIF`,
      time: "just now", read: false, dot: "#4ade80"
    }, ...prev]);
  };

  /* ── Close dropdowns on outside click ───────────────── */
  const notifRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotif(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ── Filtered job matches ────────────────────────────── */
  const filteredJobs = JOB_MATCHES.filter(j =>
    !searchQuery || j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* ═══════════════════════════════════════════════════════
     STYLES (shared)
  ═══════════════════════════════════════════════════════ */
  const S = {
    card: {
      background: "#0b0f19", border: "1px solid #1a2540",
      borderRadius: "14px", padding: "22px 24px",
    } as React.CSSProperties,
    sectionLabel: {
      fontSize: "11px", fontWeight: 800, color: "#8b9bb6",
      letterSpacing: "0.7px", display: "block", marginBottom: "12px"
    } as React.CSSProperties,
  };

  /* ═══════════════════════════════════════════════════════
     NAV ITEMS CONFIG
  ═══════════════════════════════════════════════════════ */
  const navItems: { label: string; view: NavView; icon: React.ReactNode }[] = [
    { label: "Dashboard", view: "dashboard", icon: <Icon.Dashboard /> },
    { label: "My Resumes", view: "resumes", icon: <Icon.File /> },
    { label: "Job Matches", view: "jobs", icon: <Icon.Briefcase /> },
    { label: "Applications", view: "applications", icon: <Icon.Send /> },
    { label: "AI Insights", view: "insights", icon: <Icon.Brain /> },
    { label: "Settings", view: "settings", icon: <Icon.Settings /> },
  ];

  /* ═══════════════════════════════════════════════════════
     RENDER
  ═══════════════════════════════════════════════════════ */
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#07090e", fontFamily: "'Manrope', sans-serif", color: "#fff" }}>

      {/* ═══ SIDEBAR ═══════════════════════════════════════ */}
      <aside style={{
        width: "220px", minWidth: "220px", background: "#0b0f19",
        borderRight: "1px solid #1a2540", display: "flex", flexDirection: "column",
        padding: "22px 0", position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 50,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "0 18px 28px" }}>
          <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "linear-gradient(135deg,#f0ce78,#b98908)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0b0f19", flexShrink: 0 }}>
            <Icon.Star size={18} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: "16px", color: "#fff", lineHeight: 1 }}>NAJM</div>
            <div style={{ fontSize: "8.5px", fontWeight: 800, color: "#f4d17e", letterSpacing: "1.2px", marginTop: "3px" }}>AI CAREERS</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1 }}>
          {navItems.map(item => {
            const isActive = activeNav === item.view;
            return (
              <button key={item.view} type="button" onClick={() => setActiveNav(item.view)}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: "11px", padding: "10px 18px", fontSize: "13.5px", fontWeight: isActive ? 700 : 500, color: isActive ? "#fff" : "#7788a5", background: isActive ? "rgba(229,183,43,0.08)" : "transparent", border: "none", cursor: "pointer", textAlign: "left", position: "relative", transition: "all 0.15s" }}>
                <span style={{ color: isActive ? "#f4d17e" : "#4a5a78" }}>{item.icon}</span>
                {item.label}
                {isActive && <div style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", width: "3px", height: "18px", background: "#e5b72b", borderRadius: "2px 0 0 2px" }} />}
              </button>
            );
          })}
        </nav>

        {/* User */}
        <div style={{ margin: "0 10px", padding: "11px", border: "1px solid #1a2540", borderRadius: "12px", display: "flex", alignItems: "center", gap: "10px", background: "#0e1322" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg,#c8a84b,#7b5e00)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "14px", fontWeight: 800, color: "#fff" }}>A</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: "12.5px", fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Ahmed Al-Rashid</div>
            <div style={{ fontSize: "10.5px", color: "#7788a5" }}>Pro Candidate</div>
          </div>
        </div>
      </aside>

      {/* ═══ MAIN ══════════════════════════════════════════ */}
      <div style={{ marginLeft: "220px", flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>

        {/* ── TOP BAR ──────────────────────────────────── */}
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 28px", background: "#07090e", borderBottom: "1px solid #1a2540", position: "sticky", top: 0, zIndex: 40 }}>
          <div>
            <h1 style={{ fontSize: "19px", fontWeight: 800, color: "#fff", margin: 0 }}>
              {activeNav === "dashboard" && "AI Resume Screener"}
              {activeNav === "resumes" && "My Resumes"}
              {activeNav === "jobs" && "Job Matches"}
              {activeNav === "applications" && "My Applications"}
              {activeNav === "insights" && "AI Insights"}
              {activeNav === "settings" && "Settings"}
            </h1>
            <p style={{ fontSize: "12px", color: "#7788a5", margin: 0, marginTop: "1px" }}>Sovereign-backed matching gateway</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Search */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 14px", background: "#0b0f19", border: "1px solid #1a2540", borderRadius: "8px", color: "#7788a5", width: "210px" }}>
              <Icon.Search />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={activeNav === "jobs" ? "Filter job matches..." : "Search jobs or audits..."}
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: "12.5px", fontWeight: 500 }}
              />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery("")} style={{ color: "#7788a5", background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
                  <Icon.X />
                </button>
              )}
            </div>

            {/* Bell */}
            <div ref={notifRef} style={{ position: "relative" }}>
              <button type="button" onClick={() => setShowNotif(v => !v)}
                style={{ width: "38px", height: "38px", display: "flex", alignItems: "center", justifyContent: "center", background: "#0b0f19", border: "1px solid #1a2540", borderRadius: "8px", color: showNotif ? "#f4d17e" : "#7788a5", cursor: "pointer", position: "relative" }}>
                <Icon.Bell />
                {notifCount > 0 && (
                  <span style={{ position: "absolute", top: "5px", right: "5px", width: "8px", height: "8px", borderRadius: "50%", background: "#e5b72b", border: "2px solid #07090e" }} />
                )}
              </button>

              {showNotif && (
                <div style={{ position: "absolute", right: 0, top: "46px", width: "320px", background: "#0b0f19", border: "1px solid #1a2540", borderRadius: "12px", boxShadow: "0 16px 40px rgba(0,0,0,0.5)", zIndex: 100, overflow: "hidden" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", borderBottom: "1px solid #1a2540" }}>
                    <span style={{ fontWeight: 700, fontSize: "14px" }}>Notifications</span>
                    {notifCount > 0 && (
                      <button type="button" onClick={() => setNotifications(n => n.map(x => ({ ...x, read: true })))}
                        style={{ fontSize: "11px", color: "#f4d17e", fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}>
                        Mark all read
                      </button>
                    )}
                  </div>
                  {notifications.map(n => (
                    <div key={n.id} onClick={() => setNotifications(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}
                      style={{ display: "flex", gap: "12px", padding: "12px 16px", borderBottom: "1px solid #111827", cursor: "pointer", background: n.read ? "transparent" : "rgba(229,183,43,0.03)", transition: "background 0.15s" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: n.read ? "#2a3550" : n.dot, marginTop: "5px", flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: "13px", fontWeight: n.read ? 500 : 700, color: n.read ? "#a0aec0" : "#fff" }}>{n.title}</div>
                        <div style={{ fontSize: "12px", color: "#7788a5", marginTop: "2px" }}>{n.desc}</div>
                        <div style={{ fontSize: "11px", color: "#4a5a78", marginTop: "3px" }}>{n.time}</div>
                      </div>
                    </div>
                  ))}
                  {notifications.length === 0 && (
                    <div style={{ padding: "24px", textAlign: "center", color: "#7788a5", fontSize: "13px" }}>No notifications</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ═══ CONTENT VIEWS ═════════════════════════════ */}
        <div style={{ flex: 1, padding: "24px 28px" }}>

          {/* ── DASHBOARD VIEW ──────────────────────────── */}
          {activeNav === "dashboard" && (
            <div style={{ display: "flex", gap: "22px", alignItems: "flex-start" }}>

              {/* Left Column */}
              <div style={{ flex: "0 0 auto", width: "500px", display: "flex", flexDirection: "column", gap: "18px" }}>

                {/* Upload Card */}
                <div style={S.card}>
                  <h2 style={{ fontSize: "14px", fontWeight: 700, color: "#fff", margin: "0 0 16px" }}>1. Upload Candidate Resume</h2>
                  <div
                    onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={onDrop}
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      border: `2px dashed ${isDragging ? "#e5b72b" : uploadedFile ? "#2a5e3a" : "#c8a84b"}`,
                      borderRadius: "10px", padding: "24px 20px", textAlign: "center",
                      background: isDragging ? "rgba(229,183,43,0.06)" : uploadedFile ? "rgba(34,197,94,0.04)" : "rgba(229,183,43,0.02)",
                      cursor: "pointer", transition: "all 0.2s"
                    }}>
                    <input ref={fileInputRef} type="file" accept=".pdf,.docx,.txt" onChange={onFileChange} style={{ display: "none" }} />
                    {uploadedFile ? (
                      <>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "8px" }}>
                          <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "#0e1a10", border: "1px solid #1a3a20", borderRadius: "20px", padding: "5px 14px", fontSize: "13px", fontWeight: 700, color: "#4ade80" }}>
                            <Icon.Check color="#4ade80" size={13} />
                            {uploadedFile.name}
                            <span style={{ color: "#7788a5", fontWeight: 500 }}>({uploadedFile.size})</span>
                          </div>
                        </div>
                        <p style={{ fontSize: "11.5px", color: "#7788a5", margin: 0 }}>PDF or DOCX supported. Click to replace file.</p>
                      </>
                    ) : (
                      <>
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}><Icon.Upload /></div>
                        <div style={{ fontSize: "13.5px", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>
                          {isDragging ? "Drop your file here" : "Click or drag & drop CV file"}
                        </div>
                        <p style={{ fontSize: "11.5px", color: "#7788a5", margin: 0 }}>PDF, DOCX, or TXT — Max 10 MB</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Job Description Card */}
                <div style={S.card}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                    <h2 style={{ fontSize: "14px", fontWeight: 700, color: "#fff", margin: 0 }}>2. Target Job Description</h2>
                    <button type="button" onClick={() => setEditingJD(v => !v)}
                      style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", fontWeight: 700, color: editingJD ? "#e5b72b" : "#7788a5", background: "none", border: "none", cursor: "pointer" }}>
                      <Icon.Edit /> {editingJD ? "Done" : "Edit"}
                    </button>
                  </div>

                  {editingJD ? (
                    <textarea
                      value={jdText}
                      onChange={e => { setJdText(e.target.value); setAnalysisDone(false); }}
                      placeholder="Paste target job description here..."
                      style={{ width: "100%", minHeight: "160px", padding: "12px 14px", borderRadius: "8px", border: "1px solid #1a2540", background: "#060811", color: "#fff", fontSize: "13px", resize: "vertical", outline: "none", fontFamily: "inherit", lineHeight: 1.6 }}
                    />
                  ) : (
                    <div style={{ background: "#0e1322", border: "1px solid #1a2540", borderRadius: "10px", padding: "14px" }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "10px", marginBottom: "8px" }}>
                        <span style={{ fontSize: "13.5px", fontWeight: 700, color: "#e5b72b", lineHeight: 1.4 }}>
                          {jdText.split("\n")[0] || "Job Title"}
                        </span>
                        <span style={{ fontSize: "9.5px", fontWeight: 800, color: "#7788a5", background: "#141c2c", padding: "2px 9px", borderRadius: "4px", whiteSpace: "nowrap", letterSpacing: "0.3px", flexShrink: 0 }}>
                          KSA SOVEREIGN HUB
                        </span>
                      </div>
                      <p style={{ fontSize: "12.5px", color: "#a0aec0", lineHeight: 1.6, margin: 0 }}>
                        {jdText.split("\n").slice(1).join(" ").slice(0, 220)}
                        {jdText.length > 220 ? "..." : ""}
                      </p>
                    </div>
                  )}
                </div>

                {/* Analyze Button */}
                <button type="button" onClick={handleAnalyze} disabled={isAnalyzing}
                  style={{ width: "100%", padding: "15px", borderRadius: "10px", background: isAnalyzing ? "#1a2540" : "linear-gradient(135deg,#f0ce78,#b98908)", color: isAnalyzing ? "#7788a5" : "#050505", fontSize: "14.5px", fontWeight: 800, border: "none", cursor: isAnalyzing ? "wait" : "pointer", boxShadow: isAnalyzing ? "none" : "0 4px 20px rgba(229,183,43,0.22)", transition: "all 0.2s", position: "relative", overflow: "hidden" }}>
                  {isAnalyzing ? (
                    <span>Analyzing... {Math.round(analyzeProgress)}%</span>
                  ) : (
                    <span>{analysisDone && analysis ? "✓ Re-Analyze Matching Parameters" : "Analyze Matching Parameters"}</span>
                  )}
                  {isAnalyzing && (
                    <div style={{ position: "absolute", bottom: 0, left: 0, height: "3px", background: "#e5b72b", width: `${analyzeProgress}%`, transition: "width 0.12s linear", borderRadius: "0 3px 3px 0" }} />
                  )}
                </button>
              </div>

              {/* Right Column */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "18px" }}>

                {/* Score + Bars */}
                <div style={{ ...S.card, padding: "24px" }}>
                  {analysis ? (
                    <>
                      <ScoreDonut score={analysis.overall} verdict={analysis.verdict} />
                      <div style={{ textAlign: "center", fontSize: "10.5px", fontWeight: 800, color: "#7788a5", letterSpacing: "0.8px", marginBottom: "20px" }}>MATCH SCORE</div>
                      <SkillBar label="Technical Skills" value={analysis.technical} />
                      <SkillBar label="Experience Level" value={analysis.experience} />
                      <SkillBar label="Education Match" value={analysis.education} />
                      <div style={{ height: "1px", background: "#1a2540", margin: "6px 0 12px" }} />
                      <SkillBar label="Industry Alignment" value={analysis.industry} />
                      <SkillBar label="Language Proficiency" value={analysis.language} />
                      <SkillBar label="Cultural Fit" value={analysis.cultural} />
                    </>
                  ) : (
                    <div style={{ textAlign: "center", padding: "40px 0", color: "#7788a5" }}>
                      <div style={{ fontSize: "36px", marginBottom: "12px" }}>📊</div>
                      <div style={{ fontSize: "14px", fontWeight: 600 }}>Upload a resume & click Analyze</div>
                    </div>
                  )}
                </div>

                {/* Diagnostics */}
                <div style={S.card}>
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#fff", margin: "0 0 14px" }}>Match Diagnostics &amp; Gaps</h3>
                  {analysis ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {analysis.strengths.map((s, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "9px" }}>
                          <div style={{ marginTop: "1px", flexShrink: 0 }}><Icon.Check /></div>
                          <span style={{ fontSize: "12.5px", color: "#c8d5e8", lineHeight: 1.5, fontWeight: 500 }}>{s}</span>
                        </div>
                      ))}
                      {analysis.gaps.map((g, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "9px" }}>
                          <div style={{ marginTop: "1px", flexShrink: 0 }}><Icon.Warning /></div>
                          <span style={{ fontSize: "12.5px", color: "#a0aec0", lineHeight: 1.5, fontWeight: 500 }}>{g}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ color: "#7788a5", fontSize: "13px" }}>Run analysis to see diagnostics.</div>
                  )}
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: "12px" }}>
                  <button type="button" onClick={handleDownload} disabled={!analysis}
                    style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", padding: "12px", background: "#0e1322", border: "1px solid #1a2540", borderRadius: "8px", color: analysis ? "#c8d5e8" : "#4a5a78", fontSize: "13.5px", fontWeight: 700, cursor: analysis ? "pointer" : "not-allowed" }}>
                    <Icon.Download /> Download Report
                  </button>
                  <button type="button" onClick={() => { setShowApplyModal(true); setApplySubmitted(false); }}
                    style={{ flex: 1, padding: "12px", background: "linear-gradient(135deg,#f0ce78,#b98908)", border: "none", borderRadius: "8px", color: "#050505", fontSize: "13.5px", fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 16px rgba(229,183,43,0.2)" }}>
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── MY RESUMES VIEW ─────────────────────────── */}
          {activeNav === "resumes" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <span style={S.sectionLabel}>SAVED RESUMES ({SAVED_RESUMES.length})</span>
                <button type="button" onClick={() => fileInputRef.current?.click()}
                  style={{ padding: "8px 18px", background: "linear-gradient(135deg,#f0ce78,#b98908)", border: "none", borderRadius: "8px", color: "#050505", fontSize: "13px", fontWeight: 800, cursor: "pointer" }}>
                  + Upload New
                </button>
                <input ref={fileInputRef} type="file" accept=".pdf,.docx,.txt" onChange={onFileChange} style={{ display: "none" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {SAVED_RESUMES.map((r, i) => (
                  <div key={i} style={{ ...S.card, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "#0e1322", border: "1px solid #1a2540", display: "flex", alignItems: "center", justifyContent: "center", color: "#f4d17e" }}>
                        <Icon.File />
                      </div>
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>{r.name}</div>
                        <div style={{ fontSize: "12px", color: "#7788a5", marginTop: "2px" }}>{r.size} • Uploaded {r.date}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "12px", background: r.status === "Active" ? "rgba(34,197,94,0.12)" : "rgba(100,116,139,0.15)", color: r.status === "Active" ? "#4ade80" : "#7788a5", border: `1px solid ${r.status === "Active" ? "rgba(34,197,94,0.3)" : "rgba(100,116,139,0.2)"}` }}>
                        {r.status}
                      </span>
                      <button type="button" onClick={() => { setUploadedFile({ name: r.name, size: r.size }); setActiveNav("dashboard"); }}
                        style={{ fontSize: "12.5px", fontWeight: 700, color: "#f4d17e", background: "none", border: "none", cursor: "pointer" }}>
                        Use for Analysis →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── JOB MATCHES VIEW ────────────────────────── */}
          {activeNav === "jobs" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <span style={S.sectionLabel}>JOB MATCHES ({filteredJobs.length})</span>
                {searchQuery && <span style={{ fontSize: "12px", color: "#7788a5" }}>Filtered by: "{searchQuery}"</span>}
              </div>
              {filteredJobs.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px", color: "#7788a5" }}>
                  <div style={{ fontSize: "32px", marginBottom: "12px" }}>🔍</div>
                  <div style={{ fontSize: "14px" }}>No matches found for "{searchQuery}"</div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {filteredJobs.map((job, i) => (
                    <div key={i} style={{ ...S.card, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                          <span style={{ fontSize: "14.5px", fontWeight: 700, color: "#e5b72b" }}>{job.title}</span>
                          <span style={{ fontSize: "9.5px", fontWeight: 800, color: "#7788a5", background: "#141c2c", padding: "2px 8px", borderRadius: "4px", letterSpacing: "0.3px" }}>{job.tag}</span>
                        </div>
                        <div style={{ fontSize: "12.5px", color: "#7788a5" }}>{job.company}</div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                        <div style={{ textAlign: "center" }}>
                          <div style={{ fontSize: "20px", fontWeight: 800, color: job.score >= 85 ? "#4ade80" : job.score >= 75 ? "#e5b72b" : "#f87171" }}>{job.score}%</div>
                          <div style={{ fontSize: "10px", color: "#7788a5", fontWeight: 600 }}>MATCH</div>
                        </div>
                        <button type="button"
                          onClick={() => { setJdText(`${job.title}\n${job.company}\n\nRequirements relevant to ${job.tag}...`); setActiveNav("dashboard"); setAnalysisDone(false); }}
                          style={{ padding: "8px 16px", background: "linear-gradient(135deg,#f0ce78,#b98908)", border: "none", borderRadius: "7px", color: "#050505", fontSize: "12.5px", fontWeight: 800, cursor: "pointer" }}>
                          Analyze Match
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── APPLICATIONS VIEW ───────────────────────── */}
          {activeNav === "applications" && (
            <div>
              <span style={S.sectionLabel}>MY APPLICATIONS ({APPLICATIONS.length})</span>
              <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "4px" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #1a2540" }}>
                    {["ROLE", "COMPANY", "DATE APPLIED", "MATCH SCORE", "STAGE"].map(h => (
                      <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: "11px", fontWeight: 800, color: "#8b9bb6", letterSpacing: "0.5px" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {APPLICATIONS.map((a, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #111827" }}>
                      <td style={{ padding: "14px", fontSize: "13.5px", fontWeight: 700, color: "#fff" }}>{a.role}</td>
                      <td style={{ padding: "14px", fontSize: "13px", color: "#a0aec0" }}>{a.company}</td>
                      <td style={{ padding: "14px", fontSize: "13px", color: "#7788a5" }}>{a.date}</td>
                      <td style={{ padding: "14px" }}>
                        <span style={{ fontSize: "13px", fontWeight: 800, color: a.score >= 80 ? "#4ade80" : "#e5b72b" }}>{a.score}%</span>
                      </td>
                      <td style={{ padding: "14px" }}>
                        <span style={{ fontSize: "11.5px", fontWeight: 700, padding: "3px 10px", borderRadius: "12px", background: a.stage === "Interview" ? "rgba(96,165,250,0.12)" : a.stage === "Screening" ? "rgba(229,183,43,0.12)" : "rgba(100,116,139,0.12)", color: a.stage === "Interview" ? "#60a5fa" : a.stage === "Screening" ? "#e5b72b" : "#7788a5", border: `1px solid ${a.stage === "Interview" ? "rgba(96,165,250,0.25)" : a.stage === "Screening" ? "rgba(229,183,43,0.25)" : "rgba(100,116,139,0.2)"}` }}>
                          {a.stage}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ── AI INSIGHTS VIEW ────────────────────────── */}
          {activeNav === "insights" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
              {[
                { label: "Average Match Score", value: analysis ? `${analysis.overall}%` : "—", desc: "Across all analyzed JDs", color: "#e5b72b" },
                { label: "Top Strength", value: analysis ? "Language" : "—", desc: `${analysis ? analysis.language : "—"}% proficiency`, color: "#4ade80" },
                { label: "Biggest Gap", value: "Python Skills", desc: "Recommend upskilling", color: "#f87171" },
                { label: "Job Matches", value: `${JOB_MATCHES.length}`, desc: "Active opportunities", color: "#60a5fa" },
              ].map((card, i) => (
                <div key={i} style={{ ...S.card }}>
                  <div style={{ fontSize: "11px", fontWeight: 800, color: "#8b9bb6", letterSpacing: "0.6px", marginBottom: "8px" }}>{card.label.toUpperCase()}</div>
                  <div style={{ fontSize: "28px", fontWeight: 800, color: card.color, marginBottom: "6px" }}>{card.value}</div>
                  <div style={{ fontSize: "12.5px", color: "#7788a5" }}>{card.desc}</div>
                </div>
              ))}
              {analysis && (
                <div style={{ ...S.card, gridColumn: "1 / -1" }}>
                  <div style={{ fontSize: "11px", fontWeight: 800, color: "#8b9bb6", letterSpacing: "0.6px", marginBottom: "16px" }}>SKILL RADAR</div>
                  {[
                    { label: "Technical Skills", value: analysis.technical },
                    { label: "Experience Level", value: analysis.experience },
                    { label: "Education Match", value: analysis.education },
                    { label: "Industry Alignment", value: analysis.industry },
                    { label: "Language Proficiency", value: analysis.language },
                    { label: "Cultural Fit", value: analysis.cultural },
                  ].map(s => <SkillBar key={s.label} label={s.label} value={s.value} />)}
                </div>
              )}
            </div>
          )}

          {/* ── SETTINGS VIEW ───────────────────────────── */}
          {activeNav === "settings" && (
            <div style={{ maxWidth: "540px" }}>
              <div style={{ ...S.card, marginBottom: "16px" }}>
                <div style={{ fontSize: "11px", fontWeight: 800, color: "#8b9bb6", letterSpacing: "0.6px", marginBottom: "16px" }}>PROFILE</div>
                {[{ label: "Full Name", value: "Ahmed Al-Rashid" }, { label: "Email", value: "ahmed@example.com" }, { label: "Phone", value: "+966 50 000 0000" }, { label: "Location", value: "Riyadh, Saudi Arabia" }].map(f => (
                  <div key={f.label} style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#8b9bb6", marginBottom: "6px" }}>{f.label}</label>
                    <input defaultValue={f.value} style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #1a2540", background: "#060811", color: "#fff", fontSize: "13.5px", outline: "none", fontFamily: "inherit" }}
                      onFocus={e => { e.target.style.borderColor = "#e5b72b"; }}
                      onBlur={e => { e.target.style.borderColor = "#1a2540"; }} />
                  </div>
                ))}
                <button type="button" style={{ padding: "10px 24px", background: "linear-gradient(135deg,#f0ce78,#b98908)", border: "none", borderRadius: "8px", color: "#050505", fontSize: "13px", fontWeight: 800, cursor: "pointer" }}>
                  Save Changes
                </button>
              </div>
              <div style={S.card}>
                <div style={{ fontSize: "11px", fontWeight: 800, color: "#8b9bb6", letterSpacing: "0.6px", marginBottom: "16px" }}>PREFERENCES</div>
                {["Email notifications for new job matches", "SMS alerts for application updates", "Weekly AI insights digest"].map(pref => (
                  <div key={pref} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "14px", marginBottom: "14px", borderBottom: "1px solid #111827" }}>
                    <span style={{ fontSize: "13px", color: "#c8d5e8" }}>{pref}</span>
                    <div style={{ width: "36px", height: "20px", borderRadius: "10px", background: "#e5b72b", position: "relative", cursor: "pointer" }}>
                      <div style={{ position: "absolute", top: "2px", right: "2px", width: "16px", height: "16px", borderRadius: "50%", background: "#fff" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ═══ APPLY NOW MODAL ═══════════════════════════════ */}
      {showApplyModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}
          onClick={e => { if (e.target === e.currentTarget) setShowApplyModal(false); }}>
          <div style={{ background: "#0b0f19", border: "1px solid #1a2540", borderRadius: "16px", width: "100%", maxWidth: "480px", padding: "28px", boxShadow: "0 24px 60px rgba(0,0,0,0.6)" }}>
            {applySubmitted ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎉</div>
                <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", margin: "0 0 8px" }}>Application Submitted!</h2>
                <p style={{ color: "#7788a5", fontSize: "14px", marginBottom: "24px" }}>Your application for <strong style={{ color: "#e5b72b" }}>Senior Investment Analyst — PIF</strong> has been submitted. You'll receive updates via email.</p>
                <button type="button" onClick={() => setShowApplyModal(false)}
                  style={{ padding: "11px 28px", background: "linear-gradient(135deg,#f0ce78,#b98908)", border: "none", borderRadius: "8px", color: "#050505", fontWeight: 800, fontSize: "14px", cursor: "pointer" }}>
                  Close
                </button>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "22px" }}>
                  <div>
                    <h2 style={{ fontSize: "17px", fontWeight: 800, color: "#fff", margin: 0 }}>Apply Now</h2>
                    <p style={{ fontSize: "12px", color: "#7788a5", margin: "3px 0 0" }}>Senior Investment Analyst — PIF, Riyadh</p>
                  </div>
                  <button type="button" onClick={() => setShowApplyModal(false)} style={{ color: "#7788a5", background: "none", border: "none", cursor: "pointer", display: "flex" }}><Icon.X /></button>
                </div>
                {analysis && (
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(229,183,43,0.07)", border: "1px solid rgba(229,183,43,0.2)", borderRadius: "8px", padding: "10px 14px", marginBottom: "20px" }}>
                    <span style={{ fontSize: "20px", fontWeight: 800, color: "#e5b72b" }}>{analysis.overall}%</span>
                    <span style={{ fontSize: "12.5px", color: "#a0aec0" }}>match score — your profile is a strong fit for this role</span>
                  </div>
                )}
                <form onSubmit={handleApplySubmit}>
                  {[
                    { key: "name", label: "Full Name", type: "text" },
                    { key: "email", label: "Email Address", type: "email" },
                    { key: "phone", label: "Phone Number", type: "tel" },
                  ].map(f => (
                    <div key={f.key} style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#8b9bb6", marginBottom: "6px" }}>{f.label}</label>
                      <input
                        required type={f.type}
                        value={applyForm[f.key as keyof typeof applyForm]}
                        onChange={e => setApplyForm(p => ({ ...p, [f.key]: e.target.value }))}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #1a2540", background: "#060811", color: "#fff", fontSize: "13.5px", outline: "none", fontFamily: "inherit" }}
                        onFocus={e => { e.target.style.borderColor = "#e5b72b"; e.target.style.boxShadow = "0 0 0 3px rgba(229,183,43,0.1)"; }}
                        onBlur={e => { e.target.style.borderColor = "#1a2540"; e.target.style.boxShadow = "none"; }}
                      />
                    </div>
                  ))}
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#8b9bb6", marginBottom: "6px" }}>Cover Note (optional)</label>
                    <textarea
                      value={applyForm.coverNote}
                      onChange={e => setApplyForm(p => ({ ...p, coverNote: e.target.value }))}
                      placeholder="Briefly describe why you're a great fit..."
                      rows={3}
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #1a2540", background: "#060811", color: "#fff", fontSize: "13px", outline: "none", fontFamily: "inherit", resize: "vertical" }}
                      onFocus={e => { e.target.style.borderColor = "#e5b72b"; }}
                      onBlur={e => { e.target.style.borderColor = "#1a2540"; }}
                    />
                  </div>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <button type="button" onClick={() => setShowApplyModal(false)}
                      style={{ flex: 1, padding: "11px", background: "#0e1322", border: "1px solid #1a2540", borderRadius: "8px", color: "#a0aec0", fontSize: "13.5px", fontWeight: 700, cursor: "pointer" }}>
                      Cancel
                    </button>
                    <button type="submit"
                      style={{ flex: 2, padding: "11px", background: "linear-gradient(135deg,#f0ce78,#b98908)", border: "none", borderRadius: "8px", color: "#050505", fontSize: "13.5px", fontWeight: 800, cursor: "pointer" }}>
                      Submit Application
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
