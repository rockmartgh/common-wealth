import { NextResponse } from "next/server";
import { Resend } from "resend";
import { requestLoginCode } from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim() ?? "";

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email is required." },
        { status: 400 }
      );
    }

    const result = await requestLoginCode(email);

    if (result.reason === "rate_limited") {
      return NextResponse.json(
        { error: "Please wait a minute before requesting another code." },
        { status: 429 }
      );
    }

    // Always return ok for non-allowlisted emails to avoid enumeration.
    if (!result.sent) {
      return NextResponse.json({ ok: true });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from =
      process.env.RESEND_FROM_EMAIL ??
      "Commonwealth Realty <forms@pinpointmailer.com>";

    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: result.email,
      subject: "Your Commonwealth Realty admin login code",
      text: `Your login code is ${result.code}. It expires in 10 minutes.`,
      html: `
        <div style="font-family: Georgia, serif; color: #1d1d1b; line-height: 1.6;">
          <h2 style="font-weight: 500; margin: 0 0 12px;">Admin login code</h2>
          <p style="margin: 0 0 16px;">Use this code to sign in to the Commonwealth Realty dashboard. It expires in 10 minutes.</p>
          <p style="font-size: 28px; letter-spacing: 0.2em; font-weight: 600; margin: 0;">${result.code}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Admin OTP email error:", error);
      return NextResponse.json(
        { error: "Unable to send login code right now." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("request-code error:", error);
    return NextResponse.json(
      { error: "Unable to send login code right now." },
      { status: 500 }
    );
  }
}
