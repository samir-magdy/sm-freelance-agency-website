import { Resend } from "resend";
import { ipAddress } from "@vercel/functions";
import { NextResponse, type NextRequest } from "next/server";
import { redis } from "@/lib/redis";
import { isValidEmail, isValidPhone } from "@/lib/contactValidation";
import { SITE_NAME } from "@/app/constants";
import { isLang } from "@/app/types";
import { formatAnswers, isValidAnswers } from "./formatAnswers";
import { buildQuoteEmailHtml } from "./emailTemplate";

export const runtime = "edge";

const resend = new Resend(process.env.RESEND_API_KEY);

const MAX_SUBMISSIONS = 1;
const WINDOW_SECONDS = 180;

type ContactMethod = "whatsapp" | "phone-call" | "email";
const CONTACT_METHODS: ContactMethod[] = ["whatsapp", "phone-call", "email"];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const rawAnswers = body?.answers ?? {};
    if (!isValidAnswers(rawAnswers)) {
      return NextResponse.json(
        { error: "Invalid answers format" },
        { status: 400 },
      );
    }
    const answers = rawAnswers;
    const rawContact: {
      name?: unknown;
      method?: unknown;
      phone?: unknown;
      email?: unknown;
    } = body?.contact ?? {};
    const lang = isLang(body?.lang) ? body.lang : "en";

    const name = typeof rawContact.name === "string" ? rawContact.name.trim() : "";
    const method =
      typeof rawContact.method === "string" &&
      CONTACT_METHODS.includes(rawContact.method as ContactMethod)
        ? (rawContact.method as ContactMethod)
        : undefined;
    const phone = typeof rawContact.phone === "string" ? rawContact.phone.trim() : "";
    const email = typeof rawContact.email === "string" ? rawContact.email.trim() : "";

    if (!name || !method) {
      return NextResponse.json(
        { error: "Name and contact method are required" },
        { status: 400 },
      );
    }

    const MAX_LENGTHS = { name: 50, phone: 20, email: 100 } as const;
    if (name.length > MAX_LENGTHS.name) {
      return NextResponse.json(
        { error: "One or more fields exceed the maximum allowed length." },
        { status: 400 },
      );
    }

    if (method === "whatsapp" || method === "phone-call") {
      if (!phone || phone.length > MAX_LENGTHS.phone || !isValidPhone(phone)) {
        return NextResponse.json(
          { error: "A valid phone number is required for this contact method." },
          { status: 400 },
        );
      }
    }

    if (method === "email") {
      if (!email || email.length > MAX_LENGTHS.email || !isValidEmail(email)) {
        return NextResponse.json(
          { error: "A valid email address is required for this contact method." },
          { status: 400 },
        );
      }
    }

    const contact = { name, method, phone, email };

    try {
      if (redis) {
        const userIdentifier = ipAddress(request);
        if (userIdentifier) {
          const key = `rate-limit:quote-form:${userIdentifier}`;
          const count = await redis.incr(key);
          if (count === 1) await redis.expire(key, WINDOW_SECONDS);
          if (count > MAX_SUBMISSIONS) {
            return NextResponse.json(
              { error: "Please wait a few minutes before submitting again." },
              { status: 429 },
            );
          }
        }
      }
    } catch {
      // Redis unavailable — skip rate limiting so the form still works
    }

    const answersText = formatAnswers(answers, lang);

    const data = await resend.emails.send({
      from: `${SITE_NAME} <noreply@mail.samirmagdy.com>`,
      to: process.env.CONTACT_EMAIL ?? "",
      subject: "Detailed Project Questionnaire Submission",
      text: [
        `Name: ${contact.name}`,
        `Contact Method: ${contact.method}`,
        contact.phone && `Phone: ${contact.phone}`,
        contact.email && `Email: ${contact.email}`,
        "",
        "── Questionnaire Answers ──",
        answersText,
      ]
        .filter(Boolean)
        .join("\n"),
      html: buildQuoteEmailHtml(
        {
          name: contact.name,
          method: contact.method,
          phone: contact.phone,
          email: contact.email,
        },
        answers,
        lang,
      ),
    });

    if (data.error) {
      return NextResponse.json(
        { error: data.error.message || "Failed to send email" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, id: data.data?.id });
  } catch (error) {
    console.error("QUOTE ROUTE ERROR:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 },
    );
  }
}