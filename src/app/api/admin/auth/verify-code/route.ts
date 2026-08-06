import { NextResponse } from "next/server";
import {
  createSessionToken,
  sessionCookieOptions,
  SESSION_COOKIE,
  verifyLoginCode,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; code?: string };
    const email = body.email?.trim() ?? "";
    const code = body.code?.trim() ?? "";

    if (!email || !code) {
      return NextResponse.json(
        { error: "Email and code are required." },
        { status: 400 }
      );
    }

    const result = await verifyLoginCode(email, code);
    if (!result.ok) {
      return NextResponse.json(
        { error: "Invalid or expired code." },
        { status: 401 }
      );
    }

    const token = await createSessionToken(result.email);
    const response = NextResponse.json({ ok: true, email: result.email });
    response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
    return response;
  } catch (error) {
    console.error("verify-code error:", error);
    return NextResponse.json(
      { error: "Unable to verify code right now." },
      { status: 500 }
    );
  }
}
