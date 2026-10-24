import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { CATEGORIES, serviceUrl } from "../lib/site";
import { telHref, useSite } from "../queries/site";
import { Logo } from "./header";

export function Footer() {
  const site = useSite();
  const reg = CATEGORIES[0];
  const brandDesign = [CATEGORIES[1], CATEGORIES[2]];
  const digital = [CATEGORIES[3], CATEGORIES[4], CATEGORIES[5], CATEGORIES[6]];
  return (
    <footer className="bg-navy text-white/80">
      <div className="container-x grid gap-10 pb-[52px] pt-16 md:grid-cols-2 lg:grid-cols-[1.27fr_1fr_1fr_0.86fr]">
        <div>
          <Logo light />
          <p className="mt-6 max-w-[290px] text-[15px] leading-[1.6] text-white/85">
            {site.tagline}
          </p>
          <div className="mt-5 space-y-2 text-[15px]">
            <a href={telHref(site.phone)} className="flex items-center gap-2 hover:text-white"><Phone className="h-4 w-4 text-white/80" /> {site.phone}</a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-white"><Mail className="h-4 w-4 text-white/80" /> {site.email}</a>
            {site.addresses.length ? (
              site.addresses.map((a, i) => (
                <p key={i} className="flex items-start gap-2"><MapPin className="mt-1 h-4 w-4 shrink-0 text-white/80" /> <span className="whitespace-pre-line">{a.line}</span></p>
              ))
            ) : (
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-white/80" /> {site.city}</p>
            )}
          </div>
          <div className="mt-5 flex gap-2">
            {(
              [
                ["facebook", Facebook],
                ["instagram", Instagram],
                ["linkedin", Linkedin],
                ["youtube", Youtube],
              ] as const
            )
              .filter(([k]) => site.socials[k])
              .map(([k, Icon]) => (
                <a key={k} href={site.socials[k]} target="_blank" rel="noreferrer" aria-label={k} className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 hover:bg-brand hover:text-ink">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
          </div>
        </div>
        <div>
          <h4 className="mb-5 text-[17px] font-semibold !text-white">Registration</h4>
          <ul className="space-y-[11px] text-[15.5px] leading-[1.4]">
            {reg.menuItems.slice(0, 6).map((m) => (
              <li key={m}><Link to={serviceUrl("registration", m)} className="hover:text-white">{m}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-5 text-[17px] font-semibold !text-white">Branding & Design</h4>
          <ul className="space-y-[11px] text-[15.5px] leading-[1.4]">
            {brandDesign.flatMap((c) => c.menuItems.slice(0, 3).map((m) => (
              <li key={c.slug + m}><Link to={serviceUrl(c.slug, m)} className="hover:text-white">{m}</Link></li>
            )))}
          </ul>
        </div>
        <div>
          <h4 className="mb-5 text-[17px] font-semibold !text-white">Digital</h4>
          <ul className="space-y-[11px] text-[15.5px] leading-[1.4]">
            {digital.map((c) => (
              <li key={c.slug}><Link to={`/services/${c.slug}`} className="hover:text-white">{c.title}</Link></li>
            ))}
            <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-[14px] sm:flex-row">
          <p>© {new Date().getFullYear()} {site.siteName}. All rights reserved.</p>
          <p>Serving businesses across India</p>
        </div>
      </div>
    </footer>
  );
}

