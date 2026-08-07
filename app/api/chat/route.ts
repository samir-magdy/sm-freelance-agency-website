import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { Redis } from "@upstash/redis";
import { ipAddress } from "@vercel/functions";
import { groq } from '@ai-sdk/groq';
import { buildPrompt } from "./nolliePrompt";

export const maxDuration = 30;

const redis = Redis.fromEnv();

// ── Abuse guards ──────────────────────────────────────
// A public chatbot endpoint burns real API credits, so cap
// usage per IP and clamp what the client can send us.
const RATE_LIMIT = 20; // messages…
const WINDOW_SECONDS = 60 * 10; // …per 10 minutes per IP
const MAX_HISTORY = 12; // messages of context sent to the model
const MAX_MESSAGE_CHARS = 1_000;

export async function POST(req: Request) {
  // Fixed-window rate limit on the existing Upstash instance.
  const ip = ipAddress(req) ?? "unknown";
  const window = Math.floor(Date.now() / (WINDOW_SECONDS * 1000));
  const key = `chat:rl:${ip}:${window}`;

  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, WINDOW_SECONDS);
  if (count > RATE_LIMIT) {
    return new Response("Rate limit exceeded", { status: 429 });
  }

  const { messages, lang }: { messages: UIMessage[]; lang?: unknown } =
    await req.json();

  // Whitelist the locale before it reaches the prompt — never interpolate raw.
  const pageLang: "en" | "ar" = lang === "ar" ? "ar" : "en";

  // Clamp context length and per-message size before it reaches the model.
  const history = messages.slice(-MAX_HISTORY);
  for (const message of history) {
    for (const part of message.parts) {
      if (part.type === "text" && part.text.length > MAX_MESSAGE_CHARS) {
        return new Response("Message too long", { status: 400 });
      }
    }
  }

  const result = streamText({
    model: groq("qwen/qwen3.6-27b"),
    system: buildPrompt(pageLang),
    messages: await convertToModelMessages(history),
    maxOutputTokens: 120,
    providerOptions: {
      groq: { reasoningEffort: "none" },
    },
  });

  return result.toUIMessageStreamResponse();
}
