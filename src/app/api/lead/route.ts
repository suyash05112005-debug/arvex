import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

type Lead = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: string;
  message?: string;
  ip?: string;
  userAgent?: string;
};

function isEmail(s: unknown): s is string {
  return typeof s === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

async function readLeads(): Promise<Lead[]> {
  try {
    const raw = await fs.readFile(LEADS_FILE, "utf8");
    return JSON.parse(raw);
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw e;
  }
}

async function writeLeads(leads: Lead[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf8");
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, phone, company, projectType, message } = body as Record<
    string,
    string | undefined
  >;

  // Basic validation
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }
  if (!projectType || typeof projectType !== "string") {
    return NextResponse.json({ error: "Project type is required" }, { status: 400 });
  }

  const lead: Lead = {
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone?.trim() || undefined,
    company: company?.trim() || undefined,
    projectType,
    message: message?.trim() || undefined,
    ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined,
    userAgent: req.headers.get("user-agent") || undefined,
  };

  try {
    // 1. Save locally for backup (note: will only work in environments with persistent FS)
    try {
      const leads = await readLeads();
      leads.push(lead);
      await writeLeads(leads);
    } catch (e) {
      console.warn("[arvex] Local lead-write failed (expected in some serverless environments)", e);
    }

    // 2. Forward to Formspree if configured
    const formspreeId = process.env.FORMSPREE_ID;
    if (formspreeId) {
      const formspreeRes = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          company: lead.company,
          project_type: lead.projectType,
          message: lead.message,
          _subject: `New Lead: ${lead.name} (${lead.projectType})`,
          _metadata: {
            id: lead.id,
            userAgent: lead.userAgent,
          },
        }),
      });

      if (!formspreeRes.ok) {
        const errData = await formspreeRes.json().catch(() => ({}));
        console.error("[arvex] Formspree submission failed", errData);
        // We continue anyway since we saved it locally (or at least tried)
      }
    }

    // 3. Optional console notification
    if (process.env.LEAD_NOTIFY_EMAIL) {
      console.log(`[arvex] new lead → notify ${process.env.LEAD_NOTIFY_EMAIL}`, lead);
    } else {
      console.log("[arvex] new lead", lead);
    }

    return NextResponse.json({ ok: true, id: lead.id });
  } catch (e) {
    console.error("[arvex] Lead processing failed", e);
    return NextResponse.json({ error: "Could not process lead" }, { status: 500 });
  }
}
