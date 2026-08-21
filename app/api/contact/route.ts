import { NextResponse, type NextRequest } from "next/server";
import { resend } from "@/lib/resend";
import { isRateLimited } from "@/lib/rateLimit";
import { isValidEmail, isValidName } from "@/lib/contactValidation";
import { SITE_NAME } from "@/app/constants";

export const runtime = "edge";

const MAX_SUBMISSIONS = 1;
const WINDOW_SECONDS = 180;

const MAX_LENGTHS = { email: 50, message: 500 } as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";

    if (!isValidName(name)) {
      return NextResponse.json({ error: "A valid name is required." }, { status: 400 });
    }

    if (!email || email.length > MAX_LENGTHS.email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 },
      );
    }

    if (!message || message.length > MAX_LENGTHS.message) {
      return NextResponse.json({ error: "A message is required." }, { status: 400 });
    }

    if (await isRateLimited(request, "contact-form", { max: MAX_SUBMISSIONS, windowSeconds: WINDOW_SECONDS })) {
      return NextResponse.json(
        { error: "Please wait a few minutes before submitting again." },
        { status: 429 },
      );
    }

    const data = await resend.emails.send({
      from: `${SITE_NAME} <noreply@mail.samirmagdy.com>`,
      to: process.env.CONTACT_EMAIL ?? "",
      subject: "New Contact Form Message",
      text: [`Name: ${name}`, `Email: ${email}`, "", message].join("\n"),
    });

    if (data.error) {
      return NextResponse.json(
        { error: data.error.message || "Failed to send email" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, id: data.data?.id });
  } catch (error) {
    console.error("CONTACT ROUTE ERROR:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 },
    );
  }
}
