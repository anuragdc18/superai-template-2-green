import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  ClipboardList,
  Dribbble,
  FileText,
  GraduationCap,
  Headphones,
  IndianRupee,
  Instagram,
  MapPin,
  MessageCircle,
  Minus,
  PenTool,
  Phone,
  Plus,
  Printer,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Upload,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CATEGORIES, POPULAR, SLIDES, serviceUrl, waLink } from "../lib/site";
import { telHref, useSite } from "../queries/site";
import { openChat } from "../lib/chat-bus";

/** Icon + colour for each category (same order as CATEGORIES). */
const CAT_STYLE: Record<string, { icon: LucideIcon; fg: string; bg: string; chat: string }> = {
  registration: { icon: FileText, fg: "#128c7e", bg: "#e2f1ef", chat: "Registration" },
  branding: { icon: PenTool, fg: "#25d366", bg: "#e4faec", chat: "Branding" },
  design: { icon: Printer, fg: "#34b7f1", bg: "#e6f6fd", chat: "Design" },
  "social-media": { icon: Instagram, fg: "#f59e0b", bg: "#fef3e1", chat: "Social Media" },
  website: { icon: Dribbble, fg: "#e11d48", bg: "#fbe4e9", chat: "Website" },
  "ai-tools": { icon: Bot, fg: "#7c3aed", bg: "#efe7fd", chat: "AI Tools" },
  "microsoft-certifications": { icon: GraduationCap, fg: "#0ea5e9", bg: "#e2f4fc", chat: "Microsoft" },
};

const HERO_STEPS = ["Tell Us What You Need", "Share Your Documents", "We Get It Done"];

/** Phone-style chat preview. Every button opens the real chatbot. */
function PhoneMock() {
  const site = useSite();
  const [text, setText] = useState("");
  const cats = CATEGORIES.filter((c) => c.slug !== "microsoft-certifications");
  return (
    <div className="mx-auto w-full max-w-[440px] rounded-[34px] bg-[#0b1418] p-[10px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55)]">
      <div className="overflow-hidden rounded-[26px] bg-chat">
        <div className="flex items-center gap-3 bg-navy px-4 py-3.5">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-brand text-[17px] font-bold text-ink">
            {site.siteName.charAt(0).toUpperCase()}
          </span>
          <span className="leading-tight">
            <span className="block text-[16px] font-semibold text-white">{site.siteName} Help</span>
            <span className="block text-[12px] text-white/80">online</span>
          </span>
        </div>
        <div className="space-y-2.5 px-4 pb-4 pt-4">
          <p className="max-w-[330px] rounded-lg bg-white px-3.5 py-2.5 text-[15px] leading-[1.45] text-ink shadow-[0_1px_1px_rgba(17,27,33,0.12)]">
            Namaste! 🙏 Welcome to {site.siteName}. What do you need help with? Tap below 👇
          </p>
          <div className="grid grid-cols-2 gap-2">
            {cats.map((c) => {
              const st = CAT_STYLE[c.slug];
              return (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => openChat(`Show ${c.title} services`)}
                  className="flex items-center gap-2 rounded-lg bg-white px-3 py-2.5 text-left text-[13.5px] font-semibold text-royal shadow-[0_1px_1px_rgba(17,27,33,0.12)] transition hover:bg-mint"
                >
                  <st.icon className="h-4 w-4 shrink-0" /> {st.chat}
                </button>
              );
            })}
          </div>
          <p className="ml-auto w-fit max-w-[272px] rounded-lg bg-bubble px-4 py-2.5 text-[15px] text-ink shadow-[0_1px_1px_rgba(17,27,33,0.12)] sm:min-w-[272px]">
            GST Registration
          </p>
          <p className="max-w-[330px] rounded-lg bg-white px-3.5 py-2.5 text-[15px] leading-[1.45] text-ink shadow-[0_1px_1px_rgba(17,27,33,0.12)]">
            Sure! Please share your name and mobile number. Our expert will call you within 30 minutes. 📞
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            openChat(text);
            setText("");
          }}
          className="flex items-center gap-2 bg-surface px-3 py-2.5"
        >
          <input
            aria-label="Type a message"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => !text && openChat()}
            placeholder="Type a message"
            className="h-10 flex-1 rounded-full bg-white px-4 text-[14.5px] text-ink outline-none placeholder:text-[#54656f]"
          />
          <button type="submit" aria-label="Send" className="grid h-10 w-10 place-items-center rounded-full bg-royal text-white">
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

function Hero() {
  const site = useSite();
  const s = SLIDES[0];
  return (
    <section className="bg-navy">
      <div className="container-x grid items-center gap-12 py-14 lg:grid-cols-[1fr_440px] lg:gap-10 lg:py-[60px]">
        <div className="max-lg:text-center">
          <span className="rise inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-[14px] font-semibold text-white">
            <span className="h-2 w-2 rounded-full bg-brand" /> Experts online now
          </span>
          <h1 className="rise mt-7 text-[40px] font-extrabold leading-[1.08] !text-white sm:text-[54px] lg:text-[64px]" style={{ animationDelay: "80ms" }}>
            Start Your Business
            <br className="hidden sm:block" /> the Right Way
          </h1>
          <p className="rise mt-6 max-w-[580px] text-[17px] leading-[1.65] text-white/80 max-lg:mx-auto sm:text-[19px]" style={{ animationDelay: "160ms" }}>
            {s.text}
          </p>
          <div className="rise mt-10 flex flex-wrap gap-3 max-lg:justify-center" style={{ animationDelay: "240ms" }}>
            <a
              href={waLink(site.whatsapp, site.bot.whatsappMessage)}
              target="_blank"
              rel="noreferrer"
              className="btn-brand h-[60px] px-[30px] text-[17px]"
            >
              <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
            </a>
            <a href={telHref(site.phone)} className="btn-ghost h-[60px] px-6 text-[17px]">
              <Phone className="h-5 w-5" /> Call {site.phone}
            </a>
          </div>
          <div className="rise mt-10 grid max-w-[576px] grid-cols-3 gap-4 max-lg:mx-auto" style={{ animationDelay: "320ms" }}>
            {HERO_STEPS.map((t, i) => (
              <div key={t} className="rounded-xl bg-white/12 px-3 py-4 text-left sm:px-4 sm:py-5">
                <p className="text-[24px] font-extrabold leading-none text-ink">{i + 1}</p>
                <p className="mt-3 text-[13px] font-semibold leading-snug text-white sm:text-[15px]">{t}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rise hidden md:block" style={{ animationDelay: "200ms" }}>
          <PhoneMock />
        </div>
      </div>
    </section>
  );
}

const STATS: { icon: LucideIcon; big: string; small: string; fg: string; bg: string; fill?: boolean }[] = [
  { icon: Star, big: "4.8", small: "Google Rating", fg: "#128c7e", bg: "#caeadf", fill: true },
  { icon: Users, big: "1,000+", small: "Happy Clients", fg: "#128c7e", bg: "#cdf3dc" },
  { icon: MapPin, big: "Pan-India", small: "Service", fg: "#128c7e", bg: "#cfefee" },
  { icon: ShieldCheck, big: "100%", small: "Online Process", fg: "#128c7e", bg: "#e9eccf" },
];

function Stats() {
  return (
    <section className="bg-mint">
      <div className="container-x grid grid-cols-2 gap-y-6 py-8 md:grid-cols-4 md:py-[40px]">
        {STATS.map((t) => (
          <div key={t.small} className="flex items-center gap-3 md:justify-center">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl" style={{ background: t.bg, color: t.fg }}>
              <t.icon className={`h-5 w-5 ${t.fill ? "fill-current" : ""}`} />
            </span>
            <span>
              <span className="block text-[22px] font-extrabold leading-tight text-ink">{t.big}</span>
              <span className="block text-[14.5px] text-ink/80">{t.small}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, text, light = false }: { eyebrow?: string; title: string; text?: string; light?: boolean }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className={`text-[32px] font-extrabold leading-tight sm:text-[40px] ${light ? "!text-white" : ""}`}>{title}</h2>
      {text && <p className={`mt-3 text-[17px] ${light ? "text-white/80" : ""}`}>{text}</p>}
    </div>
  );
}

function Categories() {
  const site = useSite();
  return (
    <section className="bg-surface pb-[64px] pt-[72px] sm:pb-[72px] sm:pt-[85px]">
      <div className="container-x">
        <SectionHead eyebrow="Our Services" title="What Do You Need Help With?" text="Pick a category. Each one has a clear list of services." />
        <div className="grid gap-6 md:grid-cols-2">
          {CATEGORIES.map((c) => {
            const st = CAT_STYLE[c.slug];
            return (
              <div key={c.slug} className="card-wa flex flex-col overflow-hidden sm:flex-row">
                <Link to={`/services/${c.slug}`} className="relative h-48 shrink-0 sm:h-auto sm:w-[192px]">
                  <img src={c.image} alt={c.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl" style={{ background: st.bg, color: st.fg }}>
                      <st.icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-[19px] font-medium leading-tight sm:text-[21px]">
                      <Link to={`/services/${c.slug}`} className="hover:text-royal">{c.title}</Link>
                    </h3>
                  </div>
                  <p className="mt-3 text-[15px] leading-[1.55]">{c.short}</p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-5">
                    <Link to={`/services/${c.slug}`} className="inline-flex h-[42px] items-center rounded-[10px] bg-brand px-[18px] text-[15px] font-semibold text-ink hover:bg-brand-dark">
                      View Services
                    </Link>
                    <a
                      href={waLink(site.whatsapp, `Hi, I need help with ${c.title}`)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-[42px] items-center gap-2 rounded-[10px] bg-brand px-[18px] text-[15px] font-semibold text-white hover:bg-brand-dark"
                    >
                      <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
          <a
            href={telHref(site.phone)}
            className="flex min-h-[212px] items-center gap-6 rounded-2xl bg-royal px-8 py-8 text-white transition hover:brightness-105"
          >
            <Headphones className="h-12 w-12 shrink-0" strokeWidth={1.8} />
            <span>
              <span className="block text-[21px] font-bold leading-tight">Not sure? Just call us.</span>
              <span className="mt-2 block text-[16px] text-white/90">Free advice from our expert • {site.phone}</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

const POP_STYLE: { icon: LucideIcon; color: string }[] = [
  { icon: FileText, color: "#128c7e" },
  { icon: FileText, color: "#25d366" },
  { icon: FileText, color: "#34b7f1" },
  { icon: FileText, color: "#f59e0b" },
  { icon: PenTool, color: "#e11d48" },
  { icon: Dribbble, color: "#7c3aed" },
  { icon: Instagram, color: "#0ea5e9" },
  { icon: Bot, color: "#128c7e" },
];

function Popular() {
  return (
    <section className="bg-mint py-[72px] sm:py-[85px]">
      <div className="container-x">
        <SectionHead eyebrow="Most Asked" title="Most Popular Services" text="These are what most of our customers start with." />
        <div className="mx-auto flex max-w-[1100px] flex-wrap justify-center gap-x-[18px] gap-y-4">
          {POPULAR.map((p, i) => {
            const st = POP_STYLE[i % POP_STYLE.length];
            return (
              <Link
                key={p.name}
                to={serviceUrl(p.cat, p.name)}
                className="flex items-center gap-3 rounded-full border border-line bg-white py-3 pl-3 pr-6 shadow-[0_8px_22px_-14px_rgba(17,27,33,0.25)] transition hover:-translate-y-0.5"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-white" style={{ background: st.color }}>
                  <st.icon className="h-5 w-5" />
                </span>
                <span className="leading-tight">
                  <span className="block text-[16px] font-semibold text-ink">{p.name}</span>
                  <span className="mt-1 block text-[13px]">{p.days}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { icon: ClipboardList, title: "Tell Us What You Need", text: "Fill the form or call us. It takes 1 minute." },
  { icon: Upload, title: "Share Your Documents", text: "Send them on WhatsApp or email. No office visit." },
  { icon: BadgeCheck, title: "We Get It Done", text: "You get updates at every step until it's complete." },
];

function Process() {
  return (
    <section className="bg-navy py-[72px] sm:pb-[80px] sm:pt-[82px]">
      <div className="container-x">
        <SectionHead eyebrow="How It Works" title="Simple 3-Step Process" text="No office visits. No confusing forms." light />
        <div className="grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <div key={s.title} className="relative overflow-hidden rounded-2xl border border-white/12 bg-white/10 px-8 pb-8 pt-8 md:h-[238px]">
              <span className="pointer-events-none absolute -right-2 -top-6 select-none text-[150px] font-extrabold leading-none text-black/10">
                {i + 1}
              </span>
              <span className="relative grid h-14 w-14 place-items-center rounded-xl bg-brand text-ink">
                <s.icon className="h-6 w-6" />
              </span>
              <h3 className="relative mt-7 text-[24px] font-bold !text-white">{s.title}</h3>
              <p className="relative mt-2 text-[16.5px] leading-relaxed text-white/80">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const WHY: { icon: LucideIcon; title: string; text: string; fg: string; bg: string }[] = [
  { icon: Sparkles, title: "One place for everything", text: "Registration, branding, website and marketing — no running around.", fg: "#128c7e", bg: "#e2f1ef" },
  { icon: IndianRupee, title: "Clear pricing", text: "You know the full cost before we start. No hidden charges.", fg: "#25d366", bg: "#e4faec" },
  { icon: Smartphone, title: "Fully online", text: "Do everything from your phone, from anywhere in India.", fg: "#34b7f1", bg: "#e6f6fd" },
  { icon: Headphones, title: "Real experts", text: "CA, CS and design experts guide you at every step.", fg: "#f59e0b", bg: "#fef3e1" },
];

const REVIEWS = [
  { name: "Ravi K.", city: "Hyderabad", text: "My GST and company registration were done in a week. Very smooth, and they explained everything simply." },
  { name: "Priya S.", city: "Bengaluru", text: "They designed our logo and website together. Looks very professional and customers notice it." },
  { name: "Arjun M.", city: "Pune", text: "Our Instagram enquiries doubled in 2 months. The team posts on time every week." },
];

function Stars() {
  return (
    <span className="flex text-[#f59e0b]">
      {[0, 1, 2, 3, 4].map((k) => (
        <Star key={k} className="h-4 w-4 fill-current" strokeWidth={1.5} />
      ))}
    </span>
  );
}

function Trust() {
  const site = useSite();
  return (
    <section className="bg-mint pb-[72px] pt-[72px] sm:pb-[75px] sm:pt-[85px]">
      <div className="container-x">
        <SectionHead eyebrow={`Why ${site.siteName}`} title="Why Businesses Trust Us" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w) => (
            <div key={w.title} className="card-wa p-7">
              <span className="grid h-14 w-14 place-items-center rounded-xl" style={{ background: w.bg, color: w.fg }}>
                <w.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-7 text-[20px] font-semibold leading-snug">{w.title}</h3>
              <p className="mt-2 text-[15px] leading-[1.55]">{w.text}</p>
            </div>
          ))}
        </div>

        <div className="mb-6 mt-[64px] flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-[26px] font-semibold">What Our Clients Say</h3>
          <span className="flex items-center gap-2 text-[15px] font-semibold text-ink">
            <Stars /> 4.8 on Google
          </span>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure key={r.name} className="card-wa p-6">
              <Stars />
              <blockquote className="mt-3 text-[16.5px] leading-[1.6] text-ink">"{r.text}"</blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand text-[16px] font-bold text-ink">{r.name[0]}</span>
                <span className="leading-tight">
                  <span className="block text-[16px] font-semibold text-ink">{r.name}</span>
                  <span className="mt-1 block text-[13px]">{r.city}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  { q: "Do I need to visit your office?", a: "No. Everything is done online. You can share documents on WhatsApp or email." },
  { q: "How long does GST registration take?", a: "Usually 3 to 7 working days, once we have all your documents." },
  { q: "Can you do registration and the website together?", a: "Yes. Many clients start with registration and logo, then add a website. We offer combo prices." },
  { q: "How do I pay?", a: "You can pay by UPI, debit/credit card or bank transfer. You get a proper GST invoice." },
  { q: "I'm not sure which registration I need. Can you help?", a: "Yes — that's what the free consultation is for. Our expert will suggest the right option for you." },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-surface pb-[64px] pt-[72px] sm:pb-[72px] sm:pt-[80px]">
      <div className="container-x"><div className="mx-auto max-w-[720px]">
        <SectionHead eyebrow="FAQ" title="Common Questions" />
        <div className="space-y-3.5">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="card-wa">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-[17px] font-semibold text-ink"
                  aria-expanded={isOpen}
                >
                  {f.q}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mint text-royal">
                    {isOpen ? <Minus className="h-4 w-4" strokeWidth={3} /> : <Plus className="h-4 w-4" strokeWidth={3} />}
                  </span>
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="-mt-1 px-6 pb-5 text-[16.5px]">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div></div>
    </section>
  );
}

/** Full-width teal call-to-action (also used at the bottom of inner pages). */
export function CtaBand() {
  const site = useSite();
  return (
    <section className="bg-royal py-[72px] text-center sm:py-[80px]">
      <div className="container-x">
        <h2 className="text-[32px] font-extrabold !text-white sm:text-[46px]">Ready to Grow Your Business?</h2>
        <p className="mx-auto mt-3 max-w-lg text-[18px] text-white/90">Talk to our expert today. The first consultation is free.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="inline-flex h-[55px] items-center gap-2 rounded-xl bg-white px-7 text-[16px] font-semibold text-royal transition hover:-translate-y-0.5">
            Get Free Consultation <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={waLink(site.whatsapp, site.bot.whatsappMessage)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-[55px] items-center gap-2 rounded-xl bg-brand px-7 text-[16px] font-semibold text-white transition hover:-translate-y-0.5"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Index() {
  return (
    <>
      <Hero />
      <Stats />
      <Categories />
      <Popular />
      <Process />
      <Trust />
      <Faq />
      <CtaBand />
    </>
  );
}
