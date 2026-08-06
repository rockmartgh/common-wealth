"use client";

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  async function requestCode(event: FormEvent) {
    event.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/auth/request-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error || "Unable to send code.");
        return;
      }

      setInfo("If that email is authorized, a login code is on its way.");
      setStep("code");
    } catch {
      setError("Unable to send code right now.");
    } finally {
      setLoading(false);
    }
  }

  async function verifyCode(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error || "Invalid code.");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Unable to verify code right now.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md border border-stone bg-ivory p-8 shadow-[var(--shadow-soft)]">
      <p className="eyebrow">Admin</p>
      <h1 className="display mt-3 text-3xl">Team Login</h1>
      <p className="mt-3 text-sm leading-relaxed text-olive">
        Enter your email to receive a one-time login code.
      </p>

      {step === "email" ? (
        <form onSubmit={requestCode} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="admin-email"
              className="mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-olive"
            >
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="field-input"
              placeholder="you@example.com"
            />
          </div>
          {error ? <p className="text-sm text-burgundy">{error}</p> : null}
          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? "Sending…" : "Send Code"}
          </button>
        </form>
      ) : (
        <form onSubmit={verifyCode} className="mt-8 space-y-5">
          <p className="text-sm text-olive">
            Code sent to <span className="text-charcoal">{email}</span>
          </p>
          <div>
            <label
              htmlFor="admin-code"
              className="mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-olive"
            >
              Login Code
            </label>
            <input
              id="admin-code"
              type="text"
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              required
              autoComplete="one-time-code"
              value={code}
              onChange={(event) =>
                setCode(event.target.value.replace(/\D/g, "").slice(0, 6))
              }
              className="field-input tracking-[0.3em]"
              placeholder="000000"
            />
          </div>
          {info ? <p className="text-sm text-olive">{info}</p> : null}
          {error ? <p className="text-sm text-burgundy">{error}</p> : null}
          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? "Verifying…" : "Sign In"}
          </button>
          <button
            type="button"
            className="btn btn-secondary w-full"
            onClick={() => {
              setStep("email");
              setCode("");
              setError("");
              setInfo("");
            }}
          >
            Use a Different Email
          </button>
        </form>
      )}
    </div>
  );
}
