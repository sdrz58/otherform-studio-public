"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/hooks/use-reveal";

const email = "hello@otherform.studio";

export function Contact() {
  const scope = useReveal<HTMLElement>();
  const [briefUrl, setBriefUrl] = useState("");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");

  const createBrief = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = `Project inquiry — ${data.get("name")} / ${data.get("project")}`;
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Company: ${data.get("company") || "Not specified"}`,
      `Project: ${data.get("project")}`,
      `Budget: ${data.get("budget")}`,
      "",
      "About the project:",
      data.get("message"),
    ].join("\n");
    setBriefUrl(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const showCopied = () => {
    setCopyStatus("copied");
    window.setTimeout(() => setCopyStatus("idle"), 1800);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      showCopied();
    } catch {
      const field = document.createElement("textarea");
      field.value = email;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      const success = document.execCommand("copy");
      field.remove();
      if (success) showCopied();
      else setCopyStatus("error");
    }
  };

  return (
    <section ref={scope} id="contact" className="section-pad border-t border-line" aria-labelledby="contact-title">
      <div className="page-shell">
        <div data-reveal className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="mono-label text-signal">Your turn</p>
            <h2 id="contact-title" className="display-type mt-7 text-[16vw] md:text-[10vw]">
              HAVE A<br />STRANGE <span className="font-serif font-normal italic tracking-[-0.04em] text-signal">idea?</span><br />GOOD.
            </h2>
          </div>
          <div className="flex flex-col justify-end md:col-span-3 md:col-start-10">
            <p className="text-lg leading-relaxed text-muted-foreground">Tell us what you’re imagining, even if it’s still a little rough around the edges.</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={`mailto:${email}`} className="inline-flex min-h-11 items-center gap-2 text-sm font-medium underline decoration-line underline-offset-8 transition-colors hover:text-signal">{email}<ArrowUpRight className="size-4" aria-hidden="true" /></a>
              <Button variant="ghost" size="icon" onClick={copyEmail} aria-label={copyStatus === "copied" ? "Email copied" : "Copy email address"}>
                {copyStatus === "copied" ? <Check className="text-signal" aria-hidden="true" /> : <Copy aria-hidden="true" />}
              </Button>
            </div>
            <span className={copyStatus === "error" ? "mt-3 block text-sm text-signal" : "sr-only"} aria-live="polite">
              {copyStatus === "copied" ? "Email address copied to clipboard" : copyStatus === "error" ? "Copy unavailable. Please select the email address instead." : ""}
            </span>
          </div>
        </div>

        <form data-reveal onSubmit={createBrief} className="mt-16 grid gap-x-8 gap-y-7 border-t border-line pt-10 md:mt-24 md:grid-cols-2 md:pt-14">
          <div>
            <label htmlFor="contact-name" className="mono-label">Your name *</label>
            <input id="contact-name" name="name" className="field-input mt-2" type="text" autoComplete="name" placeholder="How should we address you?" required minLength={2} />
          </div>
          <div>
            <label htmlFor="contact-email" className="mono-label">Email address *</label>
            <input id="contact-email" name="email" className="field-input mt-2" type="email" autoComplete="email" placeholder="you@company.com" required />
          </div>
          <div>
            <label htmlFor="contact-company" className="mono-label">Company</label>
            <input id="contact-company" name="company" className="field-input mt-2" type="text" autoComplete="organization" placeholder="Your team or organization" />
          </div>
          <div>
            <label htmlFor="contact-project" className="mono-label">What are we making? *</label>
            <select id="contact-project" name="project" className="field-input mt-2" required defaultValue="">
              <option value="" disabled>Choose a project type</option>
              <option>Brand identity</option>
              <option>Digital flagship</option>
              <option>Product experience</option>
              <option>3D and motion</option>
              <option>Something less expected</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="contact-budget" className="mono-label">Indicative budget *</label>
            <select id="contact-budget" name="budget" className="field-input mt-2" required defaultValue="">
              <option value="" disabled>Choose a comfortable range</option>
              <option>€15k—€30k</option>
              <option>€30k—€60k</option>
              <option>€60k—€100k</option>
              <option>€100k+</option>
              <option>Let’s work it out together</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="contact-message" className="mono-label">The interesting part *</label>
            <textarea id="contact-message" name="message" className="field-input mt-2 min-h-32 resize-y" placeholder="What are you trying to change, launch, or make possible?" required minLength={20} />
          </div>
          <div className="flex flex-col items-start gap-4 md:col-span-2 md:flex-row md:items-center md:justify-between">
            <p className="max-w-md text-sm text-muted-foreground">This creates a pre-filled email in your mail app. Nothing is sent or stored by this website.</p>
            <Button type="submit" variant="signal" size="lg" className="w-full shrink-0 md:w-auto">Prepare project brief <ArrowUpRight aria-hidden="true" /></Button>
          </div>
        </form>

        {briefUrl ? (
          <div className="mt-8 flex flex-col items-start justify-between gap-5 border border-signal bg-signal/5 p-6 md:flex-row md:items-center" role="status">
            <div>
              <p className="font-semibold">Your brief is ready.</p>
              <p className="mt-1 text-sm text-muted-foreground">Review it, then continue in your email app to send it.</p>
            </div>
            <a href={briefUrl} className="inline-flex min-h-12 shrink-0 items-center gap-3 rounded-full bg-signal px-6 text-sm font-semibold text-ink transition-colors hover:bg-paper">Open email app <ArrowUpRight className="size-4" aria-hidden="true" /></a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
