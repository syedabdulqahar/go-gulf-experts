"use client";

import { FormEvent, useState } from "react"; // Form Event : 
import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("s.alrashid@pif.gov.sa");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);
    setErrorMsg(null);

    try {
      await resetPassword(email);
      setIsSuccess(true);
    } catch (error) {
      console.error("Password reset error:", error);
      setErrorMsg(error instanceof Error ? error.message : "Failed to send reset email.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="request-access-page">
      <div className="request-access-container">
        <h1 className="request-access-title">Reset Password</h1>
        <p className="request-access-subtext">
          Enter your professional email address and we&apos;ll send you a secure Firebase reset link.
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
            Reset email sent. Check your inbox and follow the link to choose a new password.
          </div>
        )}

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
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="field-group active-field">
            <label className="field-label" htmlFor="email">Professional Email Address</label>
            <div className="input-wrapper focused">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="name@company.com"
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-btn" style={{ marginTop: "16px" }} disabled={isSubmitting}>
            {isSubmitting ? "Sending reset email..." : "Send reset email"}
          </button>
        </form>

        <p className="request-access">
          Remember your password? <Link href="/">Sign In here</Link>
        </p>
      </div>
    </main>
  );
}
