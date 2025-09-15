// src/App.jsx
import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  Languages,
  Moon,
  SunMedium,
  CheckCircle2,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

/** slugify: стабильные id для якорей, корректно обрабатывает диакритику и DE-умляуты */
const slugify = (s) =>
  s
    ?.toString()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const copy = {
  de: {
    brand: "Rottmüller Holzbau",
    tagline: "Nachhaltiges Bauen. Präzision in Holz.",
    nav: [
      "Home",
      "Vision",
      "Leistungen",
      "Timeline",
      "Portfolio",
      "Tech",
      "Zertifikate",
      "Media Kit",
      "Karriere",
      "Karte",
      "Presse",
      "Kontakt",
    ],
    heroCtas: ["Projekt anfragen", "Portfolio ansehen"],
    visionTitle: "Vision",
    visionBody:
      "Wir entwerfen, fertigen und montieren hochwertige Holz- und Hybridkonstruktionen. Industrielle Präzision, digitale Prozesse und meisterhaftes Handwerk.",
    capabilitiesTitle: "Leistungen",
    capabilities: [
      "Holzrahmenbau & Module",
      "Dachstühle & Aufstockungen",
      "Hallen & Tragwerke",
      "Fassade & Dämmung",
      "BIM-Modellierung (Dietrich’s)",
      "Statik & Nachweise (RFEM, FRILO)",
    ],
    timelineTitle: "Timeline",
    portfolioTitle: "Portfolio",
    techTitle: "Tech",
    certificatesTitle: "Zertifikate",
    mediaKitTitle: "Media Kit",
    careersTitle: "Karriere",
    mapTitle: "Karte",
    pressTitle: "Presse",
    contactTitle: "Kontakt",
    contactLead:
      "Schreiben Sie uns für Angebote, Beratung und Kooperationen.",
    address: "Bad Aibling · München, Deutschland",
    privacy: "Datenschutz",
    imprint: "Impressum",
  },
  en: {
    brand: "Rottmüller Holzbau",
    tagline: "Sustainable Construction. Precision in Timber.",
    nav: [
      "Home",
      "Vision",
      "Capabilities",
      "Timeline",
      "Portfolio",
      "Tech",
      "Certificates",
      "Media Kit",
      "Careers",
      "Map",
      "Press",
      "Contact",
    ],
    heroCtas: ["Request a Project", "View Portfolio"],
    visionTitle: "Vision",
    visionBody:
      "We design, prefabricate and assemble premium timber and hybrid structures. Industrial precision, digital workflows, master craftsmanship.",
    capabilitiesTitle: "Capabilities",
    capabilities: [
      "Timber frame & modules",
      "Roofs & vertical extensions",
      "Halls & structures",
      "Facade & insulation",
      "BIM modeling (Dietrich’s)",
      "Statics & proofs (RFEM, FRILO)",
    ],
    timelineTitle: "Timeline",
    portfolioTitle: "Portfolio",
    techTitle: "Tech",
    certificatesTitle: "Certificates",
    mediaKitTitle: "Media Kit",
    careersTitle: "Careers",
    mapTitle: "Map",
    pressTitle: "Press",
    contactTitle: "Contact",
    contactLead:
      "Get in touch for quotes, consulting and partnerships.",
    address: "Bad Aibling · Munich, Germany",
    privacy: "Privacy",
    imprint: "Imprint",
  },
  fr: {
    brand: "Rottmüller Holzbau",
    tagline: "Construction durable. Précision en bois.",
    nav: [
      "Accueil",
      "Vision",
      "Compétences",
      "Timeline",
      "Portfolio",
      "Tech",
      "Certificats",
      "Media Kit",
      "Carrières",
      "Carte",
      "Presse",
      "Contact",
    ],
    heroCtas: ["Demander un projet", "Voir le portfolio"],
    visionTitle: "Vision",
    visionBody:
      "Nous concevons, préfabriquons et montons des structures bois et hybrides haut de gamme. Précision industrielle, flux numériques, artisanat maître.",
    capabilitiesTitle: "Compétences",
    capabilities: [
      "Ossature bois & modules",
      "Toitures & surélévations",
      "Halles & structures",
      "Façade & isolation",
      "BIM (Dietrich’s)",
      "Statique (RFEM, FRILO)",
    ],
    timelineTitle: "Timeline",
    portfolioTitle: "Portfolio",
    techTitle: "Tech",
    certificatesTitle: "Certificats",
    mediaKitTitle: "Media Kit",
    careersTitle: "Carrières",
    mapTitle: "Carte",
    pressTitle: "Presse",
    contactTitle: "Contact",
    contactLead:
      "Contactez-nous pour devis, conseil et partenariats.",
    address: "Bad Aibling · Munich, Allemagne",
    privacy: "Confidentialité",
    imprint: "Mentions légales",
  },
};

const Section = ({ id, title, children }) => (
  <section id={id} className="w-full max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{title}</h2>
    </div>
    {children}
  </section>
);

const Pill = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/10 text-sm">
    <CheckCircle2 className="h-4 w-4" /> {children}
  </span>
);

/** Мобильное меню-оверлей */
const NavOverlay = ({ open, onClose, lang, setLang, theme, setTheme, t }) => (
  <div
    role="dialog"
    aria-modal="true"
    className={`fixed inset-0 z-50 transition ${open ? "visible" : "invisible"}`}
  >
    <div
      className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity ${
        open ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    />
    <div
      className={`absolute inset-0 bg-white text-black dark:bg-black dark:text-white transition-transform duration-300 ease-out ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-10 pt-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl border border-black dark:border-white grid place-content-center">
            <span className="font-bold text-xl" style={{ color: "#008000" }}>
              R
            </span>
          </div>
          <span className="font-bold text-xl tracking-tight">{t.brand}</span>
        </div>
        <button
          aria-label="Close menu"
          onClick={onClose}
          className="p-2 rounded-xl border border-transparent hover:border-black/20 dark:hover:border-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:focus-visible:outline-white"
        >
          <X />
        </button>
      </div>

      <div className="h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-10 pb-32 pt-8">
        {t.nav.map((label) => (
          <a
            key={label}
            href={`#${slugify(label)}`}
            onClick={onClose}
            className="block rounded-3xl border border-black/10 dark:border-white/15 bg-white dark:bg-black p-6 md:p-8 hover:-translate-y-1 transition"
          >
            <div className="text-4xl md:text-6xl xl:text-7xl font-semibold leading-[0.95]">
              {label}
            </div>
          </a>
        ))}
      </div>

      <div className="fixed bottom-0 inset-x-0 px-6 md:px-10 py-4 border-t border-black/10 dark:border-white/15 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="flex items-center gap-3">
            <Languages className="h-4 w-4" />
            <button
              onClick={() => setLang("de")}
              className={`px-3 py-1.5 rounded-lg border ${
                lang === "de"
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "border-black/20 dark:border-white/20"
              }`}
            >
              DE
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1.5 rounded-lg border ${
                lang === "en"
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "border-black/20 dark:border-white/20"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("fr")}
              className={`px-3 py-1.5 rounded-lg border ${
                lang === "fr"
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "border-black/20 dark:border-white/20"
              }`}
            >
              FR
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-black/20 dark:border-white/20"
            >
              {theme === "dark" ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="text-sm">{theme === "dark" ? "Light" : "Dark"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Hero = ({ t }) => (
  <div className="w-full max-w-7xl mx-auto px-6 md:px-10">
    <section id={slugify(t.nav[0])} className="py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl p-8 md:p-12 border border-black/10 dark:border-white/15 bg-black text-white dark:bg-white dark:text-black"
      >
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2">
            <div className="h-10 w-10 rounded-2xl border border-white/30 dark:border-black/30 grid place-content-center">
              <span className="font-bold text-xl" style={{ color: "#00a000" }}>
                R
              </span>
            </div>
            <span className="font-semibold">{t.brand}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[0.95]">
            {t.tagline}
          </h1>
          <p className="text-white/80 dark:text-black/70 max-w-2xl">
            {t.visionBody}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-3 bg-white text-black dark:bg-black dark:text-white font-semibold hover:-translate-y-0.5 transition"
          >
            {t.heroCtas[0]} <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-3 border border-white/30 dark:border-black/30 text-white dark:text-black hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition"
          >
            {t.heroCtas[1]}
          </a>
        </div>
      </motion.div>
    </section>
  </div>
);

export default function App() {
  const [lang, setLang] = useState("de");
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const t = useMemo(() => copy[lang], [lang]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white font-grotesk">
      {/* Top Nav */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-black/50 border-b border-black/10 dark:border-white/10">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl border border-black/15 dark:border-white/20 grid place-content-center">
              <span className="font-bold" style={{ color: "#008000" }}>
                R
              </span>
            </div>
            <span className="font-semibold">{t.brand}</span>
          </a>

          <nav className="hidden md:flex items-center gap-4">
            {t.nav.slice(1).map((label) => (
              <a
                key={label}
                href={`#${slugify(label)}`}
                className="px-3 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-black/15 dark:border-white/20"
            >
              {theme === "dark" ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="inline-flex md:hidden p-2 rounded-lg border border-black/15 dark:border-white/20"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <main>
        <Hero t={t} />

        <Section id={slugify(t.
