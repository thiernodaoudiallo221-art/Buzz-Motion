import { Suspense, lazy, useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useSpring, useInView, useTransform, AnimatePresence } from "framer-motion";

const Spline = lazy(() => import("@splinetool/react-spline"));

import { Phone, Calendar, CheckCircle2, Globe, Clock, Zap, Target, Star, Users, Shield, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import { SiWhatsapp, SiFacebook, SiX } from "react-icons/si";
import { Linkedin } from "lucide-react";

import logoImg      from "@assets/image-download_1776650003991.png";
import teamImg1     from "@assets/20260411_095142_1776650003993.jpg";
import teamImg2     from "@assets/WhatsApp_Image_2026-04-19_at_23.12.25_1776650003977.jpeg";
import teamImg3     from "@assets/WhatsApp_Image_2026-04-19_at_17.47.50_1776650003981.jpeg";
import teamImg4     from "@assets/WhatsApp_Image_2026-04-19_at_17.47.50_(1)_1776650003979.jpeg";
import teamImg5     from "@assets/WhatsApp_Image_2026-04-19_at_17.47.49_(2)_1776650003982.jpeg";
import teamImg6     from "@assets/WhatsApp_Image_2026-04-19_at_17.47.49_(1)_1776650003983.jpeg";
import brandImg     from "@assets/WhatsApp_Image_2026-04-19_at_17.47.46_1776650003990.jpeg";
import brandImg2    from "@assets/WhatsApp_Image_2026-04-19_at_17.47.46_(1)_1776650003988.jpeg";

const WA = "https://api.whatsapp.com/send/?phone=224660919148&text=Bonjour%20BuzzMotion%2C%20je%20veux%20créer%20un%20site%20ou%20une%20application.%20Pouvez-vous%20m'aider%20%3F";

/* ══════════════════════════════════════════
   PARTICLE CANVAS
══════════════════════════════════════════ */
function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    const pts: P[] = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.5 + 0.3,
      a: Math.random() * 0.5 + 0.1,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,200,55,${p.a})`;
        ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(255,200,55,${(1 - d / 90) * 0.12})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

/* ══════════════════════════════════════════
   3D WIREFRAME CUBE
══════════════════════════════════════════ */
function Cube3D({ size = 120, color = "rgba(255,200,55,0.3)", speed = 14 }: { size?: number; color?: string; speed?: number }) {
  const half = size / 2;
  const faces = [
    { transform: `translateZ(${half}px)` },
    { transform: `rotateY(180deg) translateZ(${half}px)` },
    { transform: `rotateY(90deg) translateZ(${half}px)` },
    { transform: `rotateY(-90deg) translateZ(${half}px)` },
    { transform: `rotateX(90deg) translateZ(${half}px)` },
    { transform: `rotateX(-90deg) translateZ(${half}px)` },
  ];
  return (
    <div style={{ perspective: 600, width: size, height: size }}>
      <motion.div
        style={{ width: size, height: size, position: "relative", transformStyle: "preserve-3d" }}
        animate={{ rotateY: 360, rotateX: [15, 30, 15] }}
        transition={{ rotateY: { duration: speed, ease: "linear", repeat: Infinity },
                      rotateX: { duration: speed * 0.7, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" } }}
      >
        {faces.map((f, i) => (
          <div key={i} style={{
            position: "absolute", inset: 0,
            border: `1px solid ${color}`,
            background: "rgba(255,200,55,0.02)",
            transform: f.transform,
          }} />
        ))}
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════
   FLOATING RING
══════════════════════════════════════════ */
function Ring({ size = 100, color = "rgba(255,200,55,0.25)" }: { size?: number; color?: string }) {
  return (
    <motion.div
      style={{
        width: size, height: size,
        borderRadius: "50%",
        border: `2px solid ${color}`,
        boxShadow: `inset 0 0 20px ${color}, 0 0 20px ${color}`,
      }}
      animate={{ rotateZ: 360, rotateX: [30, 60, 30] }}
      transition={{ rotateZ: { duration: 10, ease: "linear", repeat: Infinity },
                    rotateX: { duration: 7, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" } }}
    />
  );
}

/* ══════════════════════════════════════════
   ANIMATED COUNTER
══════════════════════════════════════════ */
function Counter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(ease * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ══════════════════════════════════════════
   TILT CARD
══════════════════════════════════════════ */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 12;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * -12;
    ref.current.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) scale3d(1.02,1.02,1.02)`;
  }, []);
  const onLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
  }, []);
  return (
    <div ref={ref} className={className} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ transition: "transform 0.15s ease", transformStyle: "preserve-3d" }}>
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════
   SCROLL PROGRESS
══════════════════════════════════════════ */
function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return <motion.div id="scroll-bar" style={{ scaleX, width: "100%" }} />;
}

/* ══════════════════════════════════════════
   WORD REVEAL ANIMATION
══════════════════════════════════════════ */
function WordReveal({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const words = text.split(" ");
  return (
    <span ref={ref} className={className} style={{ display: "inline" }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ delay: delay + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "inline-block", marginRight: "0.28em" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* ══════════════════════════════════════════
   MAIN
══════════════════════════════════════════ */
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 60));
  }, [scrollY]);

  const stagger = (i: number) => ({
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { delay: i * 0.09, duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  const services = [
    { icon: Globe,      title: "Sites web",              desc: "Rapides, beaux, optimisés pour vendre dès le premier clic." },
    { icon: Zap,        title: "Applications mobiles",   desc: "iOS & Android. Votre business dans chaque poche du monde." },
    { icon: Target,     title: "Automatisation",         desc: "Gagnez des heures. Vos process tournent sans vous." },
    { icon: TrendingUp, title: "Conseil stratégique",    desc: "Audit gratuit + accompagnement pour exploser votre croissance." },
    { icon: Shield,     title: "Support 24h/24",         desc: "Équipe toujours en ligne. Vos systèmes ne tombent jamais." },
    { icon: Users,      title: "Formation digitale",     desc: "On vous apprend à gérer, piloter et scaler vos outils." },
  ];

  const team = [
    { img: teamImg1, name: "Thierno Daou Diallo",    role: "CEO & Fondateur" },
    { img: teamImg2, name: "Boubacar Bah",            role: "Développeur Web" },
    { img: teamImg3, name: "Ibrahima Souadou Barry",  role: "Stratège Digitale" },
    { img: teamImg4, name: "Fatoumata Camara",        role: "Designer UX/UI" },
    { img: teamImg5, name: "Ibrahima Sow",            role: "Développeur Mobile" },
    { img: teamImg6, name: "Mariama Diallo",          role: "Chargée de Clientèle" },
  ];

  const testimonials = [
    { q: "En 3 mois j'ai doublé mes clients grâce à leur site.", name: "Aliou Camara",    role: "E-commerce, Conakry" },
    { q: "L'automatisation me fait gagner 15 heures par semaine.", name: "Mariam Kouyaté", role: "CEO, Dakar" },
    { q: "Professionnels, rapides. Mon meilleur investissement.", name: "Ibrahim Bah",     role: "Directeur PME" },
  ];

  return (
    <div style={{ fontFamily: "'Space Grotesk', Inter, sans-serif" }}
      className="min-h-screen bg-background text-foreground overflow-x-hidden">

      <ScrollBar />

      {/* ─── NAVBAR ─────────────────────────────── */}
      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-14 flex items-center justify-between transition-all duration-500 ${scrolled ? "nav-glass" : ""}`}
      >
        <a href="#accueil" className="flex items-center gap-3">
          <motion.img whileHover={{ scale: 1.05 }} src={logoImg} alt="BuzzMotion" className="h-10 w-auto" />
          <span className="font-bold text-lg hidden sm:block tracking-tight">BuzzMotion</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          {["accueil","services","equipe","tarifs","avis"].map((id) => (
            <a key={id} href={`#${id}`}
              className="relative hover:text-white transition-colors duration-200 capitalize after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1px] after:bg-yellow-400 hover:after:w-full after:transition-all after:duration-300">
              {id === "equipe" ? "Équipe" : id === "tarifs" ? "Tarifs" : id === "avis" ? "Avis" : id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
        </div>
        <motion.a
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
          href={WA} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1fba5a] text-white font-semibold rounded-full px-6 py-2.5 text-sm shadow-[0_0_20px_rgba(37,211,102,0.35)] transition-colors"
        >
          <SiWhatsapp className="w-4 h-4" /> WhatsApp
        </motion.a>
      </motion.nav>

      {/* ─── HERO ────────────────────────────────── */}
      <section id="accueil" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
        {/* Particle canvas */}
        <div className="absolute inset-0 z-0"><Particles /></div>

        {/* Background glow blobs */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div animate={{ scale: [1,1.08,1], opacity: [0.06,0.1,0.06] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(255,200,55,0.12) 0%, transparent 70%)" }} />
          <motion.div animate={{ scale: [1,1.12,1], opacity: [0.05,0.09,0.05] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(100,150,255,0.08) 0%, transparent 70%)" }} />
        </div>

        {/* Floating 3D shapes */}
        <div className="absolute top-24 left-8 md:left-20 z-10 opacity-70">
          <motion.div className="shape-float-a">
            <Cube3D size={80} speed={16} />
          </motion.div>
        </div>
        <div className="absolute bottom-28 left-12 md:left-32 z-10 opacity-50">
          <motion.div className="shape-float-c">
            <Ring size={60} />
          </motion.div>
        </div>
        <div className="absolute top-32 right-8 md:right-20 z-10 opacity-70">
          <motion.div className="shape-float-b">
            <Ring size={90} color="rgba(255,200,55,0.2)" />
          </motion.div>
        </div>
        <div className="absolute bottom-32 right-12 md:right-28 z-10 opacity-60">
          <motion.div className="shape-float-a" style={{ animationDelay: "3s" }}>
            <Cube3D size={60} speed={20} color="rgba(255,200,55,0.2)" />
          </motion.div>
        </div>

        {/* CENTER CONTENT */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/8 mb-8"
          >
            <motion.span animate={{ rotate: [0,15,-15,0] }} transition={{ duration: 3, repeat: Infinity }}>
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            </motion.span>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-yellow-400">Agence digitale internationale</span>
          </motion.div>

          {/* SHORT TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-bold leading-none tracking-tight mb-6"
            style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)", letterSpacing: "-0.03em" }}
          >
            On construit{" "}
            <motion.span
              className="text-gold"
              animate={{ filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              ce qui vend.
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10"
          >
            Sites web, applications mobiles et automatisations qui génèrent des clients automatiquement — pour les entreprises qui veulent dominer.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-14"
          >
            <motion.a whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(37,211,102,0.5)" }} whileTap={{ scale: 0.97 }}
              href={WA} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-[#25D366] text-white font-bold rounded-full px-10 h-14 text-base shadow-[0_0_35px_rgba(37,211,102,0.4)] transition-all"
            >
              <SiWhatsapp className="w-5 h-5" /> Démarrer maintenant
            </motion.a>
            <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              href="https://calendly.com/buzzmotion/30min" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 border border-white/15 hover:border-yellow-500/40 text-white font-semibold rounded-full px-10 h-14 text-base hover:bg-yellow-500/5 transition-all"
            >
              <Calendar className="w-5 h-5" /> Prendre rendez-vous
            </motion.a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="flex items-center gap-5 flex-wrap justify-center"
          >
            <div className="flex -space-x-3">
              {[teamImg1, teamImg2, teamImg3, teamImg4, teamImg5].map((img, i) => (
                <div key={i} className="w-9 h-9 rounded-full border-2 border-background overflow-hidden" style={{ zIndex: 5 - i }}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">
                <span className="text-white font-semibold">+1000 entreprises</span> nous font confiance
              </p>
            </div>
            <div className="w-px h-10 bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4 text-yellow-400" />
              <a href="tel:+224660919148" className="hover:text-white transition-colors">+224 660 91 91 48</a>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Découvrir</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 bg-yellow-400 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── STATS ──────────────────────────────── */}
      <section className="border-y border-white/5 bg-white/[0.01]">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/5">
          {[
            { n: 1000, s: "+", label: "Entreprises clientes" },
            { n: 98,   s: "%", label: "Taux de satisfaction" },
            { n: 150,  s: "+", label: "Projets livrés" },
            { n: 5,    s: " ans", label: "D'expérience" },
          ].map((st, i) => (
            <motion.div key={i} {...stagger(i)} className="flex flex-col items-center justify-center py-14 px-4 text-center">
              <div className="text-5xl md:text-6xl font-bold text-gold leading-none mb-2">
                <Counter target={st.n} suffix={st.s} />
              </div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground font-medium">{st.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── ROBOT 3D ───────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,200,55,0.04) 0%, transparent 70%)" }} />
        </div>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <WordReveal text="Votre robot digital vous attend." className="text-4xl md:text-5xl font-bold" />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl mx-auto rounded-[32px] overflow-hidden border border-yellow-500/15 relative"
            style={{ height: 500, background: "radial-gradient(ellipse at 60% 40%, rgba(255,200,55,0.06) 0%, rgba(3,6,18,0.9) 70%)" }}
          >
            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-yellow-500/40 rounded-tl-xl z-10" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-yellow-500/40 rounded-tr-xl z-10" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-yellow-500/40 rounded-bl-xl z-10" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-yellow-500/40 rounded-br-xl z-10" />
            <Suspense fallback={
              <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-muted-foreground">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-10 h-10 border-2 border-yellow-500/20 border-t-yellow-400 rounded-full" />
                <span className="text-sm">Chargement du robot 3D...</span>
              </div>
            }>
              <Spline scene="https://prod.spline.design/TUd3T7KoBnSoUhAf/scene.splinecode" />
            </Suspense>
          </motion.div>
        </div>
      </section>

      {/* ─── MARQUEE ────────────────────────────── */}
      <div className="py-6 border-y border-white/5 overflow-hidden bg-white/[0.01]">
        <div className="marquee-inner">
          {["E-commerce","Restaurants","Startups","PME","Agences","Hôtels","Cliniques","Consultants","ONG","Immobilier",
            "E-commerce","Restaurants","Startups","PME","Agences","Hôtels","Cliniques","Consultants","ONG","Immobilier"].map((p, i) => (
            <span key={i} className="mx-10 text-lg font-semibold uppercase tracking-[0.2em] text-white/10 whitespace-nowrap">
              {p} <span className="text-yellow-500/20 mx-4">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── SERVICES ───────────────────────────── */}
      <section id="services" className="py-28">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.p {...stagger(0)} className="text-xs uppercase tracking-[0.2em] text-yellow-400 font-semibold mb-4">Services</motion.p>
            <WordReveal text="Tout ce dont vous avez besoin." className="text-4xl md:text-5xl font-bold" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((svc, i) => (
              <motion.div key={i} {...stagger(i)}>
                <TiltCard className="h-full">
                  <div className="glow-card h-full p-8 rounded-2xl border border-white/6 bg-card group cursor-default">
                    <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-6 group-hover:bg-yellow-500/15 transition-colors">
                      <svc.icon className="w-6 h-6 text-yellow-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-400 transition-colors">{svc.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{svc.desc}</p>
                    <div className="mt-6 pt-4 border-t border-white/5">
                      <a href={WA} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-yellow-400/70 hover:text-yellow-400 font-medium transition-all group/link">
                        En savoir plus
                        <ArrowRight className="w-3.5 h-3.5 translate-x-0 group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY US ─────────────────────────────── */}
      <section className="py-28 border-y border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden aspect-[4/3] relative">
                <img src={brandImg} alt="BuzzMotion" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-tr from-background/60 via-transparent to-transparent" />
              </div>
              {/* Floating card */}
              <motion.div
                animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-4 md:-right-8 p-5 rounded-2xl border border-yellow-500/20 bg-card/90 backdrop-blur-sm shadow-2xl"
              >
                <div className="flex gap-0.5 mb-1.5">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="font-bold text-sm text-white max-w-[180px] leading-snug">Agence n°1 pour votre croissance digitale</p>
              </motion.div>
              {/* Second floating element */}
              <motion.div
                animate={{ y: [0, 6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-4 -left-4 md:-left-8 p-4 rounded-2xl border border-white/10 bg-card/90 backdrop-blur-sm shadow-xl"
              >
                <div className="text-3xl font-bold text-gold">98%</div>
                <p className="text-xs text-muted-foreground mt-0.5">Clients satisfaits</p>
              </motion.div>
            </motion.div>

            {/* Right: list */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-yellow-400 font-semibold mb-4">Pourquoi nous</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-10 leading-tight">
                Plus qu'une agence.<br /><span className="text-gold">Un partenaire.</span>
              </h2>
              <div className="space-y-6">
                {[
                  { i: Clock,      t: "Gagnez du temps",           d: "Concentrez-vous sur votre cœur de métier." },
                  { i: Zap,        t: "Automatisez tout",           d: "Réduisez les coûts et les erreurs humaines." },
                  { i: TrendingUp, t: "Augmentez vos ventes",       d: "Des systèmes conçus pour convertir." },
                  { i: Shield,     t: "Support 24/7",               d: "On ne vous lâche jamais, même le dimanche." },
                  { i: Target,     t: "Sur mesure",                 d: "Adapté à votre secteur et votre budget." },
                ].map((item, i) => (
                  <motion.div key={i} {...stagger(i)} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/15 flex items-center justify-center shrink-0 group-hover:bg-yellow-500/20 transition-colors">
                      <item.i className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-0.5">{item.t}</h4>
                      <p className="text-sm text-muted-foreground">{item.d}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── PROCESS ────────────────────────────── */}
      <section className="py-28">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.p {...stagger(0)} className="text-xs uppercase tracking-[0.2em] text-yellow-400 font-semibold mb-4">Processus</motion.p>
            <WordReveal text="De l'idée au résultat en 5 étapes." className="text-4xl md:text-5xl font-bold" />
          </div>

          <div className="relative grid md:grid-cols-5 gap-6">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-8 left-16 right-16 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,200,55,0.2), rgba(255,200,55,0.4), rgba(255,200,55,0.2), transparent)" }} />

            {[
              { n: "01", t: "Contact rapide",  d: "WhatsApp ou Calendly" },
              { n: "02", t: "Analyse",         d: "Vos besoins en détail" },
              { n: "03", t: "Création",        d: "Design + développement" },
              { n: "04", t: "Livraison",       d: "Mise en ligne du projet" },
              { n: "05", t: "Suivi",           d: "Optimisation continue" },
            ].map((step, i) => (
              <motion.div key={i} {...stagger(i)} className="flex flex-col items-center text-center relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(255,200,55,0.3)" }}
                  className="w-16 h-16 rounded-full border-2 border-yellow-500/50 bg-background flex items-center justify-center text-lg font-bold text-yellow-400 mb-4 cursor-default transition-all"
                >
                  {step.n}
                </motion.div>
                <h4 className="font-bold text-base mb-1">{step.t}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.d}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.5 }}
            className="text-center mt-14"
          >
            <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              href={WA} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#25D366] text-white font-bold rounded-full px-10 h-14 text-base shadow-[0_0_35px_rgba(37,211,102,0.35)] transition-all"
            >
              <SiWhatsapp className="w-5 h-5" /> Lancer mon projet
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ─── PRICING ────────────────────────────── */}
      <section id="tarifs" className="py-28 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,200,55,0.04) 0%, transparent 70%)" }} />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <motion.p {...stagger(0)} className="text-xs uppercase tracking-[0.2em] text-yellow-400 font-semibold mb-4">Tarifs</motion.p>
            <WordReveal text="Simple, honnête, accessible." className="text-4xl md:text-5xl font-bold" />
          </div>

          <TiltCard className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="bg-card border border-yellow-500/20 rounded-3xl p-10 md:p-16 grid md:grid-cols-2 gap-12 items-center"
              style={{ boxShadow: "0 0 0 1px rgba(255,200,55,0.1), 0 40px 80px rgba(0,0,0,0.4)" }}
            >
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-yellow-500/25 bg-yellow-500/8 text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-6">
                  Pack Croissance Digitale
                </div>
                <div className="text-7xl font-bold text-gold mb-1">100€</div>
                <p className="text-muted-foreground mb-1">Création unique</p>
                <p className="text-lg font-semibold text-white mb-8">Puis <span className="text-yellow-400">10€/mois</span> seulement</p>
                <div className="space-y-3">
                  {["Serveurs ultra-rapides inclus","Maintenance complète","Mises à jour de sécurité","Support prioritaire 24h/24","Audit mensuel de performance"].map((it, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
                      <span className="text-muted-foreground">{it}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  href={WA} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-[#25D366] text-white font-bold rounded-2xl h-16 text-lg shadow-[0_0_40px_rgba(37,211,102,0.4)] transition-all"
                >
                  <SiWhatsapp className="w-6 h-6" /> Réserver maintenant
                </motion.a>
                <a href="https://calendly.com/buzzmotion/30min" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 border border-white/12 hover:border-yellow-500/30 text-white font-semibold rounded-2xl h-16 text-base hover:bg-yellow-500/4 transition-all">
                  <Calendar className="w-5 h-5" /> Planifier un appel
                </a>
                <p className="text-center text-xs text-muted-foreground">Aucun engagement. Annulable à tout moment.</p>
              </div>
            </motion.div>
          </TiltCard>
        </div>
      </section>

      {/* ─── TESTIMONIALS ───────────────────────── */}
      <section id="avis" className="py-28">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <motion.p {...stagger(0)} className="text-xs uppercase tracking-[0.2em] text-yellow-400 font-semibold mb-4">Témoignages</motion.p>
            <WordReveal text="Ils ont fait confiance. Ils ont gagné." className="text-4xl md:text-5xl font-bold" />
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {testimonials.map((t, i) => (
              <motion.div key={i} {...stagger(i)}>
                <TiltCard className="h-full">
                  <div className="glow-card h-full p-8 rounded-2xl border border-white/6 bg-card flex flex-col gap-5">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <p className="text-base leading-relaxed text-white/85 flex-1">"{t.q}"</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                      <div className="w-10 h-10 rounded-full bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 text-sm">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-white">{t.name}</div>
                        <div className="text-xs text-muted-foreground">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          <motion.div {...stagger(3)} className="text-center py-8 border border-white/6 rounded-2xl bg-card max-w-md mx-auto">
            <p className="font-bold text-lg text-white mb-1">Votre avis compte.</p>
            <p className="text-sm text-muted-foreground mb-5">Partagez votre expérience</p>
            <motion.a whileHover={{ scale: 1.04 }} href={WA} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-yellow-500/35 text-yellow-400 hover:bg-yellow-500/8 font-semibold rounded-full px-8 h-11 text-sm transition-all">
              Laisser un avis
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ─── TEAM ───────────────────────────────── */}
      <section id="equipe" className="py-28 border-y border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <motion.p {...stagger(0)} className="text-xs uppercase tracking-[0.2em] text-yellow-400 font-semibold mb-4">Équipe</motion.p>
            <WordReveal text="Les experts derrière vos succès." className="text-4xl md:text-5xl font-bold" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {team.map((member, i) => (
              <motion.div key={i} {...stagger(i)} className="group">
                <div className="relative rounded-2xl overflow-hidden mb-3 border border-white/5 group-hover:border-yellow-500/25 transition-colors duration-300" style={{ aspectRatio: "3/4" }}>
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover object-top grayscale-[25%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    className="absolute bottom-3 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <a href={WA} target="_blank" rel="noopener noreferrer"
                      className="text-xs font-medium text-yellow-400 border border-yellow-500/30 rounded-full py-1 px-3 bg-background/70 backdrop-blur-sm">
                      Contacter
                    </a>
                  </motion.div>
                </div>
                <h4 className="font-semibold text-sm text-white leading-tight">{member.name}</h4>
                <p className="text-xs text-yellow-400 font-medium mt-0.5">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ──────────────────────────── */}
      <section className="py-36 relative overflow-hidden text-center">
        {/* Particle canvas local */}
        <div className="absolute inset-0"><Particles /></div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,200,55,0.06) 0%, transparent 70%)" }} />

        {/* Floating shapes */}
        <div className="absolute top-12 left-12 opacity-40 shape-float-a"><Ring size={80} /></div>
        <div className="absolute bottom-12 right-12 opacity-40 shape-float-b"><Cube3D size={70} speed={18} /></div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-yellow-400 font-semibold mb-6">Passez à l'action</p>
            <h2 className="font-bold mb-6 leading-tight" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
              Chaque jour sans digital<br />
              <span className="text-gold">= clients perdus.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
              Contactez-nous maintenant. En moins de 24h, vous avez un plan d'action concret.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                href={WA} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2.5 bg-[#25D366] text-white font-bold rounded-full px-12 h-16 text-lg shadow-[0_0_50px_rgba(37,211,102,0.45)] transition-all">
                <SiWhatsapp className="w-6 h-6" /> Écrire sur WhatsApp
              </motion.a>
              <motion.a whileHover={{ scale: 1.03 }} href="https://calendly.com/buzzmotion/30min" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2.5 border border-white/15 hover:border-yellow-500/35 text-white font-semibold rounded-full px-12 h-16 text-lg hover:bg-yellow-500/5 transition-all">
                <Calendar className="w-5 h-5" /> Réserver un appel
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─────────────────────────────── */}
      <footer className="bg-card border-t border-white/6 pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <img src={logoImg} alt="BuzzMotion" className="h-11 w-auto mb-4" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-yellow-400 mb-3">Donnez vie à vos idées</p>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed mb-6">
                L'agence qui construit les outils digitaux des entreprises ambitieuses du monde entier.
              </p>
              <div className="flex gap-2.5">
                {[
                  { h: WA, Icon: SiWhatsapp },
                  { h: "https://www.linkedin.com/in/buzzmotion/", Icon: null, L: Linkedin },
                  { h: "https://www.facebook.com/BuzzMotion", Icon: SiFacebook },
                  { h: "https://x.com/BuzzMotion43493", Icon: SiX },
                ].map((s, i) => (
                  <motion.a key={i} whileHover={{ scale: 1.1, color: "#FFC837" }} href={s.h} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl border border-white/8 bg-white/3 flex items-center justify-center text-muted-foreground hover:border-yellow-500/30 hover:bg-yellow-500/8 transition-all">
                    {s.L ? <s.L size={14} /> : s.Icon && <s.Icon size={14} />}
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-white mb-4">Navigation</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {["Accueil","Services","Équipe","Tarifs","Avis"].map((l) => (
                  <li key={l}><a href={`#${l.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")}`} className="hover:text-yellow-400 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-white mb-4">Contact</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li><a href="tel:+224660919148" className="hover:text-yellow-400 transition-colors">+224 660 91 91 48</a></li>
                <li><a href="mailto:BuzzMotion@proton.me" className="hover:text-yellow-400 transition-colors">BuzzMotion@proton.me</a></li>
                <li><a href={WA} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">WhatsApp direct</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
            <span>© 2026 BuzzMotion. Tous droits réservés.</span>
            <span>Solutions digitales modernes.</span>
          </div>
        </div>
      </footer>

      {/* ─── FLOATING WHATSAPP ──────────────────── */}
      <motion.a
        href={WA} target="_blank" rel="noopener noreferrer"
        className="wa-btn fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.5)]"
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
        aria-label="WhatsApp"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      >
        <SiWhatsapp className="w-7 h-7" />
      </motion.a>
    </div>
  );
}
