import { Resend } from "resend";
import { ipAddress } from "@vercel/functions";
import { NextResponse, type NextRequest } from "next/server";
import { redis } from "@/lib/redis";

export const runtime = "edge";

const resend = new Resend(process.env.RESEND_API_KEY);

// Allow 1 submission every 180 seconds (3 minutes) per user.
const MAX_SUBMISSIONS = 1;
const WINDOW_SECONDS = 180;

export type ContactMethod = "whatsapp" | "phone-call" | "email";

export interface ContactPayload {
  name: string;
  phone?: string;
  contactMethod: ContactMethod | "";
  email?: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      phone,
      contactMethod,
      email,
      message,
    }: Partial<ContactPayload> = await request.json();

    if (!name || !contactMethod) {
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
      phone: 20,
      email: 100,
      message: 500,
    } as const;

    if (
      name.length > MAX_LENGTHS.name ||
      (phone && phone.length > MAX_LENGTHS.phone) ||
      (email && email.length > MAX_LENGTHS.email) ||
      (message && message.length > MAX_LENGTHS.message)
    ) {
      return NextResponse.json(
        { error: "One or more fields exceed the maximum allowed length." },
        { status: 400 },
      );
    }

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
                error:
                  "Please wait a few minutes before sending another message.",
              },
              { status: 429 },
            );
          }
        }
      }
    } catch {
      // Redis unavailable — skip rate limiting so the form still works
    }

    const data = await resend.emails.send({
      from: "SM Web Design Studio <noreply@mail.samirmagdy.com>",
      to: process.env.CONTACT_EMAIL ?? "",
      subject: "Website Consultation Request",
      text: [
        `Name: ${name}`,
        `Contact Method: ${contactMethod}`,
        phone && `Phone: ${phone}`,
        email && `Email: ${email}`,
        message && `Message: ${message}`,
      ]
        .filter(Boolean)
        .join("\n"),
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
