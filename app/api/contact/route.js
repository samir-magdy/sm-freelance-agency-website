import { Resend } from "resend";
import { ipAddress } from "@vercel/functions";
import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export const runtime = 'edge';

const resend = new Resend(process.env.RESEND_API_KEY);

// --- Rate Limiting Configuration ---
// Allow 1 submission every 180 seconds (3 minutes) per user.
const MAX_SUBMISSIONS = 1;
const WINDOW_SECONDS = 180; // 3 minutes
// ------------------------------------

export async function POST(request) {
  try {
    const {
      name,
      phone,
      industry,
      contactMethod,
      email,
      message,
    } = await request.json();

    // Basic validation
    if (!name || !industry || !contactMethod) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    if (
      (contactMethod === "whatsapp" || contactMethod === "phone-call") &&
      !phone
    ) {
      return NextResponse.json(
        {
          error: "Phone is required for WhatsApp or Phone Call contact method",
        },
        { status: 400 },
      );
    }


    if (contactMethod === "email" && !email) {
      return NextResponse.json(
        { error: "Email is required when email is selected as contact method" },
        { status: 400 },
      );
    }

    const MAX_LENGTHS = {
      name: 50,
      industry: 50,
      phone: 20,
      email: 100,
      message: 500,
    };

    if (
      name.length > MAX_LENGTHS.name ||
      industry.length > MAX_LENGTHS.industry ||
      (phone && phone.length > MAX_LENGTHS.phone) ||
      (email && email.length > MAX_LENGTHS.email) ||
      (message && message.length > MAX_LENGTHS.message)
    ) {
      return NextResponse.json(
        { error: "One or more fields exceed the maximum allowed length." },
        { status: 400 },
      );
    }

    // --- Rate Limiting (degrades gracefully if Redis is unavailable) ---
    try {
      if (redis) {
        const userIdentifier = ipAddress(request);

        if (userIdentifier) {
          const key = `rate-limit:contact-form:${userIdentifier}`;
          const count = await redis.incr(key);

          if (count === 1) {
            await redis.expire(key, WINDOW_SECONDS);
          }
          if (count > MAX_SUBMISSIONS) {
            return NextResponse.json(
              {
                error: `Please wait a few minutes before sending another message.`,
              },
              { status: 429 },
            );
          }
        }
      }
    } catch {
      // Redis unavailable — skip rate limiting so the form still works
    }
    // Send Email via Resend
    const data = await resend.emails.send({
      from: "SM Web Studio <noreply@mail.samirmagdy.com>",
      to: process.env.CONTACT_EMAIL ?? "",
      subject: `Website Consultation Request`,
      text: [
        `Name: ${name}`,
        `Business: ${industry}`,
        `Contact Method: ${contactMethod}`,
        phone && `Phone: ${phone}`,
        email && `Email: ${email}`,
        message && `Message: ${message}`,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    // Check if the email was actually sent
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
