import { Resend } from "resend";
import { NextResponse } from "next/server";
// 1. Import the Redis client utility
import { redis } from "@/lib/redis";

const resend = new Resend(process.env.RESEND_API_KEY);

// --- Rate Limiting Configuration ---
// Allow 1 submission every 180 seconds (3 minutes) per user.
const MAX_SUBMISSIONS = 1;
const WINDOW_SECONDS = 180; // 3 minutes
// ------------------------------------

export async function POST(request: Request) {
  try {
    const { name, phone, industry, onlinePresence, message } = await request.json();

    // Basic validation
    if (!name || !phone || !industry || !onlinePresence || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // --- ✅ CORRECTED RATE LIMITING IMPLEMENTATION ✅ ---
    // Get a unique identifier for the user (IP address is used here)
    const userIdentifier = request.headers.get("x-forwarded-for") || "anon";
    const key = `rate-limit:contact-form:${userIdentifier}`;

    // 1. Increment the counter. This returns the new value.
    // We use a single command first for simplicity and clarity.
    const count = await redis.incr(key);

    // 2. CRITICAL FIX: Only set the expiration if this is the first submission (count == 1).
    // This ensures the timer starts now and is NOT reset on subsequent requests.
    if (count === 1) {
      await redis.expire(key, WINDOW_SECONDS);
    }

    // Check if the submission count exceeds the limit
    if (count > MAX_SUBMISSIONS) {
      return NextResponse.json(
        {
          error: `Please wait a few minutes before sending another message.`,
        },
        { status: 429 } // 429: Too Many Requests
      );
    }
    // ----------------------------------------------------

    // Send Email via Resend
    const data = await resend.emails.send({
      from: "Portfolio Contact Form <noreply@mail.samirmagdy.com>",
      to: process.env.CONTACT_EMAIL as string,
      subject: `New Contact Form Submission from ${name}`,
      text: [
        `Customer Name: ${name}`,
        `Customer Phone: ${phone}`,
        industry       && `Customer Business: ${industry}`,
        onlinePresence && `Has Website?: ${onlinePresence}`,
        `Message: ${message}`,
      ].filter(Boolean).join("\n"),
    });

    // Check if the email was actually sent
    if (data.error) {
      return NextResponse.json(
        { error: data.error.message || "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data.data?.id });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to send email",
      },
      { status: 500 }
    );
  }
}
