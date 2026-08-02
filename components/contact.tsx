"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Loader2,
  Mail,
  Phone,
  Send,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { Github, Linkedin } from "@/components/brand-icons";
import { site } from "@/lib/site";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, ease } from "@/components/motion-primitives";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    /* ---- validation ---- */
    const next: Errors = {};
    if (name.length < 2) next.name = "Please tell me your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      next.email = "That email doesn't look right.";
    if (message.length < 10) next.message = "A little more detail would help.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    /* ---- no key configured: fall back to the visitor's mail client ---- */
    if (!site.web3formsKey) {
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus("sent");
      setFeedback("Opening your email app — send the draft and it'll reach me.");
      return;
    }

    /* ---- send via Web3Forms ---- */
    setStatus("sending");
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: site.web3formsKey,
          name,
          email,
          message,
          subject: `Portfolio enquiry from ${name}`,
          from_name: "Portfolio site",
          botcheck: data.get("botcheck") ?? "",
        }),
      });

      const json: { success?: boolean; message?: string } = await res.json();

      if (res.ok && json.success) {
        setStatus("sent");
        setFeedback("Message received. I'll get back to you within a day or two.");
        form.reset();
      } else {
        setStatus("error");
        setFeedback(json.message ?? "Something went wrong. Try email instead?");
      }
    } catch {
      setStatus("error");
      setFeedback("Network hiccup. Mind emailing me directly?");
    }
  }

  const channels = [
    { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: Mail },
    { label: "Phone", value: site.phone, href: `tel:${site.phoneHref}`, icon: Phone },
    {
      label: "LinkedIn",
      value: `in/${site.linkedinHandle}`,
      href: site.linkedin,
      icon: Linkedin,
    },
    {
      label: "GitHub",
      value: `@${site.githubHandle}`,
      href: site.github,
      icon: Github,
    },
  ];

  return (
    <section
      id="contact"
      className="relative z-10 mx-auto max-w-5xl scroll-mt-24 px-5 py-24 sm:px-8 md:py-32"
    >
      <SectionHeading
        index="06"
        eyebrow="contact"
        title="Got something worth building?"
        lead="Hiring, collaborating, or just want to compare notes on where to start with ML — the form goes straight to my inbox."
      />

      <div className="grid gap-5 lg:grid-cols-[1fr_1.15fr]">
        {/* Channels */}
        <Reveal className="flex flex-col gap-3">
          {channels.map(({ label, value, href, icon: Icon }, i) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07, ease }}
              className="card-surface group flex cursor-pointer items-center gap-4 rounded-xl px-5 py-4"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-lime-soft text-lime">
                <Icon className="size-4" strokeWidth={1.75} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="mono-label block text-muted-foreground">{label}</span>
                <span className="block truncate text-sm font-medium">{value}</span>
              </span>
              <ArrowUpRight
                className="size-4 shrink-0 text-muted-foreground transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-lime"
                strokeWidth={1.75}
              />
            </motion.a>
          ))}

          <div className="card-surface mt-1 rounded-xl px-5 py-4">
            <p className="mono-label mb-2 text-muted-foreground">response time</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Usually within{" "}
              <span className="font-semibold text-foreground">24–48 hours</span>. If it&apos;s
              urgent, the phone number is right there.
            </p>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="card-surface relative overflow-hidden rounded-2xl p-6 sm:p-8"
          >
            {/* Honeypot — hidden from humans, catches bots */}
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden
            />

            <div className="space-y-5">
              <Field
                label="Your name"
                name="name"
                placeholder="Priya Sharma"
                error={errors.name}
                autoComplete="name"
              />
              <Field
                label="Email"
                name="email"
                type="email"
                placeholder="priya@company.com"
                error={errors.email}
                autoComplete="email"
              />
              <Field
                label="Message"
                name="message"
                placeholder="Tell me what you're working on…"
                error={errors.message}
                textarea
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className={cn(
                "group mt-7 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-lime px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-200",
                status === "sending"
                  ? "cursor-wait opacity-70"
                  : "hover:shadow-[0_10px_36px_-10px_var(--glow)]",
              )}
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="size-4 animate-spin" strokeWidth={2} />
                  Sending…
                </>
              ) : (
                <>
                  Send message
                  <Send
                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    strokeWidth={2}
                  />
                </>
              )}
            </button>

            {/* Result banner */}
            <AnimatePresence>
              {(status === "sent" || status === "error") && (
                <motion.p
                  initial={{ opacity: 0, y: 8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  transition={{ duration: 0.3, ease }}
                  role="status"
                  className={cn(
                    "mt-4 flex items-start gap-2.5 rounded-xl border px-4 py-3 text-[13px] leading-relaxed",
                    status === "sent"
                      ? "border-lime/25 bg-lime-soft text-lime"
                      : "border-destructive/30 bg-destructive/10 text-destructive",
                  )}
                >
                  {status === "sent" ? (
                    <CheckCircle2 className="mt-px size-4 shrink-0" strokeWidth={2} />
                  ) : (
                    <AlertCircle className="mt-px size-4 shrink-0" strokeWidth={2} />
                  )}
                  {feedback}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  error,
  textarea,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  error?: string;
  textarea?: boolean;
  autoComplete?: string;
}) {
  const base = cn(
    "w-full rounded-xl border bg-background/60 px-4 py-3 text-sm text-foreground transition-colors duration-200 placeholder:text-muted-foreground/60",
    "focus:border-lime/60 focus:outline-none",
    error ? "border-destructive/50" : "border-hairline",
  );

  return (
    <div>
      <label
        htmlFor={name}
        className="mono-label mb-2 block text-muted-foreground"
      >
        {label}
      </label>

      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={5}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          className={cn(base, "resize-y")}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          className={base}
        />
      )}

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 text-[12px] text-destructive"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
