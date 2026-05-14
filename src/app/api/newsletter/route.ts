import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { email } = body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }

  try {
    const formspreeId = process.env.FORMSPREE_ID;
    if (formspreeId) {
      const formspreeRes = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          _subject: `Newsletter Subscription: ${email}`,
          _tag: "newsletter",
        }),
      });

      if (!formspreeRes.ok) {
        throw new Error("Formspree submission failed");
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[arvex] Newsletter submission failed", e);
    return NextResponse.json({ error: "Could not process subscription" }, { status: 500 });
  }
}
