import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Menu, X, Languages, SunMedium, Moon,
  ArrowRight, CheckCircle2, MapPin, Mail, Phone
} from "lucide-react";

/** ---------- БЫСТРАЯ НАСТРОЙКА ---------- */
const LOGO_SRC = "/logos/rottmueller.png"; // <- замени путь/файл при необходимости

// Весь контент правишь здесь (DE/EN). Картинки клади в public/... и меняй пути.
const CONTENT = {
  de: {
    brand: "ROTTMÜLLER",
    tagline: "Nachhaltiges Bauen · Präzision in Holz",
    address: "Bad Aibling · München, Deutschland",
    email: "info@rottmueller-holzbau.de",
    phone: "+49 (0)8061 123456",
    links: {
      datenschutz: "/datenschutz.html",
      impressum: "/impressum.html",
    },
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
      image: "/en/hero.jpg", // опционально: фон/картинка
      ctas: ["Projekt anfragen", "Portfolio ansehen"],
      sub:
        "Industrielle Vorfertigung, digitale Prozesse und meisterhaftes Handwerk. Häuser, Hallen, Dächer & Solar — alles aus einer Hand.",
    },
    sections: [
      {
        key: "about",
        title: "Über Rottmüller Holzbau",
        lede:
          "Wir sind ein Holzbauunternehmen mit Fokus auf Qualität, Präzision und Nachhaltigkeit. Unser Anspruch: langlebige, energieeffiziente Lösungen von Beratung bis Montage.",
        bullets: [
          "Beratung, Planung, Statik, Vorfertigung, Montage",
          "DIN/Eurocode · CE · EN 1090 · PEFC",
          "Maschinenpark: Hundegger · Weinmann",
        ],
        image: "/public/en/about.jpg",
      },
      {
        key: "carpentry",
        title: "Holzbau & Zimmerei",
        lede:
          "Moderne Holzrahmenbau-Lösungen, Aufstockungen, Sanierungen – effizient, ökologisch, wirtschaftlich.",
        bullets: [
          "Holzrahmenbau, Wände/Decken/Dächer",
          "Module & Elemente, CNC-gesteuerte Fertigung",
          "BIM (Dietrich’s) · Ausführungspläne",
        ],
        image: "/public/en/carpentry.jpg",
      },
      {
        key: "roofing",
        title: "Bedachungen & Solarenergie",
        lede:
          "Dächer, Dachfenster, PV-Vorbereitung & Montage. Dicht, sicher, vorbereitet auf Solar.",
        bullets: [
          "Dachstühle · Ziegel · Abdichtung",
          "PV-Integration & Kabelwege",
          "Wartung & Inspektion",
        ],
        image: "/public/en/roof-solar.jpg",
      },
      {
        key: "renovation",
        title: "Sanierung & Ökologie",
        lede:
          "Energetische Sanierung, Dämmung, Fassaden – spürbar weniger Energieverbrauch und mehr Komfort.",
        bullets: [
          "Fassaden & Dämmung (Holzfaser, Mineralwolle, etc.)",
          "Wärmebrücken-optimierte Details",
          "Förderfähige Maßnahmen",
        ],
        image: "/public/en/renovation.jpg",
      },
      {
        key: "halls",
        title: "Hallen- & Gewerbebau",
        lede:
          "Tragwerke aus Holz/Holz-Hybrid für Gewerbe, Landwirtschaft und Industrie.",
        bullets: [
          "Binder, Rahmen, Stützen-Riegel",
          "Brandschutz- & Stabilitätsnachweise",
          "Montage mit eigenem Team",
        ],
        image: "/public/en/hall.jpg",
      },
      {
        key: "abbund",
        title: "Lohnabbund",
        lede:
          "Präziser CNC-Abbund für Kollegenbetriebe – zuverlässig, schnell, dokumentiert.",
        bullets: [
          "Hundegger/Weinmann",
          "Datenübernahme (BVX, BTL, usw.)",
          "Beschriftung, Etiketten, Stücklisten",
        ],
        image: "/public/en/abbund.jpg",
      },
    ],
    contact: {
      title: "Kontakt",
      lead:
        "Schreiben Sie uns für Angebote, Beratung und Kooperationen. Wir melden uns kurzfristig.",
    },
    ui: {
      dark: "Dark",
      light: "Light",
      de: "DE",
      en: "EN",
      mail: "E-Mail senden",
      call: "Anrufen",
      send: "Senden",
      name: "Name",
      email: "E-Mail",
      message: "Nachricht",
      contactCta: "Jetzt anfragen",
      privacy: "Datenschutz",
      imprint: "Impressum",
    },
  },

  en: {
    brand: "ROTTMÜLLER",
    tagline: "Sustainable Construction · Precision in Timber",
    address: "Bad Aibling · Munich, Germany",
    email: "info@rottmueller-holzbau.de",
    phone: "+49 (0)8061 123456",
    links: {
      datenschutz: "/privacy.html",
      impressum: "/imprint.html",
    },
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
      image: "/en/hero.jpg",
      ctas: ["Request a project", "View portfolio"],
      sub:
        "Industrial prefabrication, digital workflows and master craftsmanship. Houses, halls, roofing & solar – all in-house.",
    },
    sections: [
      {
        key: "about",
        title: "About Rottmüller Holzbau",
        lede:
          "We deliver quality, precision and sustainability. From consulting and design to prefabrication and assembly.",
        bullets: [
          "Consulting, design, statics, prefabrication, assembly",
          "DIN/Eurocode · CE · EN 1090 · PEFC",
          "Machinery: Hundegger · Weinmann",
        ],
        image: "/public/en/about.jpg",
      },
      {
        key: "carpentry",
        title: "Timber & Carpentry",
        lede:
          "Modern timber-frame solutions, vertical extensions, refurbishments – efficient, ecological, economical.",
        bullets: [
          "Timber-frame walls/floors/roofs",
          "Modules & elements, CNC manufacturing",
          "BIM (Dietrich’s) · shop drawings",
        ],
        image: "/public/en/carpentry.jpg",
      },
      {
        key: "roofing",
        title: "Roofing & Solar",
        lede:
          "Roofs, roof windows, PV preparation & installation. Tight, safe, solar-ready.",
        bullets: [
          "Trusses · tiles · waterproofing",
          "PV integration & cable routes",
          "Maintenance & inspection",
        ],
        image: "/public/en/roof-solar.jpg",
      },
      {
        key: "renovation",
        title: "Renovation & Ecology",
        lede:
          "Energy retrofits, insulation and facades — lower energy use and higher comfort.",
        bullets: [
          "Facades & insulation (wood fiber, mineral wool, etc.)",
          "Thermal-bridge-optimized details",
          "Eligible subsidized measures",
        ],
        image: "/public/en/renovation.jpg",
      },
      {
        key: "halls",
        title: "Halls & Industrial",
        lede:
          "Timber/Hybrid structures for industrial, agricultural and commercial buildings.",
        bullets: [
          "Trusses, frames, post-and-beam",
          "Fire & stability proofs",
          "Assembly by in-house team",
        ],
        image: "/public/en/hall.jpg",
      },
      {
        key: "abbund",
        title: "Contract Cutting",
        lede:
          "Accurate CNC cutting for fellow carpentry shops — fast, reliable, fully documented.",
        bullets: [
          "Hundegger/Weinmann",
          "Data import (BVX, BTL, etc.)",
          "Labels, marking, BOMs",
        ],
        image: "/public/en/abbund.jpg",
      },
    ],
    contact: {
      title: "Contact",
      lead:
        "Reach out for quotes, consulting and partnerships. We’ll get back shortly.",
    },
    ui: {
      dark: "Dark",
      light: "Light",
      de: "DE",
      en: "EN",
      mail: "Send email",
      call: "Call",
      send: "Send",
      name: "Name",
      email: "Email",
      message: "Message",
      contactCta: "Request now",
      privacy: "Privacy",
      imprint: "Imprint",
    },
  },
};
/** ---------- КОНЕЦ БЫСТРОЙ НАСТРОЙКИ ---------- */

// Чистый slugify для якорей (без багов replace(/…/ g, …))
const slugify = (s) =>
  s?.toString()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border border-black/10 dark:border-white/15 bg-white dark:bg-black ${className}`}>
    {children}
  </div>
);

const Pill = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/10 text-sm">
    <CheckCircle2 className="h-4 w-4" /> {children}
  </span>
);

const Hero = ({ t }) => (
  <section id={slugify(t.nav[0])} className="relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none opacity-20" style={{
      backgroundImage: `url(${t.hero.image || ""})`,
      backgroundSize: "cover", backgroundPosition: "center"
    }}/>
    <div className="w-full max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
      <motion.div initial={{opacity:0, y:16}} animate={{opacity:1, y:0}} transition={{duration:.5}}>
        <Card className="p-8 md:p-12">
          <div className="flex items-center gap-3">
            <img src={LOGO_SRC} alt="Rottmüller" className="h-9 w-auto object-contain" />
            <span className="text-2xl font-extrabold tracking-tight">{t.brand}</span>
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight leading-[0.95]">
            {t.tagline}
          </h1>
          <p className="mt-4 text-black/70 dark:text-white/70 max-w-2xl">{t.hero.sub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 bg-black text-white dark:bg-white dark:text-black font-semibold hover:-translate-y-0.5 transition">
              {t.hero.ctas[0]} <ArrowRight className="h-4 w-4"/>
            </a>
            <a href="#portfolio" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 border border-black/20 dark:border-white/20 hover:-translate-y-0.5 transition">
              {t.hero.ctas[1]}
            </a>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pill>Made in Germany</Pill>
            <Pill>30-Year Warranty</Pill>
            <Pill>Hundegger · Weinmann</Pill>
            <Pill>BIM / CNC</Pill>
          </div>
        </Card>
      </motion.div>
    </div>
  </section>
);

const Section = ({ id, title, lede, bullets, image, flip=false }) => (
  <section id={id} className="w-full max-w-7xl mx-auto px-6 md:px-10 py-14 md:py-20">
    <div className={`grid gap-8 items-center ${flip ? "md:grid-cols-[1fr,1.1fr]" : "md:grid-cols-[1.1fr,1fr]"}`}>
      {!flip && (
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-4 text-lg text-black/80 dark:text-white/80">{lede}</p>
          <ul className="mt-6 space-y-2">
            {bullets.map((b)=>(
              <li key={b} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5"/>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <Card className="overflow-hidden">
        <img src={image} alt={title} className="w-full h-[320px] md:h-[380px] object-cover"/>
      </Card>
      {flip && (
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-4 text-lg text-black/80 dark:text-white/80">{lede}</p>
          <ul className="mt-6 space-y-2">
            {bullets.map((b)=>(
              <li key={b} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5"/>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </section>
);

export default function App(){
  const [lang, setLang] = useState("de");
  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useMemo(()=>CONTENT[lang], [lang]);

  useEffect(()=>{ document.documentElement.classList.toggle("dark", theme==="dark") }, [theme]);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white font-grotesk">
      {/* Top bar */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-black/50 border-b border-black/10 dark:border-white/10">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <img src={LOGO_SRC} className="h-8 w-auto" alt="Rottmüller"/>
            <span className="font-semibold">{t.brand}</span>
          </a>
          <nav className="hidden md:flex items-center gap-4">
            {t.nav.slice(1).map((label)=>(
              <a key={label} href={`#${slugify(label)}`} className="px-3 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10">{label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={()=>setLang(lang==="de"?"en":"de")} className="px-3 py-1.5 rounded-lg border border-black/15 dark:border-white/20">
              {lang==="de" ? t.ui.en : t.ui.de}
            </button>
            <button onClick={()=>setTheme(theme==="dark"?"light":"dark")} className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-black/15 dark:border-white/20">
              {theme==="dark"? <SunMedium className="h-4 w-4"/> : <Moon className="h-4 w-4"/>}
              <span className="text-sm">{theme==="dark"? t.ui.light : t.ui.dark}</span>
            </button>
            <button onClick={()=>setMenuOpen(true)} className="md:hidden p-2 rounded-lg border border-black/15 dark:border-white/20"><Menu className="h-5 w-5"/></button>
          </div>
        </div>
      </header>

      <main>
        <Hero t={t}/>
        {/* Секции как на старом сайте */}
        {t.sections.map((s, idx)=>(
          <Section
            key={s.key}
            id={slugify(t.nav[idx+1])}
            title={s.title}
            lede={s.lede}
            bullets={s.bullets}
            image={s.image}
            flip={idx % 2 === 1}
          />
        ))}

        {/* Контакты */}
        <section id="contact" className="w-full max-w-7xl mx-auto px-6 md:px-10 py-14 md:py-20">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{t.contact.title}</h2>
          <p className="mt-3 text-black/80 dark:text-white/80 max-w-2xl">{t.contact.lead}</p>
          <div className="mt-8 grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2"><Mail className="h-4 w-4"/><a className="underline" href={`mailto:${t.email}`}>{t.email}</a></div>
                <div className="flex items-center gap-2"><Phone className="h-4 w-4"/><a className="underline" href={`tel:${t.phone.replace(/[^+\d]/g,'')}`}>{t.phone}</a></div>
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4"/><span>{t.address}</span></div>
              </div>
              <div className="mt-6 flex gap-3">
                <a href={`mailto:${t.email}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black">
                  {t.ui.mail}
                </a>
                <a href={`tel:${t.phone.replace(/[^+\d]/g,'')}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-black/20 dark:border-white/20">
                  {t.ui.call}
                </a>
              </div>
            </Card>
            <form className="grid gap-3" onSubmit={(e)=>e.preventDefault()}>
              <input className="rounded-xl px-3 py-2 border border-black/15 dark:border-white/20 bg-black/5 dark:bg-white/10" placeholder={t.ui.name}/>
              <input className="rounded-xl px-3 py-2 border border-black/15 dark:border-white/20 bg-black/5 dark:bg_white/10" placeholder={t.ui.email}/>
              <textarea rows={5} className="rounded-xl px-3 py-2 border border-black/15 dark:border_white/20 bg-black/5 dark:bg_white/10" placeholder={t.ui.message}/>
              <button className="rounded-xl px-4 py-2 bg-black text-white dark:bg-white dark:text-black font-semibold">{t.ui.send}</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/10 dark:border-white/10">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-start justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={LOGO_SRC} className="h-7 w-auto" alt="Rottmüller"/>
            <div>
              <p className="font-semibold">{t.brand}</p>
              <p className="text-black/60 dark:text-white/60">{t.address}</p>
            </div>
          </div>
          <div className="text-sm">
            <a className="underline mr-3" href={t.links.datenschutz}>{t.ui.privacy}</a>
            <a className="underline" href={t.links.impressum}>{t.ui.imprint}</a>
          </div>
          <div className="text-sm">
            <span className="font-semibold">E:</span> <a className="underline" href={`mailto:${t.email}`}>{t.email}</a>
          </div>
        </div>
      </footer>

      {/* Мобильное меню */}
      {menuOpen && (
        <div role="dialog" aria-modal className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/70" onClick={()=>setMenuOpen(false)}/>
          <div className="absolute inset-y-0 left-0 w-[88%] max-w-sm bg-white text-black dark:bg-black dark:text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={LOGO_SRC} className="h-8 w-auto" alt="Rottmüller"/>
                <span className="font-semibold">{t.brand}</span>
              </div>
              <button onClick={()=>setMenuOpen(false)} className="p-2 rounded-lg border border-black/15 dark:border-white/20"><X/></button>
            </div>
            <nav className="mt-6 grid gap-2">
              {t.nav.slice(1).map((label)=>(
                <a key={label} href={`#${slugify(label)}`} onClick={()=>setMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10">{label}</a>
              ))}
              <div className="mt-4 flex items-center gap-2">
                <Languages className="h-4 w-4"/>
                <button onClick={()=>setLang("de")} className={`px-3 py-1.5 rounded-lg border ${lang==="de"?"bg-black text-white dark:bg-white dark:text-black":"border-black/20 dark:border-white/20"}`}>DE</button>
                <button onClick={()=>setLang("en")} className={`px-3 py-1.5 rounded-lg border ${lang==="en"?"bg-black text-white dark:bg_white dark:text-black":"border-black/20 dark:border-white/20"}`}>EN</button>
                <button onClick={()=>setTheme(theme==="dark"?"light":"dark")} className="ml-auto px-3 py-1.5 rounded-lg border border-black/20 dark:border-white/20">
                  {theme==="dark"? <SunMedium className="h-4 w-4"/> : <Moon className="h-4 w-4"/>}
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
