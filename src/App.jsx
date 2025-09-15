// src/App.jsx
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Menu, X, Languages, SunMedium, Moon,
  ArrowRight, CheckCircle2, MapPin, Mail, Phone
} from "lucide-react";

/* ===== Content config (меняй тексты и контакты тут) ===== */
const CONTENT = {
  de: {
    brand: "ROTTMÜLLER",
    tagline: "Nachhaltiges Bauen · Präzision in Holz",
    address: "Bad Aibling · München, Deutschland",
    email: "info@rottmueller-holzbau.de",
    phone: "+49 (0)8061 123456",
    links: { datenschutz: "/datenschutz.html", impressum: "/impressum.html" },
    nav: [
      "Home",
      "Über Rottmüller",
      "Holzbau & Zimmerei",
      "Bedachungen & Solarenergie",
      "Sanierung & Ökologie",
      "Hallen- & Gewerbebau",
      "Lohnabbund",
      "Kontakt",
    ],
    hero: {
      image: "/CONTENT.de.hero.image.jpg",
      sub: "Industrielle Vorfertigung, digitale Prozesse und meisterhaftes Handwerk.",
      cta1: "Projekt anfragen",
      cta2: "Portfolio ansehen",
    },
    aboutLede:
      "Qualität, Präzision und Nachhaltigkeit – von Beratung und Planung bis Montage.",
    bullets: [
      "BIM (Dietrich’s) · Statik (RFEM/FRILO)",
      "Hundegger · Weinmann · CE · EN 1090",
      "30 Jahre Gewährleistung auf tragende Holzkonstruktionen",
    ],
    ui: { switch: "EN", dark: "Dark", light: "Light", mail: "E-Mail senden", call: "Anrufen", send: "Senden", name: "Name", message: "Nachricht" },
  },
  en: {
    brand: "ROTTMÜLLER",
    tagline: "Sustainable Construction · Precision in Timber",
    address: "Bad Aibling · Munich, Germany",
    email: "info@rottmueller-holzbau.de",
    phone: "+49 (0)8061 123456",
    links: { datenschutz: "/privacy.html", impressum: "/imprint.html" },
    nav: [
      "Home",
      "About Rottmüller",
      "Timber & Carpentry",
      "Roofing & Solar",
      "Renovation & Ecology",
      "Halls & Industrial",
      "Contract Cutting",
      "Contact",
    ],
    hero: {
      image: "/CONTENT.en.hero.image.jpg",
      sub: "Industrial prefabrication, digital workflows and master craftsmanship.",
      cta1: "Request a project",
      cta2: "View portfolio",
    },
    aboutLede:
      "Quality, precision and sustainability — from consulting and design to assembly.",
    bullets: [
      "BIM (Dietrich’s) · Statics (RFEM/FRILO)",
      "Hundegger · Weinmann · CE · EN 1090",
      "30-year warranty on structural timber works",
    ],
    ui: { switch: "DE", dark: "Dark", light: "Light", mail: "Send email", call: "Call", send: "Send", name: "Name", message: "Message" },
  },
};

/* ===== Utils ===== */
const slugify = (s) =>
  s?.toString()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/* ===== Minimal components ===== */
const Card = ({ className = "", children }) => (
  <div className={`rounded-2xl border border-black/10 dark:border-white/15 bg-white dark:bg-black ${className}`}>
    {children}
  </div>
);

const Pill = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/10 text-sm">
    <CheckCircle2 className="h-4 w-4" /> {children}
  </span>
);

/* ===== Hero (минимал + «дорого») ===== */
const Hero = ({ t }) => (
  <section id={slugify(t.nav[0])} className="relative overflow-hidden">
    {/* фоновое фото */}
    <div className="absolute inset-0 -z-10">
      <picture>
        {/* если сделаешь AVIF, просто добавь файл рядом */}
        {/* <source srcSet={t.hero.image.replace('.jpg','.avif')} type="image/avif" /> */}
        <img src={t.hero.image} alt="" className="w-full h-full object-cover" fetchPriority="high" loading="eager" />
      </picture>
      {/* мягкая виньетка для читабельности текста */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 25% 20%, rgba(0,0,0,.25) 0%, rgba(0,0,0,.45) 55%, rgba(0,0,0,.6) 100%), linear-gradient(180deg, rgba(0,0,0,.25) 0%, rgba(0,0,0,.35) 100%)",
        }}
      />
    </div>

    <div className="w-full max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[0.95] text-white">
            {t.tagline}
          </h1>
          <p className="mt-4 text-white/80">{t.hero.sub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 bg-white text-black font-semibold hover:-translate-y-0.5 transition">
              {t.hero.cta1} <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#portfolio" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 border border-white/30 text-white hover:-translate-y-0.5 transition">
              {t.hero.cta2}
            </a>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pill>Made in Germany</Pill>
            <Pill>Hundegger · Weinmann</Pill>
            <Pill>BIM / CNC</Pill>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default function App() {
  const [lang, setLang] = useState("de");
  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useMemo(() => CONTENT[lang], [lang]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white font-grotesk">
      {/* Topbar */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-black/50 border-b border-black/10 dark:border-white/10">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <a href="#" className="font-semibold tracking-tight">{t.brand}</a>
          <nav className="hidden md:flex items-center gap-4">
            {t.nav.slice(1).map((label) => (
              <a key={label} href={`#${slugify(label)}`} className="px-3 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setLang(lang === "de" ? "en" : "de")} className="px-3 py-1.5 rounded-lg border border-black/15 dark:border-white/20">
              {t.ui.switch}
            </button>
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-black/15 dark:border-white/20">
              {theme === "dark" ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="text-sm">{theme === "dark" ? t.ui.light : t.ui.dark}</span>
            </button>
            <button onClick={() => setMenuOpen(true)} className="md:hidden p-2 rounded-lg border border-black/15 dark:border-white/20">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <main>
        <Hero t={t} />

        {/* Über / About */}
        <section id={slugify(t.nav[1])} className="w-full max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{t.nav[1]}</h2>
              <p className="mt-4 text-lg text-black/80 dark:text-white/80">{t.aboutLede}</p>
              <ul className="mt-6 space-y-2">
                {t.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Card className="p-6">
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                {[t.nav[2], t.nav[3], t.nav[4], t.nav[5]].map((item) => (
                  <div key={item} className="rounded-xl border border-black/10 dark:border-white/15 px-4 py-3">
                    {item}
                  </div>
                ))}
                {[t.nav[6]].map((item) => (
                  <div key={item} className="rounded-xl border border-black/10 dark:border-white/15 px-4 py-3">
                    {item}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* Контакты */}
        <section id="contact" className="w-full max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{t.nav[7]}</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2"><Mail className="h-4 w-4" /><a className="underline" href={`mailto:${t.email}`}>{t.email}</a></div>
                <div className="flex items-center gap-2"><Phone className="h-4 w-4" /><a className="underline" href={`tel:${t.phone.replace(/[^+\d]/g, "")}`}>{t.phone}</a></div>
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /><span>{t.address}</span></div>
              </div>
              <div className="mt-6 flex gap-3">
                <a href={`mailto:${t.email}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black">
                  {t.ui.mail}
                </a>
                <a href={`tel:${t.phone.replace(/[^+\d]/g, "")}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-black/20 dark:border-white/20">
                  {t.ui.call}
                </a>
              </div>
            </Card>
            <form className="grid gap-3" onSubmit={(e) => e.preventDefault()}>
              <input className="rounded-xl px-3 py-2 border border-black/15 dark:border-white/20 bg-black/5 dark:bg-white/10" placeholder={t.ui.name} />
              <input className="rounded-xl px-3 py-2 border border-black/15 dark:border-white/20 bg-black/5 dark:bg-white/10" placeholder="Email" />
              <textarea rows={5} className="rounded-xl px-3 py-2 border border-black/15 dark:border-white/20 bg-black/5 dark:bg-white/10" placeholder={t.ui.message} />
              <button className="rounded-xl px-4 py-2 bg-black text-white dark:bg-white dark:text-black font-semibold">{t.ui.send}</button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-black/10 dark:border-white/10">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-start justify-between gap-6">
          <div>
            <p className="font-semibold">{t.brand}</p>
            <p className="text-black/60 dark:text-white/60">{t.address}</p>
          </div>
          <div className="text-sm">
            <a className="underline mr-3" href={t.links.datenschutz}>{lang === "de" ? "Datenschutz" : "Privacy"}</a>
            <a className="underline" href={t.links.impressum}>{lang === "de" ? "Impressum" : "Imprint"}</a>
          </div>
          <div className="text-sm"><span className="font-semibold">E:</span>{" "}
            <a className="underline" href={`mailto:${t.email}`}>{t.email}</a>
          </div>
        </div>
      </footer>

      {/* Mobile menu */}
      {menuOpen && (
        <div role="dialog" aria-modal className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/70" onClick={() => setMenuOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[88%] max-w-sm bg-white text-black dark:bg-black dark:text-white p-6">
            <div className="flex items-center justify-between">
              <span className="font-semibold">{t.brand}</span>
              <button onClick={() => setMenuOpen(false)} className="p-2 rounded-lg border border-black/15 dark:border-white/20"><X /></button>
            </div>
            <nav className="mt-6 grid gap-2">
              {t.nav.slice(1).map((label) => (
                <a key={label} href={`#${slugify(label)}`} onClick={() => setMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10">
                  {label}
                </a>
              ))}
              <div className="mt-4 flex items-center gap-2">
                <Languages className="h-4 w-4" />
                <button onClick={() => setLang("de")} className={`px-3 py-1.5 rounded-lg border ${lang === "de" ? "bg-black text-white dark:bg-white dark:text-black" : "border-black/20 dark:border-white/20"}`}>DE</button>
                <button onClick={() => setLang("en")} className={`px-3 py-1.5 rounded-lg border ${lang === "en" ? "bg-black text-white dark:bg-white dark:text-black" : "border-black/20 dark:border-white/20"}`}>EN</button>
                <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="ml-auto px-3 py-1.5 rounded-lg border border-black/20 dark:border-white/20">
                  {theme === "dark" ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
