"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function StarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20">
      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.28v3.15C3.26 21.3 7.31 24 12 24z" />
      <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.28C.46 8.2.0 10.04.0 12s.46 3.8 1.28 5.42l4-3.15z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.28 6.58l4 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
    </svg>
  );
}

function BrandPanel() {
  return (
    <div className="najm-brand-panel">
      {/* Background Lighting & Geometry */}
      <div className="brand-bg-glow" />
      <div className="hex-grid">
        <div className="hex-shape hex-1" />
        <div className="hex-shape hex-2" />
        <div className="hex-shape hex-3" />
        <div className="hex-shape hex-4" />
        <div className="hex-shape hex-5" />
        <div className="hex-shape hex-6" />
      </div>

      {/* Brand Header */}
      <header className="brand-header">
        <div className="brand-icon-box">
          <span style={{ fontWeight: 900, fontSize: '17px', color: '#0b0f19', letterSpacing: '-0.5px' }}>GO</span>
        </div>
        <div className="brand-title-group">
          <b>GO</b>
          <small>GULF EXPERTS</small>
        </div>
      </header>

      {/* Hero Copy */}
      <main className="brand-content">
        <div className="brand-badge">
          <span>👑</span> PREMIUM GCC TALENT MATCH
        </div>
        <h1 className="brand-headline">
          Aligning Excellence<br />across the Gulf
        </h1>
        <p className="brand-subtext">
          Welcome to the premier AI-integrated matchmaker bridging visionary candidates with sovereign wealth hubs, elite recruiters, and luxury enterprises.
        </p>
      </main>

      {/* Footer Meta */}
      <footer className="brand-footer">
        <span>Riyadh • Dubai • Abu Dhabi • Doha</span>
        <span className="version">Ver. 4.2 AI</span>
      </footer>
    </div>
  );
}

function AuthPanel() {
  const router = useRouter();
  const [email, setEmail] = useState("s.alrashid@pif.gov.sa");
  const [password, setPassword] = useState("EliteGateway!24");
  const [showPassword, setShowPassword] = useState(false);
  const [activeField, setActiveField] = useState<"email" | "password" | null>("email");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/dashboard");
  }

  return (
    <div className="najm-auth-panel">
      <div className="auth-container">
        <p className="auth-lead">
          Select your path to enter Saudi &amp; UAE&apos;s leading elite gateway.
        </p>

        <form onSubmit={handleSubmit}>

          {/* Email Field */}
          <div className={`field-group ${activeField === "email" ? "active-field" : ""}`}>
            <label className="field-label" htmlFor="email">
              Professional Email
            </label>
            <div className={`input-wrapper ${activeField === "email" ? "focused" : ""}`}>
              <span className="input-icon">
                <MailIcon />
              </span>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setActiveField("email")}
                onBlur={() => setActiveField(null)}
                placeholder="name@company.com"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className={`field-group ${activeField === "password" ? "active-field" : ""}`}>
            <label className="field-label" htmlFor="password">
              Password
            </label>
            <div className={`input-wrapper ${activeField === "password" ? "focused" : ""}`}>
              <span className="input-icon">
                <LockIcon />
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setActiveField("password")}
                onBlur={() => setActiveField(null)}
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                className="eye-btn"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="forgot-row">
            <Link href="/forgot-password" className="forgot-link">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn">
            Sign In securely
          </button>
        </form>

        {/* Divider */}
        <div className="divider-row">
          <span>OR CONTINUE WITH</span>
        </div>

        {/* Social Grid */}
        <div className="social-grid">
          <button type="button" className="social-btn">
            <span className="linkedin-icon">in</span>
            <span>LinkedIn</span>
          </button>
          <button type="button" className="social-btn">
            <GoogleIcon />
            <span>Google</span>
          </button>
        </div>

        {/* Access Request */}
        <p className="request-access">
          New to the GO Gulf Experts platform?
          <Link href="/request-access">Request Access</Link>
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="najm-layout">
      <BrandPanel />
      <AuthPanel />
    </div>
  );
}
