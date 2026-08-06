import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  variant?: "inquiry" | "details";
  name?: string;
  firstName?: string;
  secondName?: string;
  email?: string;
  phone?: string;
  interest?: string;
  message?: string;
  propertyAddress?: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const from =
      process.env.RESEND_FROM_EMAIL ??
      "Commonwealth Realty <forms@pinpointmailer.com>";
    const to = (process.env.CONTACT_TO_EMAIL ?? "commonwealthagent@gmail.com")
      .split(",")
      .map((email) => email.trim())
      .filter(Boolean);

    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const body = (await request.json()) as ContactPayload;
    const email = body.email?.trim() ?? "";
    const message = body.message?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";
    const interest = body.interest?.trim() ?? "";
    const propertyAddress = body.propertyAddress?.trim() ?? "";

    const fullName =
      body.variant === "details"
        ? [body.firstName?.trim(), body.secondName?.trim()]
            .filter(Boolean)
            .join(" ")
        : body.name?.trim() ?? "";

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (body.variant === "details" && !phone) {
      return NextResponse.json(
        { error: "Phone number is required." },
        { status: 400 }
      );
    }

    const subjectParts = [
      "New website inquiry",
      interest || null,
      propertyAddress ? `re: ${propertyAddress}` : null,
    ].filter(Boolean);

    const rows = [
      ["Name", fullName],
      ["Email", email],
      phone ? ["Phone", phone] : null,
      interest ? ["Interest", interest] : null,
      propertyAddress ? ["Property", propertyAddress] : null,
      ["Message", message],
    ].filter(Boolean) as [string, string][];

    const textBody = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

    const htmlBody = `
      <div style="font-family: Georgia, serif; color: #1d1d1b; line-height: 1.6;">
        <h2 style="font-weight: 500; margin: 0 0 16px;">New Commonwealth Realty inquiry</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 560px;">
          ${rows
            .map(
              ([label, value]) => `
            <tr>
              <td style="padding: 8px 12px 8px 0; vertical-align: top; color: #8d8a78; width: 120px;">${escapeHtml(label)}</td>
              <td style="padding: 8px 0; vertical-align: top; white-space: pre-wrap;">${escapeHtml(value)}</td>
            </tr>`
            )
            .join("")}
        </table>
      </div>
    `;

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: subjectParts.join(" — "),
      text: textBody,
      html: htmlBody,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Unable to send your message right now." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Unable to send your message right now." },
      { status: 500 }
    );
  }
}
