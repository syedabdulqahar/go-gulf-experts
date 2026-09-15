"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";

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

export default function RequestAccessPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [role, setRole] = useState<"candidate" | "recruiter">("candidate");
  const [fullName, setFullName] = useState("Sara Al-Rashid");
  const [email, setEmail] = useState("s.alrashid@pif.gov.sa");
  const [phone, setPhone] = useState("50 123 4567");
  const [password, setPassword] = useState("EliteGateway!24");
  const [confirmPassword, setConfirmPassword] = useState("EliteGateway!24");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeField, setActiveField] = useState<string | null>("email");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match. Please re-enter.");
      return;
    }
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      await signUp(email, password, fullName);
      router.push("/dashboard");
    } catch (err) {
      console.error("Sign up error:", err);
      setErrorMsg(err instanceof Error ? err.message : "Failed to create account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="request-access-page">
      <div className="request-access-container">
        <h1 className="request-access-title">Create Your Account</h1>
        <p className="request-access-subtext">
          Join the sovereign-backed gateway to elite career opportunities in the GCC.
        </p>

        {errorMsg && (
          <div
            style={{
              padding: "10px 14px",
              borderRadius: "6px",
              background: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.4)",
              color: "#f87171",
              fontSize: "13px",
              marginBottom: "16px"
            }}
          >
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Choose Your Role */}
          <span className="section-label">CHOOSE YOUR ROLE</span>
          <div className="role-grid">
            <button
              type="button"
              className={`role-card ${role === "candidate" ? "selected" : ""}`}
              onClick={() => setRole("candidate")}
            >
              <div className="role-card-top">
                <div className="role-icon-box">
                  <UserIcon />
                </div>
                <div className="radio-circle">
                  {role === "candidate" && <div className="radio-inner" />}
                </div>
              </div>
              <div className="role-info">
                <strong>Candidate</strong>
                <small>Seeking placement</small>
              </div>
            </button>

            <button
              type="button"
              className={`role-card ${role === "recruiter" ? "selected" : ""}`}
              onClick={() => setRole("recruiter")}
            >
              <div className="role-card-top">
                <div className="role-icon-box">
                  <BriefcaseIcon />
                </div>
                <div className="radio-circle">
                  {role === "recruiter" && <div className="radio-inner" />}
                </div>
              </div>
              <div className="role-info">
                <strong>Recruiter</strong>
                <small>Hiring GCC talent</small>
              </div>
            </button>
          </div>

          {/* Full Name */}
          <div className={`field-group ${activeField === "fullName" ? "active-field" : ""}`}>
            <label className="field-label" htmlFor="fullName">
              Full Name
            </label>
            <div className={`input-wrapper ${activeField === "fullName" ? "focused" : ""}`}>
              <span className="input-icon">
                <UserIcon />
              </span>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onFocus={() => setActiveField("fullName")}
                onBlur={() => setActiveField(null)}
                placeholder="Full Name"
                required
              />
            </div>
          </div>

          {/* 2-Column: Email & Phone */}
          <div className="field-row-2col">
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

            <div className={`field-group ${activeField === "phone" ? "active-field" : ""}`}>
              <label className="field-label" htmlFor="phone">
                Phone Number
              </label>
              <div className={`input-wrapper ${activeField === "phone" ? "focused" : ""}`}>
                <span className="phone-code">+966</span>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onFocus={() => setActiveField("phone")}
                  onBlur={() => setActiveField(null)}
                  placeholder="50 000 0000"
                  required
                />
              </div>
            </div>
          </div>

          {/* 2-Column: Password & Confirm Password */}
          <div className="field-row-2col">
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

            <div className={`field-group ${activeField === "confirmPassword" ? "active-field" : ""}`}>
              <label className="field-label" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className={`input-wrapper ${activeField === "confirmPassword" ? "focused" : ""}`}>
                <span className="input-icon">
                  <LockIcon />
                </span>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setActiveField("confirmPassword")}
                  onBlur={() => setActiveField(null)}
                  placeholder="Confirm password"
                  required
                />
                <button
                  type="button"
                  className="eye-btn"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn" style={{ marginTop: "12px" }} disabled={isSubmitting}>
            {isSubmitting ? "Creating Account..." : "Create Account securely"}
          </button>
        </form>

        {/* Divider */}
        <div className="divider-row">
          <span>VERIFICATION REQUIRED</span>
        </div>

        {/* Access Request Footer Link */}
        <p className="request-access">
          Already have an account?
          <Link href="/">Sign In here</Link>
        </p>
      </div>
    </main>
  );
}
