"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";

type Step = 0 | 1 | 2 | 3;
type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  message: string;
};

const PROJECT_TYPES = [
  "Private residence",
  "Hospitality / Hotel",
  "Yacht / Aviation",
  "Commercial / Cultural",
  "Bespoke commission",
];

const INITIAL: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  projectType: "",
  message: "",
};

export function LeadForm() {
  const [step, setStep] = useState<Step>(0);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState<string>("");

  function update<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Submission failed");
      }
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Submission failed");
      setStatus("error");
    }
  }

  function next() {
    if (step === 0 && (!form.name || !form.email)) return;
    if (step === 1 && !form.projectType) return;
    setStep((s) => (Math.min(3, s + 1) as Step));
  }
  function back() {
    setStep((s) => (Math.max(0, s - 1) as Step));
  }

  return (
    <section
      id="enquire"
      className="relative py-24 md:py-44 scroll-mt-24"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-24">
          {/* Left: copy */}
          <div className="lg:col-span-5">
            <p className="eyebrow mb-10 text-graphite/65">Private Consultation</p>
            <h2 className="font-display text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[1.02] tracking-[-0.012em] text-graphite">
              Discuss your project with the atelier.
            </h2>
            <p className="mt-8 max-w-[460px] text-[16px] leading-[1.78] text-graphite/65 md:text-[17px]">
              A senior member of our atelier responds within 24 hours. We arrange
              in-person consultations in Jaipur, Mumbai, and New Delhi, and travel
              for on-site project visits across India.
            </p>

            <ul className="mt-14 space-y-5 font-mono text-[10px] uppercase tracking-[0.32em] text-graphite/55">
              <li className="flex items-start gap-4">
                <Dot /> 24-hour response, atelier-direct
              </li>
              <li className="flex items-start gap-4">
                <Dot /> Private viewings in Jaipur, Mumbai & Delhi
              </li>
              <li className="flex items-start gap-4">
                <Dot /> White-glove delivery and installation across India
              </li>
              <li className="flex items-start gap-4">
                <Dot /> Architectural integration drawings on request
              </li>
            </ul>
          </div>

          {/* Right: glassmorphism multi-step form */}
          <div className="lg:col-span-7">
            <div className="relative">
              {/* Decorative halo */}
              <div className="pointer-events-none absolute -inset-16 -z-10 glow-champagne blur-3xl" />

              <form
                onSubmit={submit}
                className="glass relative overflow-hidden rounded-sm p-6 md:p-14"
              >
                {/* Step indicator */}
                <div className="mb-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.32em] text-graphite/55 md:mb-10 md:gap-4">
                  {[0, 1, 2, 3].map((s) => (
                    <div key={s} className="flex flex-1 items-center gap-3">
                      <span className={cn("transition-colors", step >= s ? "text-graphite" : "text-graphite/35")}>
                        0{s + 1}
                      </span>
                      {s < 3 && (
                        <span className="relative h-px flex-1 bg-graphite/15">
                          <motion.span
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: step > s ? 1 : 0 }}
                            transition={{ duration: 0.6 }}
                            className="absolute inset-0 origin-left bg-champagne-400"
                          />
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="py-12 text-center"
                    >
                      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-champagne shadow-halo">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M5 13l4 4L19 7"
                            stroke="#1F1B16"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <h3 className="font-display text-3xl text-graphite">
                        Thank you. Received with care.
                      </h3>
                      <p className="mx-auto mt-4 max-w-sm text-[15px] leading-relaxed text-graphite/65">
                        A senior member of our atelier will be in touch within 24 hours
                        to arrange your private consultation.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.45 }}
                    >
                      {step === 0 && (
                        <Fieldset
                          title="A little about you"
                          subtitle="01 — Introduction"
                        >
                          <Field label="Full name" required>
                            <input
                              required
                              autoFocus
                              value={form.name}
                              onChange={(e) => update("name", e.target.value)}
                              className={inputCls}
                            />
                          </Field>
                          <Field label="Email" required>
                            <input
                              required
                              type="email"
                              value={form.email}
                              onChange={(e) => update("email", e.target.value)}
                              className={inputCls}
                            />
                          </Field>
                          <Field label="Phone (optional)">
                            <input
                              type="tel"
                              value={form.phone}
                              onChange={(e) => update("phone", e.target.value)}
                              className={inputCls}
                            />
                          </Field>
                          <Field label="Studio / Company (optional)">
                            <input
                              value={form.company}
                              onChange={(e) => update("company", e.target.value)}
                              className={inputCls}
                            />
                          </Field>
                        </Fieldset>
                      )}

                      {step === 1 && (
                        <Fieldset
                          title="The nature of the project"
                          subtitle="02 — Context"
                        >
                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {PROJECT_TYPES.map((p) => (
                              <button
                                type="button"
                                key={p}
                                onClick={() => update("projectType", p)}
                                className={cn(
                                  "rounded-[2px] border px-4 py-3 text-left text-sm transition-all duration-300",
                                  form.projectType === p
                                    ? "border-graphite bg-white/70 text-graphite shadow-glass"
                                    : "border-graphite/15 text-graphite/65 hover:border-graphite/35"
                                )}
                              >
                                {p}
                              </button>
                            ))}
                          </div>
                        </Fieldset>
                      )}

                      {step === 2 && (
                        <Fieldset
                          title="Tell us more"
                          subtitle="03 — The brief"
                        >
                          <Field label="Project details">
                            <textarea
                              rows={6}
                              value={form.message}
                              onChange={(e) => update("message", e.target.value)}
                              placeholder="Room dimensions, ceiling height, architectural style, timeline, references…"
                              className={cn(inputCls, "resize-none")}
                            />
                          </Field>
                        </Fieldset>
                      )}

                      {step === 3 && (
                        <Fieldset title="Review" subtitle="04 — Confirm">
                          <Review form={form} />
                          {status === "error" && (
                            <p className="mt-4 text-sm text-red-600">{errorMsg}</p>
                          )}
                        </Fieldset>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer */}
                {status !== "success" && (
                  <div className="mt-10 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={back}
                      disabled={step === 0}
                      className={cn(
                        "btn-ghost",
                        step === 0 && "pointer-events-none opacity-30"
                      )}
                    >
                      ← Back
                    </button>

                    {step < 3 ? (
                      <button
                        type="button"
                        onClick={next}
                        disabled={
                          (step === 0 && (!form.name || !form.email)) ||
                          (step === 1 && !form.projectType)
                        }
                        className={cn(
                          "btn-primary",
                          ((step === 0 && (!form.name || !form.email)) ||
                            (step === 1 && !form.projectType)) &&
                            "pointer-events-none opacity-50"
                        )}
                      >
                        Continue <span aria-hidden>→</span>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className={cn(
                          "btn-primary",
                          status === "submitting" && "pointer-events-none opacity-70"
                        )}
                      >
                        {status === "submitting" ? "Sending..." : "Send to the Atelier"}
                      </button>
                    )}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-[2px] border border-graphite/15 bg-white/55 px-5 py-3.5 font-sans text-[15px] text-graphite placeholder:text-graphite/35 outline-none transition-all duration-500 focus:border-champagne-500 focus:bg-white/90 focus:shadow-halo";

function Fieldset({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-champagne-600">
        {subtitle}
      </p>
      <h3 className="mt-3 font-display text-[28px] leading-[1.1] tracking-tight text-graphite md:text-[32px]">
        {title}
      </h3>
      <div className="mt-9 space-y-6">{children}</div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-graphite/55">
        {label}
        {required && <span className="ml-1 text-ether-600">*</span>}
      </span>
      {children}
    </label>
  );
}

function Review({ form }: { form: FormState }) {
  const rows: { k: string; v: string }[] = [
    { k: "Name", v: form.name },
    { k: "Email", v: form.email },
    ...(form.phone ? [{ k: "Phone", v: form.phone }] : []),
    ...(form.company ? [{ k: "Company", v: form.company }] : []),
    { k: "Project Type", v: form.projectType },
    ...(form.message ? [{ k: "Brief", v: form.message }] : []),
  ];
  return (
    <dl className="divide-y divide-graphite/10 rounded-[2px] border border-graphite/10 bg-white/40">
      {rows.map((r) => (
        <div key={r.k} className="grid grid-cols-3 gap-4 px-4 py-3">
          <dt className="col-span-1 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite/55">
            {r.k}
          </dt>
          <dd className="col-span-2 text-sm text-graphite">{r.v}</dd>
        </div>
      ))}
    </dl>
  );
}

function Dot() {
  return (
    <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-ether-500" />
  );
}
