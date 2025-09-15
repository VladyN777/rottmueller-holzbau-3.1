import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import {
  Menu, X, ArrowRight, Languages, Moon, Sun as SunIcon, Star,
  Wrench, Hammer, Building2, Factory, Package2, Sun,
  MapPin, Mail, Phone, Search
} from "lucide-react";

const ACCENT = "#008000";

const copy = {
  de: {
    brand: "Rottmüller Holzbau",
    tagline: "Nachhaltiges Bauen. Präzision in Holz.",
    nav: [
      "Home","Vision","Leistungen","Timeline","Portfolio",
      "Tech","Zertifikate","Media Kit","Karriere","Karte","Presse","Kontakt"
    ],
    heroCtas: ["Projekt anfragen","Portfolio ansehen"],
    visionTitle: "Vision",
    visionBody:
      "Wir planen und bauen nachhaltig, präzise und verantwortungsvoll. Rottmüller Holzbau verbindet bayerische Handwerkstradition mit moderner Ingenieurkunst – in Holz UND Beton, wo es projektbezogen sinnvoll ist.",
    warranty: "30 Jahre Systemgarantie auf ausgewählte Dach-/Fassadensysteme.",
    servicesTitle: "Leistungen",
    services: [
      { icon: Hammer, title: "Holzbau", desc: "Tragwerke, Aufstockungen, Sanierungen." },
      { icon: Package2, title: "Modul-/Tiny Houses", desc: "Industrielle Vorfertigung, schnelle Montage." },
      { icon: Factory, title: "Hallenbau", desc: "Gewerbe, Landwirtschaft, Sport." },
      { icon: Building2, title: "Dach & Solar", desc: "Dacheindeckungen, PV-Integration, Energieberatung." },
      { icon: Wrench, title: "Consulting", desc: "Statik (DIN/Eurocode/SIA), Ausschreibung, BIM." },
      { icon: Sun, title: "Vorfertigung", desc: "CNC, Elemente, Qualitätssicherung." }
    ],
    softwareTitle: "Software & Maschinen",
    softwareText: "Dietrichs (Modellierung), Frilo (Statik), Ubakus (Wärme). Maschinenpark: Hundegger, Weinmann.",
    certificatesTitle: "Zertifikate & Qualität (5 Sterne)",
    certificatesText: "FSC/PEFC · DGNB/LEED-ready · ISO-orientiertes QMS · ZVDH · Brandschutz- & Schallschutznachweise.",
    mediakitTitle: "Media Kit",
    mediakitText: "Logos, Wortmarke, Monogramm, Farbsystem, Signaturen. Nur für Presse/Partner.",
    careersTitle: "Karriere",
    careersIntro: "Wir wachsen – präzise, sauber, fair. Bewirb dich mit wenigen Klicks.",
    mapTitle: "Projekte – Deutschland",
    pressTitle: "Presse",
    contactTitle: "Kontakt",
    contactBody: "Bad Aibling / München, Deutschland.",
    addressLabel: "Adresse",
    emailLabel: "E-Mail",
    phoneLabel: "Telefon",
    pricingPolicy: "Preise – nur auf Anfrage nach Kontaktaufnahme.",
    searchPlaceholder: "Suche (Platzhalter)",
    footerLegal: "Datenschutz · Impressum",
  },
  en: {
    brand: "Rottmüller Holzbau",
    tagline: "Sustainable Construction. Precision in Timber.",
    nav: [
      "Home","Vision","Capabilities","Timeline","Portfolio",
      "Tech","Certificates","Media Kit","Careers","Map","Press","Contact"
    ],
    heroCtas: ["Request a Project","View Portfolio"],
    visionTitle: "Vision",
    visionBody:
      "We design and build sustainably, precisely and responsibly. Rottmüller Holzbau merges Bavarian craft with modern engineering – in timber AND concrete when a hybrid approach best serves the project.",
    warranty: "30-year system warranty on selected roof/facade systems.",
    servicesTitle: "Capabilities",
    services: [
      { icon: Hammer, title: "Timber Construction", desc: "Structures, extensions, refurbishments." },
      { icon: Package2, title: "Modular/Tiny Houses", desc: "Industrial prefabrication, rapid assembly." },
      { icon: Factory, title: "Hall Construction", desc: "Industrial, agricultural, sports." },
      { icon: Building2, title: "Roofing & Solar", desc: "Roof systems, PV integration, energy consulting." },
      { icon: Wrench, title: "Consulting", desc: "Statics (DIN/Eurocode/SIA), tendering, BIM." },
      { icon: Sun, title: "Prefabrication", desc: "CNC, elements, quality control." }
    ],
    softwareTitle: "Software & Machines",
    softwareText: "Dietrichs (modeling), Frilo (structural), Ubakus (thermal). Machinery: Hundegger, Weinmann.",
    certificatesTitle: "Certificates & Quality (5 Stars)",
    certificatesText: "FSC/PEFC · DGNB/LEED-ready · ISO-oriented QMS · ZVDH · Fire & acoustics compliance.",
    mediakitTitle: "Media Kit",
    mediakitText: "Logos, wordmark, monogram, palette, signatures. For press/partners only.",
    careersTitle: "Careers",
    careersIntro: "We are growing – precise, clean, fair. Apply in a few clicks.",
    mapTitle: "Projects – Germany",
    pressTitle: "Press",
    contactTitle: "Contact",
    contactBody: "Bad Aibling / Munich, Germany.",
    addressLabel: "Address",
    emailLabel: "Email",
    phoneLabel: "Phone",
    pricingPolicy: "Prices — only upon request after contact.",
    searchPlaceholder: "Search (placeholder)",
    footerLegal: "Privacy · Imprint",
  },
  fr: {
    brand: "Rottmüller Holzbau",
    tagline: "Construction durable. Précision en bois.",
    nav: [
      "Accueil","Vision","Compétences","Chronologie","Portfolio",
      "Tech","Certificats","Media Kit","Carrières","Carte","Presse","Contact"
    ],
    heroCtas: ["Demander un projet","Voir le portfolio"],
    visionTitle: "Vision",
    visionBody:
      "Nous concevons et construisons de manière durable et précise. Rottmüller Holzbau unit l'artisanat bavarois et l'ingénierie moderne – en bois ET béton lorsque l'hybride est pertinent.",
    warranty: "Garantie système 30 ans sur certains systèmes toiture/façade.",
    servicesTitle: "Compétences",
    services: [
      { icon: Hammer, title: "Construction bois", desc: "Structures, surélévations, rénovations." },
      { icon: Package2, title: "Maisons modulaires/Tiny", desc: "Préfabrication industrielle, montage rapide." },
      { icon: Factory, title: "Construction de halls", desc: "Industriel, agricole, sport." },
      { icon: Building2, title: "Toiture & Solaire", desc: "Systèmes de toiture, PV, conseil énergie." },
      { icon: Wrench, title: "Conseil", desc: "Statique (DIN/Eurocode/SIA), appels d'offres, BIM." },
      { icon: Sun, title: "Préfabrication", desc: "CNC, éléments, contrôle qualité." }
    ],
    softwareTitle: "Logiciels & Machines",
    softwareText: "Dietrichs (modélisation), Frilo (statique), Ubakus (thermique). Machines : Hundegger, Weinmann.",
    certificatesTitle: "Certificats & Qualité (5 étoiles)",
    certificatesText: "FSC/PEFC · DGNB/LEED-ready · QMS orienté ISO · ZVDH · Feu & acoustique.",
    mediakitTitle: "Media Kit",
    mediakitText: "Logos, wordmark, monogramme, palette, signatures. Pour la presse/partenaires.",
    careersTitle: "Carrières",
    careersIntro: "Nous grandissons – précis, propre, équitable. Postulez en quelques clics.",
    mapTitle: "Projets – Allemagne",
    pressTitle: "Presse",
    contactTitle: "Contact",
    contactBody: "Bad Aibling / Munich, Allemagne.",
    addressLabel: "Adresse",
    emailLabel: "Email",
    phoneLabel: "Téléphone",
    pricingPolicy: "Prix — uniquement sur demande après contact.",
    searchPlaceholder: "Recherche (placeholder)",
    footerLegal: "Confidentialité · Mentions légales",
  }
};

const timeline = [
  { year: 1978, title: "Zimmerei-Gründung", cat: "legacy", img: "https://images.unsplash.com/photo-1444419988131-046ed4e5ffd6?q=80&w=1200&auto=format&fit=crop", place: "Rosenheim" },
  { year: 1986, title: "Hallenbau Landwirtschaft", cat: "hall", img: "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1200&auto=format&fit=crop", place: "Chiemgau" },
  { year: 1995, title: "Dachsanierung + PV (Pilot)", cat: "solar", img: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1200&auto=format&fit=crop", place: "München" },
  { year: 2004, title: "Modulare Schulerweiterung", cat: "modular", img: "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop", place: "Augsburg" },
  { year: 2011, title: "Aufstockung in Holz/Beton hybrid", cat: "timber", img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop", place: "München" },
  { year: 2016, title: "Sporthalle in Brettsperrholz", cat: "hall", img: "https://images.unsplash.com/photo-1523419409543-8c1f6527c5b3?q=80&w=1200&auto=format&fit=crop", place: "Regensburg" },
  { year: 2019, title: "Serielle Modulhäuser (BIM)", cat: "modular", img: "https://images.unsplash.com/photo-1541976076758-347942db1970?q=80&w=1200&auto=format&fit=crop", place: "Starnberg" },
  { year: 2022, title: "Werkserweiterung · Hundegger/Weinmann", cat: "factory", img: "https://images.unsplash.com/photo-1454179083322-198bb4daae49?q=80&w=1200&auto=format&fit=crop", place: "Bad Aibling" },
  { year: 2024, title: "Plusenergie-Dach · 1.2 MWp", cat: "solar", img: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c52f?q=80&w=1200&auto=format&fit=crop", place: "Oberbayern" },
];

const points = [
  { name: "München Hallenbau", lat: 48.1351, lon: 11.5820 },
  { name: "Regensburg Sporthalle", lat: 49.0134, lon: 12.1016 },
  { name: "Augsburg Modul", lat: 48.3705, lon: 10.8978 },
  { name: "Starnberg Modulhäuser", lat: 48.0, lon: 11.3440 },
  { name: "Rosenheim Werk", lat: 47.8564, lon: 12.1279 },
];

const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`w-full max-w-7xl mx-auto px-6 md:px-10 ${className}`}>{children}</section>
);

const ThemeButton = ({ theme, setTheme }) => (
  <button
    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    className="inline-flex items-center gap-2 border border-black dark:border-white rounded-xl px-3 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
    aria-label="Toggle theme"
  >
    {theme === "dark" ? <SunIcon className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span>
  </button>
);

const CapCard = ({ Icon, title, desc }) => (
  <motion.div whileHover={{ y: -4 }} className="group p-6 rounded-3xl border border-black dark:border-white bg-white dark:bg-black hover:shadow-xl transition">
    <div className="h-12 w-12 rounded-2xl border border-black dark:border-white grid place-items-center mb-4">
      <Icon className="h-6 w-6" />
    </div>
    <h3 className="font-semibold text-xl mb-2">{title}</h3>
    <p className="text-black/70 dark:text-white/70 leading-relaxed">{desc}</p>
  </motion.div>
);

const TimelineItem = ({ item, alignRight }) => (
  <div className={`relative flex ${alignRight ? 'justify-start' : 'justify-end'} w-full`}>
    <div className="w-[48%]">
      <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="rounded-3xl border border-black dark:border-white overflow-hidden bg-white dark:bg-black shadow">
        <div className="h-56 bg-cover bg-center" style={{backgroundImage:`url(${item.img})`}}/>
        <div className="p-5">
          <div className="text-sm text-black/60 dark:text-white/60">{item.year} · {item.place}</div>
          <div className="text-xl font-semibold mt-1">{item.title}</div>
        </div>
      </motion.div>
    </div>
    <div className="absolute left-1/2 -translate-x-1/2 top-24 w-5 h-5 rounded-full bg-white dark:bg-black border border-black dark:border-white grid place-items-center">
      <div className="w-2.5 h-2.5 rounded-full" style={{background:ACCENT}}/>
    </div>
  </div>
);

const SoftwareRow = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-center">
    {[{src:"/logos/dietrichs.png",alt:"Dietrichs"},{src:"/logos/frilo.png",alt:"Frilo"},{src:"/logos/ubakus.png",alt:"Ubakus"},{src:"/logos/hundegger.png",alt:"Hundegger"},{src:"/logos/weinmann.png",alt:"Weinmann"}].map(l=>(
      <div key={l.alt} className="p-4 rounded-2xl border border-black/30 dark:border-white/30 bg-white dark:bg-black grid place-items-center">
        <img src={l.src} alt={l.alt+" Logo"} className="h-10 object-contain"/>
      </div>
    ))}
  </div>
);

const Certificates = ({ t }) => (
  <div className="rounded-3xl border border-black dark:border-white p-6 md:p-8 bg-white dark:bg-black">
    <div className="flex items-center gap-2">
      {[...Array(5)].map((_,i)=>(<Star key={i} className="h-5 w-5" style={{color:ACCENT}}/>))}
    </div>
    <p className="mt-3 text-lg">{t.certificatesText}</p>
  </div>
);

const MediaKit = ({ t }) => (
  <div className="grid md:grid-cols-2 gap-6">
    <div className="rounded-2xl border border-black dark:border-white p-5">
      <h3 className="font-semibold text-xl mb-2">Logos & Wortmarke</h3>
      <ul className="list-disc ml-5 text-black/80 dark:text-white/80">
        <li><a className="underline" href="/brand/wordmark_light.svg">Wordmark (Light SVG)</a></li>
        <li><a className="underline" href="/brand/wordmark_dark.svg">Wordmark (Dark SVG)</a></li>
        <li><a className="underline" href="/brand/monogram_light.svg">Monogram (Light SVG)</a></li>
        <li><a className="underline" href="/brand/monogram_dark.svg">Monogram (Dark SVG)</a></li>
        <li><a className="underline" href="/favicon.svg">Favicon (SVG)</a></li>
      </ul>
    </div>
    <div className="rounded-2xl border border-black dark:border-white p-5">
      <h3 className="font-semibold text-xl mb-2">Fonts & Farben</h3>
      <p>Schrift: Space Grotesk · Akzent: <span className="font-mono">#008000</span></p>
      <div className="mt-3 flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg border" style={{background:"#000"}}/>
        <div className="h-10 w-10 rounded-lg border" style={{background:"#fff"}}/>
        <div className="h-10 w-10 rounded-lg border" style={{background:ACCENT}}/>
      </div>
    </div>
  </div>
);

const Careers = ({ t, lang }) => (
  <div className="grid md:grid-cols-2 gap-6">
    {[
      { role: {de:"Ingenieur:in Holzbau",en:"Timber Engineer",fr:"Ingénieur·e bois"}, level:"m/w/d" },
      { role: {de:"Polier:in Montage",en:"Site Foreman",fr:"Chef·fe de chantier"}, level:"m/w/d" },
      { role: {de:"Monteur:in Holz",en:"Timber Installer",fr:"Monteur·se bois"}, level:"m/w/d" },
      { role: {de:"BIM/Arbeitsvorbereitung",en:"BIM/Work Prep",fr:"BIM/Préparation"}, level:"m/w/d" },
    ].map((j,i)=> (
      <div key={i} className="rounded-2xl border border-black dark:border-white p-5">
        <div className="text-lg font-semibold">{j.role[lang]}</div>
        <div className="text-sm text-black/60 dark:text-white/60">Bad Aibling / München · {j.level}</div>
        <a href="mailto:info@rottmueller-holzbau.de?subject=Bewerbung" className="mt-4 inline-flex items-center gap-2 rounded-xl border border-black dark:border-white px-3 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition">E-Mail</a>
      </div>
    ))}
  </div>
);

const MapGermany = ({ points }) => {
  const bbox = { minLon: 5.5, maxLon: 15.5, minLat: 47.0, maxLat: 55.0 };
  const project = (lat, lon, W, H) => {
    const x = ((lon - bbox.minLon) / (bbox.maxLon - bbox.minLon)) * W;
    const y = ((bbox.maxLat - lat) / (bbox.maxLat - bbox.minLat)) * H;
    return { x, y };
  };
  const W = 880, H = 520;
  return (
    <div className="w-full overflow-hidden rounded-3xl border border-black dark:border-white bg-white dark:bg-black">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        <rect x="0" y="0" width={W} height={H} fill="#f7f7f7" />
        <rect x="60" y="40" width={W-120} height={H-80} fill="none" stroke="#ddd" />
        {points.map((p,i)=>{
          const {x,y} = project(p.lat, p.lon, W-120, H-80);
          const px = x + 60, py = y + 40;
          return (
            <g key={i}>
              <circle cx={px} cy={py} r={7} fill="#008000" />
              <text x={px+10} y={py-10} fontSize="12" fill="#111" className="dark:fill-white">{p.name}</text>
            </g>
          )
        })}
      </svg>
    </div>
  );
};

const NavOverlay = ({ open, onClose, lang, setLang, setTheme, theme, t }) => (
  <div role="dialog" aria-modal="true" className={`fixed inset-0 z-50 transition ${open ? "visible" : "invisible"}`}>
    <div className={`absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity ${open ? "opacity-100" : "opacity-0"}`} onClick={onClose} />
    <div className={`absolute inset-0 bg-white text-black dark:bg-black dark:text-white transition-transform duration-300 ease-out ${open ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex items-center justify-between px-6 md:px-10 pt-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl border border-black dark:border-white grid place-items-center"><span className="font-bold text-xl" style={{color:"#008000"}}>R</span></div>
          <span className="font-bold text-xl tracking-tight">{t.brand}</span>
        </div>
        <button aria-label="Close menu" onClick={onClose} className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black dark:focus-visible:outline-white"><X/></button>
      </div>
      <div className="h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-10 pb-32 pt-8">
        {t.nav.map((label)=> (
          <a key={label} href={`#${label.toLowerCase().replace(/\\s|\\//g,'-')}`} onClick={onClose} className="group border border-black dark:border-white rounded-3xl p-6 md:p-8 hover:-translate-y-1 transition">
            <div className="text-4xl md:text-6xl xl:text-7xl font-semibold leading-[0.95]">{label}</div>
          </a>
        ))}
      </div>
      <div className="fixed bottom-0 inset-x-0 px-6 md:px-10 py-4 border-t border-black dark:border-white bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="flex items-center gap-3">
            <Languages className="h-4 w-4"/>
            <button onClick={()=>setLang("de")} className={`px-3 py-2 rounded-xl border ${lang==='de'?'bg-black text-white dark:bg-white dark:text-black':''}`}>DE</button>
            <button onClick={()=>setLang("en")} className={`px-3 py-2 rounded-xl border ${lang==='en'?'bg-black text-white dark:bg-white dark:text-black':''}`}>EN</button>
            <button onClick={()=>setLang("fr")} className={`px-3 py-2 rounded-xl border ${lang==='fr'?'bg-black text-white dark:bg-white dark:text-black':''}`}>FR</button>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={()=>setTheme(theme==="dark"?"light":"dark")} className="inline-flex items-center gap-2 border border-black dark:border-white rounded-xl px-3 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition">{theme==="dark"? <SunIcon className="h-4 w-4"/> : <Moon className="h-4 w-4"/>}{theme==="dark"?"Light":"Dark"}</button>
            <div className="flex-1 sm:max-w-md">
              <label htmlFor="site-search" className="sr-only">Search</label>
              <div className="flex items-center gap-2 border border-black dark:border-white rounded-2xl px-4 py-3">
                <Search className="h-5 w-5"/>
                <input id="site-search" placeholder={t.searchPlaceholder} className="w-full bg-transparent outline-none placeholder:text-black/50 dark:placeholder:text-white/60" disabled/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Hero = ({ t, lang }) => (
  <div id="home" className="relative h-[88vh] md:h-[92vh] overflow-hidden">
    <div className="absolute inset-0 bg-center bg-cover" style={{backgroundImage:
      "url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2400&auto=format&fit=crop')"}} role="img"
      aria-label={lang==="de"?"Modulares Holzhaus im Sonnenlicht":lang==="fr"?"Maison modulaire en bois au soleil":"Modular timber house in sunlight"} />
    <div className="absolute inset-0 bg-gradient-to-t from-black to-black/10" />
    <section className="relative h-full flex items-end pb-12 md:pb-16 w-full max-w-7xl mx-auto px-6 md:px-10">
      <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.8}} className="text-white">
        <h1 className="font-bold tracking-tight leading-[1.05] text-4xl sm:text-6xl md:text-7xl max-w-5xl">{t.tagline}</h1>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#kontakt" className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 bg-white text-black font-semibold hover:-translate-y-0.5 transition">
            {t.heroCtas[0]} <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#portfolio" className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 bg-transparent border border-white/80 text-white hover:bg-white hover:text-black transition">
            {t.heroCtas[1]}
          </a>
        </div>
      </motion.div>
    </section>
  </div>
);

export default function App(){
  const [lang, setLang] = useState("de");
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const t = copy[lang];

  useEffect(()=>{
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored || (prefersDark ? "dark" : "light");
    setTheme(initial);
    if (initial==="dark") document.documentElement.classList.add("dark");
  },[]);
  useEffect(()=>{
    if (theme==="dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", theme);
  },[theme]);

  const jsonLd = useMemo(() => ([
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Rottmüller Holzbau",
      url: "https://rottmueller-holzbau.de",
      email: "info@rottmueller-holzbau.de",
      logo: "/brand/wordmark_light.svg",
      sameAs: []
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Rottmüller Holzbau",
      url: "https://rottmueller-holzbau.de",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://rottmueller-holzbau.de/?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ]), []);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <Helmet>
        <title>Rottmüller Holzbau — Premium Timber Engineering</title>
        <meta name="description" content="Nachhaltiges Bauen. Präzision in Holz. Timber + Concrete hybrid, modular houses, halls, roofing & solar, consulting, prefabrication."/>
        <meta property="og:title" content="Rottmüller Holzbau"/>
        <meta property="og:description" content={copy.de.tagline + " / " + copy.en.tagline + " / " + copy.fr.tagline}/>
        <meta property="og:type" content="website"/>
        <meta property="og:image" content="/og-image.png"/>
        <meta name="theme-color" content="#008000"/>
        <script type="application/ld+json">{JSON.stringify(jsonLd[0])}</script>
        <script type="application/ld+json">{JSON.stringify(jsonLd[1])}</script>
      </Helmet>

      <header className="fixed top-0 inset-x-0 z-40">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="mt-4 md:mt-6 flex items-center justify-between rounded-2xl border border-black dark:border-white bg-white/90 dark:bg-black/70 backdrop-blur p-3">
            <a href="#home" className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl border border-black dark:border-white grid place-items-center" aria-hidden>
                <span className="font-bold" style={{color:"#008000"}}>R</span>
              </div>
              <span className="font-semibold tracking-tight">Rottmüller Holzbau</span>
            </a>
            <div className="flex items-center gap-2">
              <button onClick={()=>setTheme(theme === "dark" ? "light" : "dark")} className="inline-flex items-center gap-2 border border-black dark:border-white rounded-xl px-3 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition" aria-label="Toggle theme">{theme === "dark" ? <SunIcon className="h-4 w-4" /> : <Moon className="h-4 w-4" />}<span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span></button>
              <div className="hidden md:flex items-center gap-1">
                <button onClick={()=>setLang("de")} className={`px-3 py-2 rounded-xl border ${lang==='de'?'bg-black text-white dark:bg-white dark:text-black':''}`}>DE</button>
                <button onClick={()=>setLang("en")} className={`px-3 py-2 rounded-xl border ${lang==='en'?'bg-black text-white dark:bg-white dark:text-black':''}`}>EN</button>
                <button onClick={()=>setLang("fr")} className={`px-3 py-2 rounded-xl border ${lang==='fr'?'bg-black text-white dark:bg-white dark:text-black':''}`}>FR</button>
              </div>
              <button onClick={()=>setMenuOpen(true)} className="inline-flex items-center gap-2 border border-black dark:border-white rounded-xl px-3 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition" aria-label="Open menu">
                <Menu className="h-4 w-4"/><span className="hidden md:inline">Menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <NavOverlay open={menuOpen} onClose={()=>setMenuOpen(false)} lang={lang} setLang={setLang} setTheme={setTheme} theme={theme} t={copy[lang]}/>

      <main className="pt-28 md:pt-32">
        <Hero t={copy[lang]} lang={lang}/>

        <section id={copy[lang].nav[1].toLowerCase()} className="w-full max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">{copy[lang].visionTitle}</h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-lg text-black/80 dark:text-white/80 leading-relaxed">{copy[lang].visionBody}</p>
              <div className="mt-6 p-5 rounded-2xl border border-black dark:border-white bg-[#f7fff7] dark:bg-[#0a1a0a]" style={{boxShadow:"0 8px 40px #00800022"}}>
                <p className="text-sm"><span className="font-semibold">{copy[lang].pricingPolicy}</span> · {copy[lang].warranty}</p>
              </div>
            </div>
          </div>
        </section>

        <section id={copy[lang].nav[2].toLowerCase()} className="w-full max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-10">{copy[lang].servicesTitle}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {copy[lang].services.map((s,idx)=> <div key={idx} className="group p-6 rounded-3xl border border-black dark:border-white bg-white dark:bg-black hover:shadow-xl transition"><div className="h-12 w-12 rounded-2xl border border-black dark:border-white grid place-items-center mb-4">{React.createElement(s.icon,{className:'h-6 w-6'})}</div><h3 className="font-semibold text-xl mb-2">{s.title}</h3><p className="text-black/70 dark:text-white/70 leading-relaxed">{s.desc}</p></div>)}
          </div>
        </section>

        <section id={copy[lang].nav[3].toLowerCase()} className="w-full max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-10">{lang==='de'? 'Timeline' : lang==='fr' ? 'Chronologie' : 'Timeline'}</h2>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-black/40 dark:bg-white/40"/>
            <div className="space-y-10">
              {timeline.map((item,idx)=> <div key={idx} className={`relative flex ${idx%2===0 ? 'justify-start' : 'justify-end'} w-full`}><div className="w-[48%]"><div className="rounded-3xl border border-black dark:border-white overflow-hidden bg-white dark:bg-black shadow"><div className="h-56 bg-cover bg-center" style={{backgroundImage:`url(${item.img})`}}/><div className="p-5"><div className="text-sm text-black/60 dark:text-white/60">{item.year} · {item.place}</div><div className="text-xl font-semibold mt-1">{item.title}</div></div></div></div><div className="absolute left-1/2 -translate-x-1/2 top-24 w-5 h-5 rounded-full bg-white dark:bg-black border border-black dark:border-white grid place-items-center"><div className="w-2.5 h-2.5 rounded-full" style={{background:'#008000'}}/></div></div>) }
            </div>
          </div>
        </section>

        <section id="portfolio" className="w-full max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-10">Portfolio</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {["https://images.unsplash.com/photo-1523419409543-8c1f6527c5b3?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1541976076758-347942db1970?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1502005229762-cf1b2da7c52f?q=80&w=1200&auto=format&fit=crop"].map((src,i)=>(
              <a key={i} href={src} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-3xl border border-black dark:border-white">
                <img src={src} alt={`Projekt ${i+1}`} className="w-full h-64 object-cover"/>
              </a>
            ))}
          </div>
          <p className="text-sm text-black/60 dark:text-white/60 mt-4">* Platzhalter-Fotos (Unsplash). Eigene Projektbilder folgen.</p>
        </section>

        <section id={copy[lang].nav[5].toLowerCase()} className="w-full max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4">{copy[lang].softwareTitle}</h2>
          <p className="text-black/80 dark:text-white/80 mb-8">{copy[lang].softwareText}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-center">
            {[{src:"/logos/dietrichs.png",alt:"Dietrichs"},{src:"/logos/frilo.png",alt:"Frilo"},{src:"/logos/ubakus.png",alt:"Ubakus"},{src:"/logos/hundegger.png",alt:"Hundegger"},{src:"/logos/weinmann.png",alt:"Weinmann"}].map(l=>(
              <div key={l.alt} className="p-4 rounded-2xl border border-black/30 dark:border-white/30 bg-white dark:bg-black grid place-items-center">
                <img src={l.src} alt={l.alt+" Logo"} className="h-10 object-contain"/>
              </div>
            ))}
          </div>
        </section>

        <section id={copy[lang].nav[6].toLowerCase()} className="w-full max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">{copy[lang].certificatesTitle}</h2>
          <div className="rounded-3xl border border-black dark:border-white p-6 md:p-8 bg-white dark:bg-black">
            <div className="flex items-center gap-2">{[...Array(5)].map((_,i)=>(<span key={i} className="inline-block" style={{color:"#008000"}}>★</span>))}</div>
            <p className="mt-3 text-lg">{copy[lang].certificatesText}</p>
          </div>
        </section>

        <section id={copy[lang].nav[7].toLowerCase().replace(/\\s/g,'-')} className="w-full max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">{copy[lang].mediakitTitle}</h2>
          <p className="text-black/80 dark:text-white/80 mb-6">{copy[lang].mediakitText}</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-black dark:border-white p-5"><h3 className="font-semibold text-xl mb-2">Logos & Wortmarke</h3><ul className="list-disc ml-5 text-black/80 dark:text-white/80"><li><a className="underline" href="/brand/wordmark_light.svg">Wordmark (Light SVG)</a></li><li><a className="underline" href="/brand/wordmark_dark.svg">Wordmark (Dark SVG)</a></li><li><a className="underline" href="/brand/monogram_light.svg">Monogram (Light SVG)</a></li><li><a className="underline" href="/brand/monogram_dark.svg">Monogram (Dark SVG)</a></li><li><a className="underline" href="/favicon.svg">Favicon (SVG)</a></li></ul></div>
            <div className="rounded-2xl border border-black dark:border-white p-5"><h3 className="font-semibold text-xl mb-2">Fonts & Farben</h3><p>Schrift: Space Grotesk · Akzent: <span className="font-mono">#008000</span></p><div className="mt-3 flex items-center gap-3"><div className="h-10 w-10 rounded-lg border" style={{background:"#000"}}/><div className="h-10 w-10 rounded-lg border" style={{background:"#fff"}}/><div className="h-10 w-10 rounded-lg border" style={{background:"#008000"}}/></div></div>
          </div>
        </section>

        <section id={copy[lang].nav[8].toLowerCase()} className="w-full max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4">{copy[lang].careersTitle}</h2>
          <p className="text-black/80 dark:text-white/80 mb-8">{copy[lang].careersIntro}</p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { role: {de:"Ingenieur:in Holzbau",en:"Timber Engineer",fr:"Ingénieur·e bois"}, level:"m/w/d" },
              { role: {de:"Polier:in Montage",en:"Site Foreman",fr:"Chef·fe de chantier"}, level:"m/w/d" },
              { role: {de:"Monteur:in Holz",en:"Timber Installer",fr:"Monteur·se bois"}, level:"m/w/d" },
              { role: {de:"BIM/Arbeitsvorbereitung",en:"BIM/Work Prep",fr:"BIM/Préparation"}, level:"m/w/d" },
            ].map((j,i)=> (
              <div key={i} className="rounded-2xl border border-black dark:border-white p-5">
                <div className="text-lg font-semibold">{j.role[lang]}</div>
                <div className="text-sm text-black/60 dark:text-white/60">Bad Aibling / München · {j.level}</div>
                <a href="mailto:info@rottmueller-holzbau.de?subject=Bewerbung" className="mt-4 inline-flex items-center gap-2 rounded-xl border border-black dark:border-white px-3 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition">E-Mail</a>
              </div>
            ))}
          </div>
        </section>

        <section id={copy[lang].nav[9].toLowerCase()} className="w-full max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">{copy[lang].mapTitle}</h2>
          <div className="w-full overflow-hidden rounded-3xl border border-black dark:border-white bg-white dark:bg-black"><svg viewBox="0 0 880 520" className="w-full h-auto"><rect x="0" y="0" width="880" height="520" fill="#f7f7f7"/><rect x="60" y="40" width="760" height="440" fill="none" stroke="#ddd"/><g><circle cx="392.0" cy="265.0" r="7" fill="#008000"/><text x="402.0" y="255.0" fontSize="12" fill="#111" className="dark:fill-white">München Hallenbau</text></g></svg></div>
        </section>

        <section id={copy[lang].pressTitle.toLowerCase()} className="w-full max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">{copy[lang].pressTitle}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[1,2].map(i => (
              <div key={i} className="p-5 rounded-2xl border border-black dark:border-white bg-[#fafafa] dark:bg-[#0e0e0e]">
                <p className="text-sm font-semibold">Article Placeholder {i}</p>
                <p className="text-sm text-black/60 dark:text-white/60">Title · Publisher · {lang==="de"?"Demnächst verfügbar":lang==="fr"?"Bientôt":"Coming soon"}</p>
              </div>
            ))}
          </div>
        </section>

        <section id={copy[lang].nav[11].toLowerCase()} className="w-full max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">{copy[lang].contactTitle}</h2>
          <p className="text-black/80 dark:text-white/80 mb-8">{copy[lang].contactBody}</p>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3"><MapPin className="h-5 w-5 mt-1"/><div><p className="text-sm uppercase tracking-wide text-black/60 dark:text-white/60">{copy[lang].addressLabel}</p><p>Rottmüller Holzbau · Bad Aibling / München</p></div></div>
              <div className="flex items-start gap-3"><Mail className="h-5 w-5 mt-1"/><div><p className="text-sm uppercase tracking-wide text-black/60 dark:text-white/60">{copy[lang].emailLabel}</p><a className="underline" href="mailto:info@rottmueller-holzbau.de">info@rottmueller-holzbau.de</a></div></div>
              <div className="flex items-start gap-3"><Phone className="h-5 w-5 mt-1"/><div><p className="text-sm uppercase tracking-wide text-black/60 dark:text-white/60">{copy[lang].phoneLabel}</p><p>+49 (0) 0000 000000 (Placeholder)</p></div></div>
              <form onSubmit={(e)=>{e.preventDefault(); alert(lang==="de"?"Danke! Wir melden uns.":lang==="fr"?"Merci ! Nous revenons vers vous.":"Thanks! We will get back to you.");}} className="mt-6 space-y-3">
                <input className="w-full border border-black dark:border-white rounded-xl px-4 py-3 bg-transparent" placeholder={lang==="de"?"Ihr Name":lang==="fr"?"Votre nom":"Your Name"} required/>
                <input className="w-full border border-black dark:border-white rounded-xl px-4 py-3 bg-transparent" type="email" placeholder="Email" required/>
                <textarea className="w-full border border-black dark:border-white rounded-xl px-4 py-3 bg-transparent" rows={4} placeholder={lang==="de"?"Nachricht":lang==="fr"?"Message":"Message"} required/>
                <button className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 bg-black text-white dark:bg-white dark:text-black font-semibold hover:-translate-y-0.5 transition" type="submit">{lang==="de"?"Absenden":lang==="fr"?"Envoyer":"Send"}</button>
              </form>
            </div>
            <div>
              <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl border border-black dark:border-white">
                <iframe title="Map to Rottmüller Holzbau" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2662.415!2d12.0!3d47.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBad%20Aibling!5e0!3m2!1sen!2sde!4v1700000000000" width="100%" height="100%" style={{border:0}} loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
              </div>
              <p className="text-xs text-black/60 dark:text-white/60 mt-2">* Map placeholder. Replace with exact coordinates.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/20 dark:border-white/20">
        <section className="w-full max-w-7xl mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl border border-black dark:border-white grid place-items-center" aria-hidden><span className="font-bold" style={{color:"#008000"}}>R</span></div>
            <div><p className="font-semibold">Rottmüller Holzbau</p><p className="text-sm text-black/60 dark:text-white/60">Bad Aibling / München</p></div>
          </div>
          <div className="text-sm">
            <a className="underline mr-3" href="/datenschutz.html">{lang==="de"?"Datenschutz":lang==="fr"?"Confidentialité":"Privacy"}</a>
            <a className="underline" href="/impressum.html">{lang==="de"?"Impressum":lang==="fr"?"Mentions légales":"Imprint"}</a>
          </div>
          <div className="text-sm"><span className="font-semibold">DE / EN / FR</span> · {copy[lang].emailLabel}: <a className="underline" href="mailto:info@rottmueller-holzbau.de">info@rottmueller-holzbau.de</a></div>
        </section>
      </footer>
    </div>
  );
}
