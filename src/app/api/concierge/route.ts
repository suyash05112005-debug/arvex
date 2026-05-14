import { NextResponse } from "next/server";
import { PRODUCTS, CATEGORIES } from "@/data/products";

export const runtime = "nodejs";

/**
 * Stubbed concierge agent. Pattern-matches the message and returns a
 * recommendation drawn from real product data. Swap the body of `respond` for a
 * call to Anthropic's Messages API (claude-opus-4-7) when a key is configured.
 */
function respond(message: string): { reply: string; suggestions?: string[] } {
  const m = message.toLowerCase();

  // Greetings
  if (/^(hi|hello|hey|good\s)/.test(m)) {
    return {
      reply:
        "Welcome to Arvex. I can help you find the right piece, or arrange a private consultation with a senior member of the atelier. What kind of room are you lighting?",
      suggestions: ["Help me find a piece", "Book a private consultation", "What is the lead time?"],
    };
  }

  // Category routing
  for (const cat of CATEGORIES) {
    if (m.includes(cat.id.split("-")[0]) || m.includes(cat.name.toLowerCase().split(" ")[0])) {
      const examples = PRODUCTS.filter((p) => p.category === cat.id).slice(0, 3);
      return {
        reply: `${cat.name}: ${cat.description} A few you might consider — ${examples
          .map((p) => `${p.name} (${p.tagline})`)
          .join(" · ")}.`,
        suggestions: examples.map((p) => `Tell me about ${p.name}`),
      };
    }
  }

  // Specific product
  for (const p of PRODUCTS) {
    if (m.includes(p.name.toLowerCase()) || m.includes(p.slug)) {
      return {
        reply: `${p.name} — ${p.tagline} ${p.description} Materials: ${p.materials.join(
          ", "
        )}. ${p.edition}, ${p.leadTimeWeeks}-week lead time.`,
        suggestions: ["Book a viewing", "What's the price range?", "Show me similar pieces"],
      };
    }
  }

  // Booking / pricing
  if (
    m.includes("book") ||
    m.includes("viewing") ||
    m.includes("appointment") ||
    m.includes("consultation")
  ) {
    return {
      reply:
        "We arrange private consultations at our Noida studio and showrooms in Mumbai and New Delhi, and travel for on-site project visits across India. The Request Private Consultation form just below is the fastest route — a senior member of the studio responds within 24 hours.",
      suggestions: ["Open the form", "What is the lead time?"],
    };
  }
  if (m.includes("price") || m.includes("cost") || m.includes("budget")) {
    return {
      reply:
        "Each Arvex piece is built to order and quoted on a per-project basis. Pricing depends on scale, materials, and architectural integration — share your brief through the consultation form and we will return a written quote within 24 hours.",
      suggestions: ["Open the form", "Show me entry-level pieces"],
    };
  }
  if (m.includes("lead time") || m.includes("delivery") || m.includes("ship")) {
    return {
      reply:
        "Lead times range from 6 weeks for our smallest pieces to 22 weeks for the larger commissions. White-glove delivery and installation are included for all projects across India.",
    };
  }
  if (m.includes("ceiling") || m.includes("dimension") || m.includes("size") || m.includes("room")) {
    return {
      reply:
        "Tell me the ceiling height, room dimensions, and architectural style — I will narrow the collection to two or three pieces that suit, then connect you with the atelier.",
    };
  }

  // Default
  return {
    reply:
      "I can help you find the right piece. Tell me a little about the room — ceiling height, the mood you are after, whether you prefer something sculptural or quietly minimal — and I will suggest two or three.",
    suggestions: [
      "Show me the Aurora Veil",
      "Something more minimal",
      "Book a private consultation",
    ],
  };
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { message?: string } | null;
  const msg = body?.message?.toString().trim();
  if (!msg) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }
  if (msg.length > 1000) {
    return NextResponse.json({ error: "Message too long" }, { status: 400 });
  }
  return NextResponse.json(respond(msg));
}
