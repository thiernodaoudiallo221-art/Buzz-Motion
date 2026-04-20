import { Suspense, lazy, useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
const Spline = lazy(() => import("@splinetool/react-spline"));
import {
  Phone,
  Calendar,
  CheckCircle2,
  Globe,
  Clock,
  Zap,
  Target,
  Star,
  Users,
  MessageSquare,
  Linkedin,
  TrendingUp,
  Shield,
  Award,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { SiWhatsapp, SiFacebook, SiX } from "react-icons/si";

import logoImg from "@assets/image-download_1776650003991.png";
import teamImg1 from "@assets/20260411_095142_1776650003993.jpg";
import teamImg2 from "@assets/WhatsApp_Image_2026-04-19_at_23.12.25_1776650003977.jpeg";
import teamImg3 from "@assets/WhatsApp_Image_2026-04-19_at_17.47.50_1776650003981.jpeg";
import teamImg4 from "@assets/WhatsApp_Image_2026-04-19_at_17.47.50_(1)_1776650003979.jpeg";
import teamImg5 from "@assets/WhatsApp_Image_2026-04-19_at_17.47.49_(2)_1776650003982.jpeg";
import teamImg6 from "@assets/WhatsApp_Image_2026-04-19_at_17.47.49_(1)_1776650003983.jpeg";
import brandImg2 from "@assets/WhatsApp_Image_2026-04-19_at_17.47.46_1776650003990.jpeg";
import brandImg3 from "@assets/WhatsApp_Image_2026-04-19_at_17.47.46_(1)_1776650003988.jpeg";

import { Button } from "@/components/ui/button";

const WHATSAPP_LINK =
  "https://api.whatsapp.com/send/?phone=224660919148&text=Bonjour%20BuzzMotion%2C%20je%20veux%20créer%20un%20site%20ou%20une%20application.%20Pouvez-vous%20m'aider%20%3F";

/* ─── Typewriter hook ─────────────────────────────────────── */
const PHRASES = ["mauvais digital.", "un site obsolète.", "une mauvaise app.", "l'absence de digital."];

function useTypewriter(phrases: string[], speed = 55, pause = 2200) {
  const [display, setDisplay] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setPhraseIdx((p) => (p + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, phraseIdx, phrases, speed, pause]);

  useEffect(() => {
    setDisplay(phrases[phraseIdx].slice(0, charIdx));
  }, [charIdx, phraseIdx, phrases]);

  return display;
}

/* ─── Animated counter hook ──────────────────────────────── */
function useCounter(target: number, duration = 1800, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, trigger]);
  return count;
}

/* ─── Tilt card ──────────────────────────────────────────── */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
  }, []);

  const handleLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
  }, []);

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
}

/* ─── Section label ──────────────────────────────────────── */
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/5 mb-6">
      <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
      <span className="text-xs font-semibold uppercase tracking-widest text-yellow-400">{text}</span>
    </div>
  );
}

/* ─── Stats section ──────────────────────────────────────── */
function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const c1 = useCounter(1000, 1800, inView);
  const c2 = useCounter(98, 1400, inView);
  const c3 = useCounter(150, 1600, inView);
  const c4 = useCounter(5, 1000, inView);

  const stats = [
    { value: c1, suffix: "+", label: "Entreprises clientes" },
    { value: c2, suffix: "%", label: "Taux de satisfaction" },
    { value: c3, suffix: "+", label: "Projets livrés" },
    { value: c4, suffix: " ans", label: "D'expérience" },
  ];

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
      {stats.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.1, duration: 0.6 }}
          className="bg-background flex flex-col items-center justify-center py-12 px-6 text-center"
        >
          <div className="text-5xl font-bold stat-number mb-2">
            {s.value}{s.suffix}
          </div>
          <div className="text-sm text-muted-foreground uppercase tracking-wider font-medium">{s.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────── */
export default function Home() {
  const typewriterText = useTypewriter(PHRASES);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const navLinks = [
    { href: "#accueil", label: "Accueil" },
    { href: "#services", label: "Services" },
    { href: "#equipe", label: "Équipe" },
    { href: "#tarifs", label: "Tarifs" },
    { href: "#avis", label: "Avis" },
  ];

  const services = [
    { title: "Création de sites web", icon: Globe, desc: "Sites ultra-rapides, optimisés conversion et SEO. Du vitrine au e-commerce.", tag: "Web" },
    { title: "Applications mobiles", icon: Zap, desc: "Apps iOS & Android fluides et intuitives. Votre business dans chaque poche.", tag: "Mobile" },
    { title: "Automatisation digitale", icon: Target, desc: "Économisez des heures chaque semaine grâce à l'automatisation de vos process.", tag: "Automation" },
    { title: "Conseil stratégique", icon: TrendingUp, desc: "Audit digital gratuit et accompagnement sur-mesure pour votre croissance.", tag: "Stratégie" },
    { title: "Support 24h/24", icon: Shield, desc: "Équipe toujours disponible pour maintenir vos systèmes et répondre en urgence.", tag: "Support" },
  ];

  const team = [
    { img: teamImg1, name: "Thierno Daou Diallo", role: "CEO & Fondateur" },
    { img: teamImg2, name: "Boubacar Bah", role: "Développeur Web" },
    { img: teamImg3, name: "Ibrahima Souadou Barry", role: "Stratège Digitale" },
    { img: teamImg4, name: "Fatoumata Camara", role: "Designer UX/UI" },
    { img: teamImg5, name: "Ibrahima Sow", role: "Développeur Mobile" },
    { img: teamImg6, name: "Mariama Diallo", role: "Chargée de Clientèle" },
  ];

  const testimonials = [
    { quote: "Service rapide et efficace, j'ai gagné plus de clients en 3 mois qu'en 2 ans avant.", author: "Aliou Camara", role: "E-commerce, Conakry" },
    { quote: "L'automatisation qu'ils ont mise en place me fait gagner plus de 15h par semaine.", author: "Mariam Kouyaté", role: "Entrepreneur, Dakar" },
    { quote: "Très professionnel. Mon site convertit 3x plus qu'avant. Je recommande vivement.", author: "Ibrahim Bah", role: "Directeur PME, Abidjan" },
  ];

  const process = [
    { step: "01", title: "Contact rapide", desc: "Sur WhatsApp ou Calendly" },
    { step: "02", title: "Analyse", desc: "Compréhension de vos besoins" },
    { step: "03", title: "Création", desc: "Design & Développement" },
    { step: "04", title: "Livraison", desc: "Mise en ligne du projet" },
    { step: "05", title: "Suivi", desc: "Optimisation & Support continu" },
  ];

  const partners = ["E-commerce", "Restaurants", "Startups", "PME", "Agences", "Hôtels", "Cliniques", "Consultants", "ONG", "Immobilier"];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ── Scroll progress bar ── */}
      <motion.div className="scroll-progress" style={{ scaleX }} />

      {/* ── Background blobs ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="blob-1 absolute top-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full bg-yellow-500/5 blur-[120px]" />
        <div className="blob-2 absolute top-[40%] left-[-15%] w-[600px] h-[600px] rounded-full bg-blue-900/20 blur-[100px]" />
        <div className="blob-3 absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] rounded-full bg-yellow-500/5 blur-[100px]" />
      </div>

      {/* ── Navbar ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 px-6 md:px-12 flex justify-between items-center ${
          scrolled ? "glass border-b border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" : "bg-transparent"
        }`}
      >
        <a href="#accueil" className="flex items-center gap-3 group">
          <img src={logoImg} alt="BuzzMotion" className="h-9 w-auto object-contain transition-transform group-hover:scale-105 duration-300" />
          <span className="font-bold text-lg hidden sm:block" style={{ fontFamily: 'Syne, sans-serif' }}>BuzzMotion</span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="animated-underline hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <Button asChild className="bg-[#25D366] hover:bg-[#20bd5a] text-white border-none rounded-full px-6 shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] transition-all duration-300">
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            <SiWhatsapp className="mr-2 w-4 h-4" />
            WhatsApp
          </a>
        </Button>
      </motion.nav>

      {/* ── Hero ── */}
      <section id="accueil" className="relative min-h-[100dvh] pt-28 pb-20 flex items-center z-10">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

          {/* Left content */}
          <div className="flex flex-col gap-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionLabel text="Agence digitale internationale" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight"
            >
              Arrêtez de perdre des clients à cause d'un{" "}
              <span className="text-gold">
                {typewriterText}
                <span className="cursor-blink text-yellow-400">|</span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-xl leading-relaxed"
            >
              On crée des sites, apps et systèmes qui génèrent des clients automatiquement pour les entreprises ambitieuses du monde entier.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-full px-8 h-14 text-base shadow-[0_0_30px_rgba(37,211,102,0.35)] hover:shadow-[0_0_50px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-[1.02]"
              >
                <SiWhatsapp className="w-5 h-5" />
                Démarrer sur WhatsApp
              </a>
              <a
                href="https://calendly.com/buzzmotion/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/15 hover:border-yellow-500/50 text-white font-semibold rounded-full px-8 h-14 text-base hover:bg-yellow-500/5 transition-all duration-300"
              >
                <Calendar className="w-5 h-5" />
                Prendre rendez-vous
              </a>
              <a
                href="tel:+224660919148"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-medium rounded-full px-6 h-14 text-base transition-colors"
              >
                <Phone className="w-4 h-4" />
                +224 660 91 91 48
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex items-center gap-4 pt-4 border-t border-white/8"
            >
              <div className="flex -space-x-3">
                {[teamImg1, teamImg2, teamImg3, teamImg4, teamImg5].map((img, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-background overflow-hidden" style={{ zIndex: 5 - i }}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-sm text-muted-foreground"><span className="text-white font-semibold">+1000 entreprises</span> nous font confiance</p>
              </div>
            </motion.div>
          </div>

          {/* Right: 3D Robot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="h-[580px] w-full relative rounded-[32px] overflow-hidden border border-white/8 gold-glow"
            style={{ background: "radial-gradient(ellipse at 60% 40%, rgba(245,200,66,0.05) 0%, rgba(4,8,22,0.8) 70%)" }}
          >
            <Suspense
              fallback={
                <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-muted-foreground">
                  <div className="w-8 h-8 border-2 border-yellow-500/30 border-t-yellow-400 rounded-full animate-spin" />
                  <span className="text-sm">Chargement du robot 3D...</span>
                </div>
              }
            >
              <Spline
                scene="https://prod.spline.design/TUd3T7KoBnSoUhAf/scene.splinecode"
              />
            </Suspense>
            {/* Corner accent */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-yellow-500/40 rounded-tl-lg" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-yellow-500/40 rounded-br-lg" />
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <div className="relative z-10 border-y border-white/5">
        <StatsSection />
      </div>

      {/* ── Partners Marquee ── */}
      <div className="py-8 overflow-hidden border-b border-white/5 bg-white/[0.01] z-10 relative">
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-6 font-medium">Secteurs d'activité de nos clients</p>
        <div className="overflow-hidden">
          <div className="marquee-track">
            {[...partners, ...partners].map((p, i) => (
              <span key={i} className="mx-8 text-xl font-bold text-white/10 uppercase tracking-widest whitespace-nowrap">
                {p} <span className="text-yellow-500/30 mx-4">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Services ── */}
      <section id="services" className="py-28 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-20 max-w-2xl mx-auto"
          >
            <motion.div variants={fadeUp} custom={0}><SectionLabel text="Nos Services" /></motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-extrabold mb-5">
              Des solutions complètes pour <span className="text-gold">dominer votre marché</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-lg text-muted-foreground">
              De la vitrine au système automatisé — nous construisons tout ce dont vous avez besoin pour grandir.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard className="h-full">
                  <div className="shimmer-card h-full p-8 rounded-3xl bg-card border border-white/5 hover:border-yellow-500/30 transition-all duration-400 group cursor-default flex flex-col gap-5">
                    <div className="flex items-start justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 group-hover:bg-yellow-500/15 transition-colors">
                        <svc.icon className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full border border-white/10 text-muted-foreground uppercase tracking-wider">
                        {svc.tag}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-400 transition-colors">{svc.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{svc.desc}</p>
                    </div>
                    <div className="mt-auto pt-4 border-t border-white/5">
                      <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-yellow-400 font-medium hover:gap-3 transition-all">
                        En savoir plus <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}

            {/* CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="md:col-span-2 lg:col-span-1"
            >
              <div className="h-full p-8 rounded-3xl border border-yellow-500/30 bg-yellow-500/5 flex flex-col items-center justify-center text-center gap-6">
                <Award className="w-12 h-12 text-yellow-400" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">Audit gratuit</h3>
                  <p className="text-muted-foreground">Analyse de votre présence digitale en 5 minutes. Sans engagement.</p>
                </div>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-full px-8 h-12 text-sm shadow-[0_0_20px_rgba(37,211,102,0.3)] transition-all duration-300"
                >
                  <SiWhatsapp className="w-4 h-4" />
                  Demander l'audit
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Why us ── */}
      <section className="py-28 relative z-10 border-y border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <SectionLabel text="Pourquoi BuzzMotion" />
              <h2 className="text-4xl md:text-5xl font-extrabold mb-10">
                On ne fait pas que <span className="text-gold">livrer un site.</span><br />On construit votre croissance.
              </h2>
              <div className="space-y-7">
                {[
                  { title: "Gagnez du temps", desc: "Concentrez-vous sur votre cœur de métier, on gère le digital.", icon: Clock },
                  { title: "Automatisez vos tâches", desc: "Réduisez les erreurs, les coûts et le temps de traitement.", icon: Zap },
                  { title: "Augmentez vos ventes", desc: "Des outils conçus pour convertir les visiteurs en acheteurs.", icon: TrendingUp },
                  { title: "Support 24/7", desc: "Une équipe toujours disponible — weekends inclus.", icon: Shield },
                  { title: "Solutions sur mesure", desc: "Adaptées à votre secteur, votre budget, votre réalité.", icon: Target },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 shrink-0 group-hover:bg-yellow-500/20 transition-colors mt-0.5">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg mb-1">{item.title}</h4>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="relative rounded-[32px] overflow-hidden">
                <img src={brandImg2} alt="BuzzMotion Agency" className="w-full h-[560px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 glass p-5 rounded-2xl border border-yellow-500/20 shadow-2xl max-w-[240px]">
                <div className="flex gap-1 text-yellow-400 mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} className="fill-current w-4 h-4" />)}
                </div>
                <p className="font-bold text-sm text-white">Agence n°1 pour la croissance digitale en Afrique</p>
              </div>
              {/* Corner brand img */}
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-2xl overflow-hidden border border-white/10 shadow-2xl hidden lg:block">
                <img src={brandImg3} alt="" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-28 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div variants={fadeUp} custom={0}><SectionLabel text="Notre Processus" /></motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-extrabold mb-4">
              De l'idée à la réalité en <span className="text-gold">5 étapes</span>
            </motion.h2>
          </motion.div>

          <div className="relative">
            <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {process.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  className="relative flex flex-col items-center text-center z-10"
                >
                  <div className="w-16 h-16 rounded-full bg-background border-2 border-yellow-500/50 flex items-center justify-center text-lg font-extrabold text-yellow-400 mb-5 shadow-[0_0_20px_rgba(245,200,66,0.15)] hover:shadow-[0_0_30px_rgba(245,200,66,0.3)] transition-all">
                    {p.step}
                  </div>
                  <h4 className="text-lg font-bold mb-2">{p.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center mt-16"
          >
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-full px-10 h-14 text-base shadow-[0_0_30px_rgba(37,211,102,0.3)] hover:shadow-[0_0_50px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-[1.02]"
            >
              <SiWhatsapp className="w-5 h-5" />
              Lancer mon projet maintenant
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="tarifs" className="py-28 relative z-10 border-y border-white/5">
        <div className="absolute inset-0 bg-yellow-500/[0.02]" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} custom={0}><SectionLabel text="Tarification" /></motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-extrabold mb-4">
              Un tarif <span className="text-gold">honnête</span> et transparent
            </motion.h2>
          </motion.div>

          <TiltCard className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="shimmer-card bg-card rounded-[40px] border border-yellow-500/20 p-10 md:p-16 grid md:grid-cols-2 gap-12 items-center gold-glow"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-6">
                  Pack Croissance Digitale
                </div>
                <div className="text-6xl font-extrabold text-gold mb-1">100€</div>
                <p className="text-xl text-white font-semibold mb-2">Création unique</p>
                <p className="text-muted-foreground mb-8">Puis seulement <span className="text-yellow-400 font-bold">10€/mois</span> pour tout maintenir</p>

                <div className="space-y-4">
                  {[
                    "Serveurs ultra-rapides inclus",
                    "Maintenance mensuelle complète",
                    "Mises à jour de sécurité automatiques",
                    "Support prioritaire 24h/24",
                    "Audit mensuel de performance",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-yellow-400 shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-2xl h-16 text-lg shadow-[0_0_40px_rgba(37,211,102,0.4)] hover:shadow-[0_0_60px_rgba(37,211,102,0.6)] transition-all duration-300"
                >
                  <SiWhatsapp className="w-6 h-6" />
                  Réserver mon projet
                </a>
                <a
                  href="https://calendly.com/buzzmotion/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 border border-white/15 hover:border-yellow-500/40 text-white font-semibold rounded-2xl h-16 text-base hover:bg-yellow-500/5 transition-all duration-300"
                >
                  <Calendar className="w-5 h-5" />
                  Prendre rendez-vous
                </a>
                <p className="text-center text-sm text-muted-foreground mt-2">
                  Aucun engagement. Satisfaction garantie.
                </p>
              </div>
            </motion.div>
          </TiltCard>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="avis" className="py-28 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} custom={0}><SectionLabel text="Avis Clients" /></motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-extrabold mb-4">
              Ils nous ont <span className="text-gold">fait confiance</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-lg text-muted-foreground">
              Des résultats concrets pour de vraies entreprises.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <TiltCard className="h-full">
                  <div className="shimmer-card h-full bg-card border border-white/5 hover:border-yellow-500/20 p-8 rounded-3xl transition-all duration-300 flex flex-col gap-6">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                      </div>
                      <MessageSquare className="w-8 h-8 text-yellow-500/15" />
                    </div>
                    <p className="text-lg leading-relaxed text-white/90 flex-1">"{t.quote}"</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                      <div className="w-10 h-10 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center font-bold text-yellow-400">
                        {t.author.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-white">{t.author}</div>
                        <div className="text-xs text-muted-foreground">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-10 bg-card/50 rounded-3xl border border-white/5 max-w-xl mx-auto"
          >
            <p className="text-xl font-bold mb-2 text-white">Votre avis compte.</p>
            <p className="text-muted-foreground mb-6 text-sm">Partagez votre expérience avec BuzzMotion</p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/10 font-semibold rounded-full px-8 h-11 text-sm transition-all"
            >
              Laisser un avis
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Team ── */}
      <section id="equipe" className="py-28 relative z-10 border-y border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} custom={0}><SectionLabel text="Notre Équipe" /></motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-extrabold mb-4">
              Les experts derrière <span className="text-gold">vos succès</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group cursor-default"
              >
                <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-3 relative border border-white/5 group-hover:border-yellow-500/30 transition-colors duration-300">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover object-top grayscale-[30%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 text-xs font-medium text-yellow-400 border border-yellow-500/30 rounded-full py-1 px-3 bg-background/60 backdrop-blur-sm"
                    >
                      Contacter
                    </a>
                  </div>
                </div>
                <h4 className="font-bold text-sm text-white leading-tight">{member.name}</h4>
                <p className="text-xs text-yellow-400 font-medium mt-0.5">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-36 relative z-10 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-yellow-500/[0.03] to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SectionLabel text="Passez à l'action" />
            <h2 className="text-5xl md:text-7xl font-extrabold mb-8 max-w-4xl mx-auto leading-tight">
              Combien de clients perdez-vous{" "}
              <span className="text-gold">chaque jour ?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Chaque jour sans un bon digital est un client perdu au profit de vos concurrents. Agissez maintenant.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-full px-10 h-16 text-lg shadow-[0_0_40px_rgba(37,211,102,0.4)] hover:shadow-[0_0_60px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-[1.02]"
              >
                <SiWhatsapp className="w-6 h-6" />
                Écrire sur WhatsApp
              </a>
              <a
                href="https://calendly.com/buzzmotion/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/15 hover:border-yellow-500/40 text-white font-semibold rounded-full px-10 h-16 text-lg hover:bg-yellow-500/5 transition-all duration-300"
              >
                <Calendar className="w-5 h-5" />
                Réserver un appel
              </a>
              <a
                href="tel:+224660919148"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-white font-medium rounded-full px-8 h-16 text-base transition-colors"
              >
                <Phone className="w-5 h-5" />
                +224 660 91 91 48
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-card border-t border-white/5 pt-20 pb-8 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <img src={logoImg} alt="BuzzMotion" className="h-12 w-auto object-contain mb-4" />
              <p className="text-sm font-bold text-yellow-400 uppercase tracking-widest mb-3">DONNEZ VIE À VOS IDÉES</p>
              <p className="text-muted-foreground max-w-xs text-sm leading-relaxed mb-6">
                L'agence digitale qui construit les systèmes, sites et applications qui font grandir les entreprises ambitieuses.
              </p>
              <div className="flex gap-3">
                {[
                  { href: WHATSAPP_LINK, icon: SiWhatsapp },
                  { href: "https://www.linkedin.com/in/buzzmotion/", icon: null, lucide: Linkedin },
                  { href: "https://www.facebook.com/BuzzMotion", icon: SiFacebook },
                  { href: "https://x.com/BuzzMotion43493", icon: SiX },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-muted-foreground hover:text-yellow-400 hover:border-yellow-500/30 hover:bg-yellow-500/10 transition-all duration-200"
                  >
                    {s.lucide ? <s.lucide size={15} /> : s.icon && <s.icon size={15} />}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest text-white mb-5">Navigation</h4>
              <ul className="space-y-3">
                {["Accueil", "Services", "Équipe", "Tarifs", "Avis"].map((l) => (
                  <li key={l}>
                    <a href={`#${l.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")}`} className="text-sm text-muted-foreground hover:text-yellow-400 transition-colors animated-underline">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest text-white mb-5">Contact</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <a href="tel:+224660919148" className="hover:text-yellow-400 transition-colors flex items-center gap-2">
                    <Phone className="w-4 h-4" /> +224 660 91 91 48
                  </a>
                </li>
                <li>
                  <a href="mailto:BuzzMotion@proton.me" className="hover:text-yellow-400 transition-colors flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" /> BuzzMotion@proton.me
                  </a>
                </li>
                <li>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors flex items-center gap-2">
                    <SiWhatsapp size={14} /> WhatsApp direct
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <span>© 2026 BuzzMotion. Tous droits réservés.</span>
            <span>Solutions digitales modernes pour entreprises ambitieuses.</span>
          </div>
        </div>
      </footer>

      {/* ── Floating WhatsApp ── */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-pulse fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-[0_4px_24px_rgba(37,211,102,0.5)]"
        aria-label="WhatsApp"
      >
        <SiWhatsapp className="w-7 h-7" />
      </a>
    </div>
  );
}
