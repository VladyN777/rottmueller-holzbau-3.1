import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useLocation,
  Navigate,
} from "react-router-dom";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Menu, X, Languages, SunMedium, Moon,
  ArrowRight, CheckCircle2, MapPin, Mail, Phone
} from "lucide-react";

/* ================== КОНТЕНТ ================== */
const CONTENT = {
  de: {
    brand: "ROTTMÜLLER",
    tagline: "Nachhaltiges Bauen · Präzision in Holz",
    address: "Bad Aibling · München, Deutschland",
    email: "info@rottmueller-holzbau.de",
    phone: "+49 (0)8061 123456",
    links: { datenschutz: "/datenschutz.html", impressum: "/impressum.html" },
    heroImage: "/CONTENT.de.hero.image.jpg",
    nav: [
      { to: "/", label: "Home" },
      { to: "/ueber", label: "Über Rottmüller" },
      { to: "/holzbau", label: "Holzbau & Zimmerei" },
      { to: "/bedachungen-solar", label: "Bedachungen & Solarenergie" },
      { to: "/sanierung", label: "Sanierung & Ökologie" },
      { to: "/hallen", label: "Hallen- & Gewerbebau" },
      { to: "/lohnabbund", label: "Lohnabbund" },
      { to: "/kontakt", label: "Kontakt" },
    ],
    aboutLede:
      "Qualität, Präzision und Nachhaltigkeit – von Beratung und Planung bis Montage.",
    bullets: [
      "BIM (Dietrich’s) · Statik (RFEM/FRILO)",
      "Hundegger · Weinmann · CE · EN 1090",
      "30 Jahre Gewährleistung auf tragende Holzkonstruktionen",
    ],
    sections: {
      holzbau: [
        "Holzrahmenbau, Aufstockungen, Elemente",
        "Ausführungspläne, Montage, Garantie",
        "Energieeffizient, ökologisch, wirtschaftlich",
      ],
      dach: [
        "Dachstühle, Abdichtung, Dachfenster",
        "PV-Vorbereitung & Montage",
        "Wartung & Inspektion",
      ],
      sanierung: [
        "Fassade & Dämmung (Holzfaser, Mineralwolle, …)",
        "Wärmebrücken-optimierte Details",
        "Förderfähige Maßnahmen",
      ],
      hallen: [
        "Tragwerke Holz/Holz-Hybrid",
        "Brandschutz- & Stabilitätsnachweise",
        "Montage mit eigenem Team",
      ],
      abbund: [
        "CNC-Abbund — Hundegger / Weinmann",
        "Daten: BVX, BTL, u. a.",
        "Beschriftung, Etiketten, Stücklisten",
      ],
    },
    ui: {
      langSwitch: "EN", dark: "Dark", light: "Light",
      send: "Senden", name: "Name", message: "Nachricht", emailLabel: "E-Mail",
      cta: "Projekt anfragen", mail: "E-Mail senden", call: "Anrufen"
    },
  },
  en: {
    brand: "ROTTMÜLLER",
    tagline: "Sustainable Construction · Precision in Timber",
    address: "Bad Aibling · Munich, Germany",
    email: "info@rottmueller-holzbau.de",
    phone: "+49 (0)8061 123456",
    links: { datenschutz: "/privacy.html", impressum: "/imprint.html" },
    heroImage: "/CONTENT.en.hero.image.jpg",
    nav: [
      { to: "/", label: "Home" },
      { to: "/ueber", label: "About Rottmüller" },
      { to: "/holzbau", label: "Timber & Carpentry" },
      { to: "/bedachungen-solar", label: "Roofing & Solar" },
      { to: "/sanierung", label: "Renovation & Ecology" },
      { to: "/hallen", label: "Halls & Industrial" },
      { to: "/lohnabbund", label: "Contract Cutting" },
      { to: "/kontakt", label: "Contact" },
    ],
    aboutLede:
      "Quality, precision and sustainability — from consulting and design to assembly.",
    bullets: [
      "BIM (Dietrich’s) · Statics (RFEM/FRILO)",
      "Hundegger · Weinmann · CE · EN 1090",
      "30-year warranty on structural timber works",
    ],
    sections: {
      holzbau: [
        "Timber-frame, vertical extensions, elements",
        "Shop drawings, assembly, warranty",
        "Efficient, ecological, economical",
      ],
      dach: [
        "Trusses, waterproofing, roof windows",
        "PV preparation & installation",
        "Maintenance & inspection",
      ],
      sanierung: [
        "Facade & insulation (wood fiber, mineral wool, …)",
        "Thermal-bridge optimized details",
        "Eligible subsidized measures",
      ],
      hallen: [
        "Timber / hybrid structures",
        "Fire & stability proofs",
        "Assembly by in-house team",
      ],
      abbund: [
        "CNC cutting — Hundegger / Weinmann",
        "Data: BVX, BTL, etc.",
        "Labels, marking, BOMs",
      ],
    },
    ui: {
      langSwitch: "DE", dark: "Dark", light: "Light",
      send: "Send", name: "Name", message: "Message", emailLabel: "Email",
      cta: "Request a project", mail: "Send email", call: "Call"
    },
  },
};

/* ================== УТИЛИТЫ/АНИМАЦИИ ================== */
const slugify = (s) =>
  s?.toString()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.25, ease: "easeIn" } },
};

const reveal = {
  hidden: { opacity: 0, y: 12 },
  show: (i = 1) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.35, ease: "easeOut" }
  }),
};

const Pill = ({ children }) => (
  <motion.span
    className="inline-flex items-center gap-2 rounded-full px-4 py-2 border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/10 text-sm"
    whileHover={{ y: -2 }}
    transition={{ type: "spring", stiffness: 300, damping: 22 }}
  >
    <CheckCircle2 className="h-4 w-4" /> {children}
  </motion.span>
);

const Card = ({ className = "", children }) => (
  <motion.div
    className={`rounded-2xl border border-black/10 dark:border-white/15 bg-white dark:bg-black ${className}`}
    whileHover={{ y: -4 }}
    transition={{ type: "spring", stiffness: 300, damping: 22 }}
  >
    {children}
  </motion.div>
);

/* ================== ОБЩИЕ ЧАСТИ ================== */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function PageHero({ title, subtitle, image }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"], // пока секция уходит, анимируем
  });
  // Параллакс/зум — минималистично
  const y = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <motion.div className="absolute inset-0 -z-10" style={{ y, scale }}>
        {image ? (
          <img src={image} alt="" className="w-full h-[42vh] md:h-[56vh] object-cover" />
        ) : (
          <div className="w-full h-[42vh] md:h-[56vh]" style={{ background: "linear-gradient(180deg,#0b0b0b,#090909)" }} />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 60% at 25% 20%, rgba(0,0,0,.25) 0%, rgba(0,0,0,.45) 55%, rgba(0,0,0,.6) 100%), linear-gradient(180deg, rgba(0,0,0,.25), rgba(0,0,0,.35))",
          }}
        />
      </motion.div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <motion.h1
          className="text-4xl md:text-6xl font-semibold tracking-tight text-white"
          variants={reveal} initial="hidden" animate="show" custom={0}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            className="mt-4 text-white/80 max-w-2xl"
            variants={reveal} initial="hidden" animate="show" custom={1}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}

function Header({ t, lang, setLang, theme, setTheme }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-black/50 border-b border-black/10 dark:border-white/10">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <NavLink to="/" className="font-semibold tracking-tight">ROTTMÜLLER</NavLink>

        <LayoutGroup>
          <nav className="hidden md:flex items-center gap-2">
            {t.nav.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to==="/"}>
                {({ isActive }) => (
                  <span
                    className={`relative inline-block px-3 py-1.5 rounded-lg transition ${
                      isActive ? "bg-black/5 dark:bg-white/10" : "hover:bg-black/5 dark:hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-3 right-3 -bottom-[6px] h-[2px] bg-black/40 dark:bg-white/40"
                        style={{ borderRadius: 9999 }}
                        transition={{ type: "spring", stiffness: 500, damping: 40 }}
                      />
                    )}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </LayoutGroup>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "de" ? "en" : "de")}
            className="px-3 py-1.5 rounded-lg border border-black/15 dark:border-white/20"
          >
            {lang === "de" ? "EN" : "DE"}
          </button>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-black/15 dark:border-white/20"
          >
            {theme === "dark" ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="text-sm">{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
          <button onClick={() => setOpen(true)} className="md:hidden p-2 rounded-lg border border-black/15 dark:border-white/20">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
            <motion.div
              className="absolute inset-y-0 left-0 w-[88%] max-w-sm bg-white text-black dark:bg-black dark:text-white p-6"
              initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 240, damping: 26 }}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">ROTTMÜLLER</span>
                <button onClick={() => setOpen(false)} className="p-2 rounded-lg border border-black/15 dark:border-white/20"><X/></button>
              </div>
              <nav className="mt-6 grid gap-2">
                {t.nav.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to==="/"}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-lg ${isActive ? "bg-black/5 dark:bg-white/10" : "hover:bg-black/5 dark:hover:bg-white/10"}`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                <div className="mt-4 flex items-center gap-2">
                  <Languages className="h-4 w-4"/>
                  <button onClick={()=>setLang("de")} className={`px-3 py-1.5 rounded-lg border ${lang==="de"?"bg-black text-white dark:bg-white dark:text-black":"border-black/20 dark:border-white/20"}`}>DE</button>
                  <button onClick={()=>setLang("en")} className={`px-3 py-1.5 rounded-lg border ${lang==="en"?"bg-black text-white dark:bg-white dark:text-black":"border-black/20 dark:border-white/20"}`}>EN</button>
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer({ t }) {
  return (
    <footer className="border-t border-black/10 dark:border-white/10">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-start justify-between gap-6">
        <div>
          <p className="font-semibold">{t.brand}</p>
          <p className="text-black/60 dark:text-white/60">{t.address}</p>
        </div>
        <div className="text-sm">
          <a className="underline mr-3" href={t.links.datenschutz}>{t.nav[0].label==="Home"?"Privacy":"Datenschutz"}</a>
          <a className="underline" href={t.links.impressum}>{t.nav[0].label==="Home"?"Imprint":"Impressum"}</a>
        </div>
        <div className="text-sm">
          <span className="font-semibold">E:</span>{" "}
          <a className="underline" href={`mailto:${t.email}`}>{t.email}</a>
        </div>
      </div>
    </footer>
  );
}

/* ================== СТРАНИЦЫ ================== */
function HomePage({ t }) {
  return (
    <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <PageHero title={t.tagline} image={t.heroImage} />
      <section className="w-full max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <motion.div className="flex flex-wrap gap-2" variants={reveal} initial="hidden" animate="show">
          <Pill>Made in Germany</Pill>
          <Pill>Hundegger · Weinmann</Pill>
          <Pill>BIM / CNC</Pill>
        </motion.div>
        <motion.div className="mt-8 flex flex-wrap gap-3" variants={reveal} initial="hidden" animate="show" custom={2}>
          <NavLink to="/kontakt" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 bg-black text-white dark:bg-white dark:text-black font-semibold">
            {t.ui.cta} <ArrowRight className="h-4 w-4" />
          </NavLink>
        </motion.div>
      </section>
    </motion.main>
  );
}

function AboutPage({ t }) {
  return (
    <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <PageHero title={t.nav[1].label} subtitle={t.aboutLede} image={t.heroImage}/>
      <section className="w-full max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <motion.ul className="space-y-3" variants={reveal} initial="hidden" animate="show">
          {t.bullets.map((b,i)=>(
            <li key={b} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-5 w-5"/>
              <motion.span custom={i+1} variants={reveal}>{b}</motion.span>
            </li>
          ))}
        </motion.ul>
      </section>
    </motion.main>
  );
}

function SimpleListPage({ t, title, items }) {
  return (
    <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <PageHero title={title} image={t.heroImage}/>
      <section className="w-full max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" variants={reveal} initial="hidden" animate="show">
          {items.map((b,i)=>(
            <Card key={b} className="p-5" >
              <motion.div custom={i+1} variants={reveal} initial="hidden" animate="show">
                {b}
              </motion.div>
            </Card>
          ))}
        </motion.div>
      </section>
    </motion.main>
  );
}

function ContactPage({ t }) {
  return (
    <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <PageHero title={t.nav[7].label} image={t.heroImage}/>
      <section className="w-full max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2"><Mail className="h-4 w-4"/><a className="underline" href={`mailto:${t.email}`}>{t.email}</a></div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4"/><a className="underline" href={`tel:${t.phone.replace(/[^+\d]/g,"")}`}>{t.phone}</a></div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4"/><span>{t.address}</span></div>
            </div>
            <div className="mt-6 flex gap-3">
              <a href={`mailto:${t.email}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black">
                {t.ui.mail}
              </a>
              <a href={`tel:${t.phone.replace(/[^+\d]/g,"")}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-black/20 dark:border-white/20">
                {t.ui.call}
              </a>
            </div>
          </Card>
          <form className="grid gap-3" onSubmit={(e)=>e.preventDefault()}>
            <input className="rounded-xl px-3 py-2 border border-black/15 dark:border-white/20 bg-black/5 dark:bg-white/10" placeholder={t.ui.name}/>
            <input className="rounded-xl px-3 py-2 border border-black/15 dark:border-white/20 bg-black/5 dark:bg-white/10" placeholder={t.ui.emailLabel}/>
            <textarea rows={5} className="rounded-xl px-3 py-2 border border-black/15 dark:border-white/20 bg-black/5 dark:bg-white/10" placeholder={t.ui.message}/>
            <button className="rounded-xl px-4 py-2 bg-black text-white dark:bg-white dark:text-black font-semibold">
              {t.ui.send}
            </button>
          </form>
        </div>
      </section>
    </motion.main>
  );
}

/* ================== APP SHELL (РОУТЫ) ================== */
function AppShell({ t, lang, setLang, theme, setTheme }) {
  const location = useLocation();
  useEffect(() => { document.documentElement.classList.toggle("dark", theme==="dark"); }, [theme]);

  return (
    <>
      <ScrollToTop />
      <Header t={t} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage t={t} />} />
          <Route path="/ueber" element={<AboutPage t={t} />} />
          <Route path="/holzbau" element={<SimpleListPage t={t} title={t.nav[2].label} items={t.sections.holzbau} />} />
          <Route path="/bedachungen-solar" element={<SimpleListPage t={t} title={t.nav[3].label} items={t.sections.dach} />} />
          <Route path="/sanierung" element={<SimpleListPage t={t} title={t.nav[4].label} items={t.sections.sanierung} />} />
          <Route path="/hallen" element={<SimpleListPage t={t} title={t.nav[5].label} items={t.sections.hallen} />} />
          <Route path="/lohnabbund" element={<SimpleListPage t={t} title={t.nav[6].label} items={t.sections.abbund} />} />
          <Route path="/kontakt" element={<ContactPage t={t} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
      <Footer t={t} />
    </>
  );
}

export default function App() {
  const [lang, setLang] = useState("de");
  const [theme, setTheme] = useState("light");
  const t = useMemo(() => CONTENT[lang], [lang]);

  return (
    <BrowserRouter>
      <AppShell t={t} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />
    </BrowserRouter>
  );
}
