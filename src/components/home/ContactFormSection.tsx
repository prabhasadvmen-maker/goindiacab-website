"use client";

import { useState } from "react";
import { Container } from "../common/Container";
import {
  MapPin, Phone, Mail, CheckCircle, Clock, MessageCircle, AlertCircle, Loader2, Send, ChevronDown, ShieldCheck,
} from "lucide-react";
import { siteConfig } from "@/src/config/site";
import { submitContactInquiry } from "@/src/lib/api";

const SUBJECTS = ["General Inquiry", "Booking Help", "Complaint", "Partnership", "Other"];
const WHATSAPP_URL = "https://wa.me/919792000555";
const telHref = (p: string) => `tel:${p.replace(/[^+\d]/g, "")}`;

const SERVICE_TYPES = ["Outstation Trip", "Local Rental", "Airport Transfer", "Corporate / Monthly", "Wedding / Event", "Other"];
const todayStr = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

type FormState = {
  name: string; phone: string; email: string; subject: string; message: string;
  serviceType: string; pickupLocation: string; dropLocation: string; travelDate: string; passengers: string;
};
type Field = keyof FormState;
const EMPTY: FormState = {
  name: "", phone: "", email: "", subject: "", message: "",
  serviceType: "", pickupLocation: "", dropLocation: "", travelDate: "", passengers: "",
};

const fieldCls = (invalid: boolean) =>
  `w-full h-11 px-3.5 rounded-lg border bg-white text-[#1A1A2E] text-sm placeholder-gray-400 outline-none transition-colors focus:ring-2 ${
    invalid ? "border-red-400 focus:ring-red-100" : "border-gray-300 hover:border-gray-400 focus:border-[#3E4FB0] focus:ring-[#3E4FB0]/20"
  }`;
const labelCls = "block text-[13px] font-semibold text-[#1A1A2E] mb-1.5";

const socials = [
  {
    label: "Instagram", href: siteConfig.social.instagram,
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>,
  },
  {
    label: "Facebook", href: siteConfig.social.facebook,
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>,
  },
  {
    label: "Twitter / X", href: siteConfig.social.twitter,
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
  },
  {
    label: "LinkedIn", href: siteConfig.social.linkedin,
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>,
  },
];

const infoRows = [
  { icon: MapPin, label: "Head Office", content: <p className="text-[15px] leading-relaxed text-white/90">{siteConfig.address}</p> },
  {
    icon: Phone, label: "Phone",
    content: (
      <>
        <a href={telHref(siteConfig.phone.booking1)} className="block text-[15px] font-semibold text-white hover:text-[#FFB606] transition-colors">{siteConfig.phone.booking1}</a>
        <a href={telHref(siteConfig.phone.booking2)} className="block text-[15px] font-semibold text-white hover:text-[#FFB606] transition-colors">{siteConfig.phone.booking2}</a>
      </>
    ),
  },
  {
    icon: Mail, label: "Email",
    content: <a href={`mailto:${siteConfig.email}`} className="block text-[15px] font-semibold text-white hover:text-[#FFB606] transition-colors break-all">{siteConfig.email}</a>,
  },
  { icon: Clock, label: "Business Hours", content: <p className="text-[15px] font-semibold text-white">Mon–Sun, 24/7</p> },
];

export function ContactFormSection() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const errors: Partial<Record<Field, string>> = {};
  if (!form.name.trim()) errors.name = "Please enter your full name.";
  if (!/^\d{10}$/.test(form.phone)) errors.phone = "Enter a valid 10-digit mobile number.";
  if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = "Enter a valid email address.";
  if (!form.subject) errors.subject = "Please select a subject.";
  if (form.message.trim().length < 10) errors.message = `Message must be at least 10 characters (${form.message.trim().length}/10).`;

  if (form.travelDate && form.travelDate < todayStr()) errors.travelDate = "Travel date cannot be in the past.";
  if (form.passengers && !(Number(form.passengers) >= 1 && Number(form.passengers) <= 50)) errors.passengers = "Enter 1 to 50 passengers.";

  const set = (k: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({
      ...f,
      [k]: k === "phone" ? e.target.value.replace(/\D/g, "").slice(0, 10) : k === "passengers" ? e.target.value.replace(/\D/g, "").slice(0, 2) : e.target.value,
    }));
  const blur = (k: Field) => () => setTouched((t) => ({ ...t, [k]: true }));
  const showErr = (k: Field) => (touched[k] ? errors[k] : undefined);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;
    if (Object.keys(errors).length) {
      setTouched({ name: true, phone: true, email: true, subject: true, message: true, travelDate: true, passengers: true });
      setError("Please fix the highlighted fields and try again.");
      return;
    }
    setError("");
    setStatus("submitting");
    try {
      const res = await submitContactInquiry({
        name: form.name.trim(),
        phone: form.phone,
        email: form.email.trim() || undefined,
        subject: form.subject,
        message: form.message.trim(),
        serviceType: form.serviceType || undefined,
        pickupLocation: form.pickupLocation.trim() || undefined,
        dropLocation: form.dropLocation.trim() || undefined,
        travelDate: form.travelDate || undefined,
        passengers: form.passengers ? Number(form.passengers) : undefined,
      });
      setSuccessMsg(res.message);
      setForm(EMPTY);
      setTouched({});
      setStatus("success");
    } catch (err) {
      setError(
        err instanceof DOMException && err.name === "AbortError"
          ? "The request timed out. Please try again."
          : err instanceof Error && err.message
            ? err.message
            : "Something went wrong. Please try again."
      );
      setStatus("idle");
    }
  };

  const ErrText = ({ k }: { k: Field }) =>
    showErr(k) ? <p className="mt-1 text-xs font-medium text-red-600">{errors[k]}</p> : null;

  return (
    <section className="bg-[#F4F6FA] pb-16 md:pb-20">
      <Container>
        <div className="max-w-6xl mx-auto -mt-10 relative z-10">
          {/* Quick contact strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 bg-white rounded-2xl border border-gray-200 shadow-lg divide-y md:divide-y-0 md:divide-x divide-gray-200 overflow-hidden mb-10">
            <a href={telHref(siteConfig.phone.booking1)} className="group flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors">
              <span className="w-12 h-12 rounded-lg bg-[#3E4FB0] text-white flex items-center justify-center shrink-0"><Phone className="w-5 h-5" /></span>
              <span className="min-w-0">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">Call 24/7</span>
                <span className="block font-bold text-[#1A1A2E] group-hover:text-[#3E4FB0] transition-colors">{siteConfig.phone.booking1}</span>
              </span>
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors">
              <span className="w-12 h-12 rounded-lg bg-[#25D366] text-white flex items-center justify-center shrink-0"><MessageCircle className="w-5 h-5" /></span>
              <span className="min-w-0">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">WhatsApp</span>
                <span className="block font-bold text-[#1A1A2E] group-hover:text-[#3E4FB0] transition-colors">Chat with our team</span>
              </span>
            </a>
            <a href={`mailto:${siteConfig.email}`} className="group flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors">
              <span className="w-12 h-12 rounded-lg bg-[#FFB606] text-[#1A1A2E] flex items-center justify-center shrink-0"><Mail className="w-5 h-5" /></span>
              <span className="min-w-0">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">Email</span>
                <span className="block font-bold text-[#1A1A2E] group-hover:text-[#3E4FB0] transition-colors truncate">{siteConfig.email}</span>
              </span>
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-2xl overflow-hidden border border-gray-200 shadow-xl bg-white">
            {/* Info panel */}
            <aside className="lg:col-span-5 order-2 lg:order-1 bg-[#1A1A2E] text-white p-8 md:p-10 flex flex-col">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#FFB606] mb-2">Reach Us</p>
              <h2 className="text-2xl md:text-[28px] font-extrabold leading-tight">Contact Information</h2>
              <p className="text-sm text-white/60 mt-2 mb-8">Our support team is available round the clock for bookings, queries and partnerships.</p>

              <ul className="divide-y divide-white/10 border-y border-white/10">
                {infoRows.map((r) => (
                  <li key={r.label} className="flex items-start gap-4 py-5">
                    <span className="w-10 h-10 rounded-lg border border-white/15 bg-white/5 flex items-center justify-center shrink-0"><r.icon className="w-[18px] h-[18px] text-[#FFB606]" /></span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-white/50 mb-1">{r.label}</p>
                      {r.content}
                    </div>
                  </li>
                ))}
              </ul>

              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-8 flex items-center justify-center gap-2 h-12 rounded-lg bg-[#25D366] text-white font-bold hover:brightness-95 transition">
                <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
              </a>

              <div className="mt-auto pt-8">
                <p className="text-[11px] font-bold uppercase tracking-wider text-white/50 mb-3">Follow Us</p>
                <div className="flex gap-2.5">
                  {socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label}
                      className="w-10 h-10 rounded-lg border border-white/15 bg-white/5 hover:bg-[#FFB606] hover:border-[#FFB606] hover:text-[#1A1A2E] flex items-center justify-center transition-colors">
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </aside>

            {/* Form */}
            <div className="lg:col-span-7 order-1 lg:order-2 p-6 sm:p-8 md:p-9">
              {status === "success" ? (
                <div role="status" className="flex flex-col items-center justify-center text-center py-16 h-full rounded-xl bg-green-50 border border-green-200">
                  <span className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-5"><CheckCircle className="w-12 h-12 text-green-500" /></span>
                  <h3 className="text-2xl font-bold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-700 font-medium px-6 max-w-sm">{successMsg || "Thank you for contacting us. We will get back to you shortly."}</p>
                  <button type="button" onClick={() => setStatus("idle")} className="mt-7 px-6 h-11 rounded-lg border border-green-300 bg-white font-bold text-green-700 hover:bg-green-100 transition">
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap items-start justify-between gap-3 pb-4 mb-5 border-b border-gray-200">
                    <div>
                      <h3 className="text-2xl font-extrabold text-[#1A1A2E]">Send us a message</h3>
                      <p className="text-sm text-gray-500 mt-1">Fill in the form and we will respond shortly.</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 text-green-700 border border-green-200 px-3 py-1 text-xs font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Typical reply within 24 hrs
                    </span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact_name" className={labelCls}>Full Name <span className="text-red-500">*</span></label>
                        <input id="contact_name" type="text" value={form.name} onChange={set("name")} onBlur={blur("name")} maxLength={100} autoComplete="name" placeholder="Enter your full name" aria-invalid={!!showErr("name")} className={fieldCls(!!showErr("name"))} />
                        <ErrText k="name" />
                      </div>
                      <div>
                        <label htmlFor="contact_phone" className={labelCls}>Phone Number <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <span className="absolute left-0 top-0 h-11 px-3 flex items-center text-sm font-semibold text-gray-600 bg-gray-50 border border-gray-300 rounded-l-lg pointer-events-none">+91</span>
                          <input id="contact_phone" type="tel" inputMode="numeric" value={form.phone} onChange={set("phone")} onBlur={blur("phone")} autoComplete="tel-national" placeholder="Mobile number" aria-invalid={!!showErr("phone")} className={`${fieldCls(!!showErr("phone"))} pl-[60px]`} />
                        </div>
                        <ErrText k="phone" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact_email" className={labelCls}>Email Address <span className="text-gray-400 font-normal text-xs">(optional)</span></label>
                        <input id="contact_email" type="email" value={form.email} onChange={set("email")} onBlur={blur("email")} autoComplete="email" placeholder="you@example.com" aria-invalid={!!showErr("email")} className={fieldCls(!!showErr("email"))} />
                        <ErrText k="email" />
                      </div>
                      <div>
                        <label htmlFor="contact_subject" className={labelCls}>Subject <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <select id="contact_subject" value={form.subject} onChange={set("subject")} onBlur={blur("subject")} aria-invalid={!!showErr("subject")} className={`${fieldCls(!!showErr("subject"))} appearance-none pr-10 ${form.subject ? "" : "text-gray-400"}`}>
                            <option value="">Select a subject</option>
                            {SUBJECTS.map((s) => <option key={s} value={s} className="text-[#1A1A2E]">{s}</option>)}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>
                        <ErrText k="subject" />
                      </div>
                    </div>

                    <div className="pt-1">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#3E4FB0] mb-3 flex items-center gap-3">
                        Trip Details <span className="font-medium normal-case tracking-normal text-gray-400">(optional — helps us quote faster)</span>
                        <span className="flex-1 h-px bg-gray-200" />
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label htmlFor="contact_service" className={labelCls}>Service Required</label>
                          <div className="relative">
                            <select id="contact_service" value={form.serviceType} onChange={set("serviceType")} className={`${fieldCls(false)} appearance-none pr-10 ${form.serviceType ? "" : "text-gray-400"}`}>
                              <option value="">Select service type</option>
                              {SERVICE_TYPES.map((s) => <option key={s} value={s} className="text-[#1A1A2E]">{s}</option>)}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="contact_pickup" className={labelCls}>Pickup Location</label>
                          <input id="contact_pickup" type="text" value={form.pickupLocation} onChange={set("pickupLocation")} maxLength={200} placeholder="e.g. Connaught Place, Delhi" className={fieldCls(false)} />
                        </div>
                        <div>
                          <label htmlFor="contact_drop" className={labelCls}>Drop Location</label>
                          <input id="contact_drop" type="text" value={form.dropLocation} onChange={set("dropLocation")} maxLength={200} placeholder="e.g. Jaipur" className={fieldCls(false)} />
                        </div>
                        <div>
                          <label htmlFor="contact_date" className={labelCls}>Travel Date</label>
                          <input id="contact_date" type="date" min={todayStr()} value={form.travelDate} onChange={set("travelDate")} onBlur={blur("travelDate")} aria-invalid={!!showErr("travelDate")} className={fieldCls(!!showErr("travelDate"))} />
                          <ErrText k="travelDate" />
                        </div>
                        <div>
                          <label htmlFor="contact_pax" className={labelCls}>Number of Passengers</label>
                          <input id="contact_pax" type="text" inputMode="numeric" value={form.passengers} onChange={set("passengers")} onBlur={blur("passengers")} placeholder="e.g. 4" aria-invalid={!!showErr("passengers")} className={fieldCls(!!showErr("passengers"))} />
                          <ErrText k="passengers" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="contact_message" className="text-[13px] font-semibold text-[#1A1A2E]">Your Message <span className="text-red-500">*</span></label>
                        <span className="text-xs text-gray-400">{form.message.length}/2000</span>
                      </div>
                      <textarea id="contact_message" value={form.message} onChange={set("message")} onBlur={blur("message")} rows={3} maxLength={2000} placeholder="Tell us how we can help you (minimum 10 characters)" aria-invalid={!!showErr("message")} className={`${fieldCls(!!showErr("message"))} h-auto py-3 resize-none`} />
                      <ErrText k="message" />
                    </div>

                    {error && (
                      <div role="alert" className="flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm font-medium">
                        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    <button type="submit" disabled={status === "submitting"}
                      className="w-full inline-flex items-center justify-center gap-2 h-11 rounded-lg bg-[#3E4FB0] text-white font-bold hover:bg-[#33419a] transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                      {status === "submitting" ? (<><Loader2 className="w-5 h-5 animate-spin" /> Sending Message...</>) : (<><Send className="w-4 h-4" /> Send Message</>)}
                    </button>

                    <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
                      <ShieldCheck className="w-4 h-4" /> Your details are kept confidential and used only to respond to your inquiry.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
