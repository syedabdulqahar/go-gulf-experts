"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";

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

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"password_first" | "otp_verify">("password_first");
  const [email, setEmail] = useState("s.alrashid@pif.gov.sa");
  const [password, setPassword] = useState("EliteGateway!25");
  const [confirmPassword, setConfirmPassword] = useState("EliteGateway!25");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [otp, setOtp] = useState<string[]>(["7", "4", "2", "8", "9", "1"]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [activeField, setActiveField] = useState<string | null>("email");
  const [isSuccess, setIsSuccess] = useState(false);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  // 1-Minute Countdown Timer Effect
  useEffect(() => {
    if (step !== "otp_verify" || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [step, timeLeft]);

  function handleResendOtp() {
    setTimeLeft(60);
  }

  function handleOtpChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-advance focus to next input box
    if (value && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  }

  function handlePasswordStepSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStep("otp_verify");
    setTimeLeft(60);
  }

  function handleOtpStepSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSuccess(true);
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <main className="request-access-page">
      <div className="request-access-container">
        <h1 className="request-access-title" style={step === "otp_verify" ? { textAlign: "center" } : undefined}>
          {step === "password_first" ? "Reset Password" : "Enter Verification OTP"}
        </h1>
        <p className="request-access-subtext" style={step === "otp_verify" ? { textAlign: "center" } : undefined}>
          {step === "password_first"
            ? "Enter your professional email address and your new password to receive a verification OTP."
            : `We sent a 6-digit OTP verification code to ${email}`}
        </p>

        {isSuccess && (
          <div
            style={{
              padding: "14px 18px",
              borderRadius: "8px",
              background: "rgba(34, 197, 94, 0.15)",
              border: "1px solid rgba(34, 197, 94, 0.4)",
              color: "#4ade80",
              fontWeight: 700,
              fontSize: "14px",
              marginBottom: "24px"
            }}
          >
            ✓ Password reset successfully! You can now sign in with your new credentials.
          </div>
        )}

        {step === "password_first" ? (
          /* STEP 1: ENTER NEW PASSWORD & CONFIRM PASSWORD FIRST */
          <form onSubmit={handlePasswordStepSubmit}>
            {/* Email Field */}
            <div className={`field-group ${activeField === "email" ? "active-field" : ""}`}>
              <label className="field-label" htmlFor="email">
                Professional Email Address
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

            {/* 2-Column: New Password & Confirm Password */}
            <div className="field-row-2col">
              <div className={`field-group ${activeField === "password" ? "active-field" : ""}`}>
                <label className="field-label" htmlFor="password">
                  New Password
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
                    placeholder="Enter new password"
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
                    placeholder="Confirm new password"
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

            <button type="submit" className="submit-btn" style={{ marginTop: "16px" }}>
              Send OTP &amp; Proceed to Verification
            </button>
          </form>
        ) : (
          /* STEP 2: ENTER OTP & COUNTDOWN TIMER SECOND */
          <div className="otp-wrapper">
            <form onSubmit={handleOtpStepSubmit}>
              {/* 6-Digit OTP Box Grid (Centered & Matching 338px Width) */}
              <label className="field-label" style={{ marginBottom: "12px", textAlign: "center" }}>
                6-DIGIT VERIFICATION CODE
              </label>
              <div className="otp-grid">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="otp-box"
                    required
                  />
                ))}
              </div>

              {/* 1-Minute Countdown Timer & Resend OTP Bar */}
              <div className="timer-row">
                <div className="timer-badge">
                  <ClockIcon />
                  <span>
                    {timeLeft > 0
                      ? `Resend OTP in ${formatTime(timeLeft)}`
                      : "OTP expired (1:00)"}
                  </span>
                </div>
                <button
                  type="button"
                  className="resend-btn"
                  onClick={handleResendOtp}
                  disabled={timeLeft > 0}
                >
                  Resend OTP
                </button>
              </div>

              <button
                type="submit"
                className="submit-btn"
                style={{ width: "100%", maxWidth: "338px", margin: "0 auto", display: "block" }}
              >
                Verify OTP &amp; Complete Reset
              </button>

              <button
                type="button"
                onClick={() => setStep("password_first")}
                style={{
                  width: "100%",
                  marginTop: "16px",
                  padding: "8px",
                  fontSize: "13px",
                  color: "#7788a5",
                  fontWeight: 600,
                  textAlign: "center"
                }}
              >
                ← Edit Email or Password
              </button>
            </form>
          </div>
        )}

        {/* Footer Link */}
        <p className="request-access">
          Remember your password?
          <Link href="/">Sign In here</Link>
        </p>
      </div>
    </main>
  );
}
