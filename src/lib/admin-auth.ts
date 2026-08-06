import { createHash, randomInt, timingSafeEqual } from "crypto";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { getRedis } from "@/lib/redis";

export const ADMIN_EMAILS = [
  "commonwealthagent@gmail.com",
  "fryar.renee@gmail.com",
  "kev@foxpointwd.com",
  "kev@rockmartholding.com",
] as const;

export const SESSION_COOKIE = "admin_session";
const OTP_TTL_SECONDS = 60 * 10;
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;
const RATE_LIMIT_SECONDS = 60;

export type AdminSession = {
  email: string;
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function isAllowedAdminEmail(email: string) {
  const normalized = normalizeEmail(email);
  return ADMIN_EMAILS.includes(
    normalized as (typeof ADMIN_EMAILS)[number]
  );
}

function getSessionSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is not configured.");
  }
  return new TextEncoder().encode(secret);
}

function hashCode(code: string) {
  return createHash("sha256").update(code).digest("hex");
}

function otpKey(email: string) {
  return `admin:otp:${normalizeEmail(email)}`;
}

function rateKey(email: string) {
  return `admin:otp-rate:${normalizeEmail(email)}`;
}

export async function requestLoginCode(email: string) {
  const normalized = normalizeEmail(email);
  if (!isAllowedAdminEmail(normalized)) {
    return { sent: false as const, reason: "not_allowed" as const };
  }

  const redis = getRedis();
  const recent = await redis.get(rateKey(normalized));
  if (recent) {
    return { sent: false as const, reason: "rate_limited" as const };
  }

  const code = String(randomInt(100000, 1000000));
  await redis.set(otpKey(normalized), hashCode(code), {
    ex: OTP_TTL_SECONDS,
  });
  await redis.set(rateKey(normalized), "1", { ex: RATE_LIMIT_SECONDS });

  return { sent: true as const, email: normalized, code };
}

export async function verifyLoginCode(email: string, code: string) {
  const normalized = normalizeEmail(email);
  if (!isAllowedAdminEmail(normalized)) {
    return { ok: false as const };
  }

  const redis = getRedis();
  const stored = await redis.get<string>(otpKey(normalized));
  if (!stored) {
    return { ok: false as const };
  }

  const provided = hashCode(code.trim());
  const a = Buffer.from(stored);
  const b = Buffer.from(provided);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return { ok: false as const };
  }

  await redis.del(otpKey(normalized));
  return { ok: true as const, email: normalized };
}

export async function createSessionToken(email: string) {
  return new SignJWT({ email: normalizeEmail(email) })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSessionSecret());
}

export async function readSessionFromToken(
  token: string | undefined
): Promise<AdminSession | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSessionSecret());
    const email = typeof payload.email === "string" ? payload.email : null;
    if (!email || !isAllowedAdminEmail(email)) return null;
    return { email };
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const jar = await cookies();
  return readSessionFromToken(jar.get(SESSION_COOKIE)?.value);
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  return session;
}

export function sessionCookieOptions(maxAge = SESSION_TTL_SECONDS) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}
