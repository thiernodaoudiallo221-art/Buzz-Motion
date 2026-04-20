import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
const Spline = lazy(() => import("@splinetool/react-spline"));
import { Phone, Calendar, ArrowRight, CheckCircle2, Globe, Clock, Zap, Target, Star, Users, MessageSquare, Linkedin } from "lucide-react";
import { SiWhatsapp, SiFacebook, SiX } from "react-icons/si";

import logoImg from "@assets/image-download_1776650003991.png";
import teamImg1 from "@assets/20260411_095142_1776650003993.jpg";
import teamImg2 from "@assets/WhatsApp_Image_2026-04-19_at_23.12.25_1776650003977.jpeg";
import teamImg3 from "@assets/WhatsApp_Image_2026-04-19_at_17.47.50_1776650003981.jpeg";
import teamImg4 from "@assets/WhatsApp_Image_2026-04-19_at_17.47.50_(1)_1776650003979.jpeg";
import teamImg5 from "@assets/WhatsApp_Image_2026-04-19_at_17.47.49_(2)_1776650003982.jpeg";
import teamImg6 from "@assets/WhatsApp_Image_2026-04-19_at_17.47.49_(1)_1776650003983.jpeg";
import brandImg1 from "@assets/WhatsApp_Image_2026-04-19_at_17.47.49_1776650003986.jpeg";
import brandImg2 from "@assets/WhatsApp_Image_2026-04-19_at_17.47.46_1776650003990.jpeg";
import brandImg3 from "@assets/WhatsApp_Image_2026-04-19_at_17.47.46_(1)_1776650003988.jpeg";

import { Button } from "@/components/ui/button";

const WHATSAPP_LINK = "https://api.whatsapp.com/send/?phone=224660919148&text=Bonjour%20BuzzMotion%2C%20je%20veux%20créer%20un%20site%20ou%20une%20application.%20Pouvez-vous%20m'aider%20%3F";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src={logoImg} alt="BuzzMotion Logo" className="h-10 w-auto object-contain" />
          <span className="font-bold text-xl hidden sm:block tracking-tight">BuzzMotion</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#accueil" className="hover:text-primary transition-colors">Accueil</a>
          <a href="#services" className="hover:text-primary transition-colors">Services</a>
          <a href="#equipe" className="hover:text-primary transition-colors">Équipe</a>
          <a href="#tarifs" className="hover:text-primary transition-colors">Tarifs</a>
          <a href="#avis" className="hover:text-primary transition-colors">Avis</a>
        </div>
        <Button asChild className="bg-[#25D366] hover:bg-[#20bd5a] text-white border-none rounded-full shadow-[0_0_20px_rgba(37,211,102,0.3)]">
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            <SiWhatsapp className="mr-2" />
            Contact
          </a>
        </Button>
      </nav>

      {/* Hero Section */}
      <section id="accueil" className="relative min-h-[100dvh] pt-32 pb-20 flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background to-background z-10" />
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        </div>
        
        <div className="container mx-auto px-6 relative z-20 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 w-fit">
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">DONNEZ VIE À VOS IDÉES</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight">
              Arrêtez de perdre des clients à cause d'un <span className="text-gradient">mauvais digital.</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
              On crée des sites, apps et systèmes qui génèrent des clients automatiquement pour les entreprises ambitieuses.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-4">
              <Button size="lg" asChild className="bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full text-base h-14 px-8 shadow-[0_0_30px_rgba(37,211,102,0.4)]">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  <SiWhatsapp className="mr-2 h-5 w-5" />
                  Démarrer sur WhatsApp
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full text-base h-14 px-8 border-white/20 hover:bg-white/5">
                <a href="https://calendly.com/buzzmotion/30min" target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 h-5 w-5" />
                  Prendre rendez-vous
                </a>
              </Button>
              <Button size="lg" variant="ghost" asChild className="rounded-full text-base h-14 px-8 text-muted-foreground hover:text-foreground">
                <a href="tel:+224660919148">
                  <Phone className="mr-2 h-5 w-5" />
                  +224 660 91 91 48
                </a>
              </Button>
            </div>
            
            <div className="flex items-center gap-4 mt-8 pt-8 border-t border-white/10">
              <div className="flex -space-x-3">
                {[teamImg1, teamImg2, teamImg3, teamImg4].map((img, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-background overflow-hidden relative z-[4-i]">
                    <img src={img} alt="Team" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium">
                <span className="text-white">+1000 entreprises</span> nous font confiance dans le monde
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-[600px] w-full relative rounded-3xl overflow-hidden border border-white/10 bg-card/50 backdrop-blur-sm"
          >
            <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-muted-foreground">Chargement du robot...</div>}>
              <Spline
                scene="https://prod.spline.design/TUd3T7KoBnSoUhAf/scene.splinecode"
                className="absolute inset-0 w-full h-full"
              />
            </Suspense>
          </motion.div>
        </div>
      </section>

      {/* Partners Marquee */}
      <div className="py-10 border-y border-white/5 bg-white/[0.02] flex overflow-hidden whitespace-nowrap">
        <div className="animate-[marquee_30s_linear_infinite] flex gap-16 items-center">
          {["E-commerce", "Restaurants", "Startups", "PME", "Agences", "Hôtels", "Cliniques", "Consultants"].map((partner, i) => (
            <span key={i} className="text-2xl font-bold text-white/20 uppercase tracking-widest">{partner}</span>
          ))}
          {["E-commerce", "Restaurants", "Startups", "PME", "Agences", "Hôtels", "Cliniques", "Consultants"].map((partner, i) => (
            <span key={`dup-${i}`} className="text-2xl font-bold text-white/20 uppercase tracking-widest">{partner}</span>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Nos Services</h2>
            <p className="text-lg text-muted-foreground">Des solutions complètes pour transformer votre présence en ligne en machine à clients.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Création de sites web", icon: Globe, desc: "Des sites ultra-rapides, optimisés pour la conversion et le SEO." },
              { title: "Applications mobiles", icon: Zap, desc: "Applications iOS et Android fluides et intuitives." },
              { title: "Automatisation digitale", icon: Target, desc: "Gain de temps massif grâce à l'automatisation de vos process." },
              { title: "Conseil stratégique", icon: Users, desc: "Un accompagnement sur-mesure (gratuit pour nos clients)." },
              { title: "Support 24h/24", icon: Clock, desc: "Une équipe toujours disponible pour maintenir vos systèmes." }
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-8 rounded-3xl bg-card border border-white/5 hover:border-primary/50 transition-colors ${i >= 3 ? 'md:col-span-1.5' : ''}`}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                  <service.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-24 relative bg-card/50 border-y border-white/5 overflow-hidden">
        <div className="absolute right-0 bottom-0 w-1/3 h-full opacity-20 pointer-events-none">
          <img src={brandImg1} alt="Brand" className="w-full h-full object-cover mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Pourquoi nous choisir ?</h2>
              <div className="space-y-6">
                {[
                  { title: "Gagnez du temps", desc: "Concentrez-vous sur votre cœur de métier." },
                  { title: "Automatisez vos tâches", desc: "Réduisez les erreurs et les coûts." },
                  { title: "Augmentez vos ventes", desc: "Des outils conçus pour convertir." },
                  { title: "Support 24/7", desc: "On ne vous lâche jamais." },
                  { title: "Solutions sur mesure", desc: "Adaptées à votre réalité." }
                ].map((adv, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="mt-1 bg-primary/20 p-1 rounded-full text-primary">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">{adv.title}</h4>
                      <p className="text-muted-foreground">{adv.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src={brandImg2} alt="Agency" className="rounded-3xl border border-white/10 shadow-2xl" />
              <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-2xl border border-white/10 shadow-xl max-w-[250px]">
                <div className="flex gap-2 text-primary mb-2">
                  <Star className="fill-current w-5 h-5" /><Star className="fill-current w-5 h-5" /><Star className="fill-current w-5 h-5" /><Star className="fill-current w-5 h-5" /><Star className="fill-current w-5 h-5" />
                </div>
                <p className="font-bold">L'agence n°1 pour la croissance digitale.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Notre Processus</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">De l'idée à la réalité en 5 étapes simples.</p>
          </div>
          
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 -translate-y-1/2" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {[
                { step: "01", title: "Contact rapide", desc: "Sur WhatsApp ou Calendly" },
                { step: "02", title: "Analyse", desc: "Compréhension de vos besoins" },
                { step: "03", title: "Création", desc: "Design & Développement" },
                { step: "04", title: "Livraison", desc: "Mise en ligne du projet" },
                { step: "05", title: "Suivi", desc: "Optimisation & Support" }
              ].map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative z-10 flex flex-col items-center text-center bg-background md:bg-transparent py-4"
                >
                  <div className="w-16 h-16 rounded-full bg-card border-2 border-primary flex items-center justify-center text-xl font-bold text-primary mb-6 shadow-[0_0_15px_rgba(230,185,61,0.2)]">
                    {step.step}
                  </div>
                  <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="tarifs" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto bg-card rounded-[40px] border border-white/10 p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold mb-6">
                TARIF UNIQUE & TRANSPARENT
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Pack Croissance</h2>
              <div className="text-5xl font-black text-white mb-2">à partir de 100€</div>
              <p className="text-xl text-primary font-medium mb-8">Puis 10€/mois</p>
              
              <div className="space-y-4 text-left">
                {["Serveurs ultra-rapides", "Maintenance complète", "Mises à jour de sécurité", "Support prioritaire"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-lg text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="w-full md:w-auto">
              <Button size="lg" asChild className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full text-lg h-16 px-10 shadow-[0_0_30px_rgba(37,211,102,0.4)]">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  <SiWhatsapp className="mr-3 h-6 w-6" />
                  Réserver mon projet
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="avis" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ils nous font confiance</h2>
            <p className="text-lg text-muted-foreground">Des résultats concrets pour de vraies entreprises.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { quote: "Service rapide et efficace, j'ai gagné plus de clients.", author: "Client satisfait", role: "E-commerce" },
              { quote: "Automatisation parfaite, je gagne du temps chaque jour.", author: "Entrepreneur", role: "Startup" },
              { quote: "Très professionnel, je recommande vivement leurs services.", author: "Directeur", role: "PME" }
            ].map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-white/5 p-8 rounded-3xl relative"
              >
                <MessageSquare className="w-10 h-10 text-primary/20 absolute top-8 right-8" />
                <div className="flex gap-1 text-primary mb-6">
                  <Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" />
                </div>
                <p className="text-lg font-medium leading-relaxed mb-8">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold">{t.author}</div>
                    <div className="text-sm text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center p-8 bg-card/50 rounded-3xl border border-white/10 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Votre avis compte.</h3>
            <Button variant="outline" asChild className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                Laisser un avis
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="equipe" className="py-24 bg-card/30 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">L'Équipe BuzzMotion</h2>
            <p className="text-lg text-muted-foreground">Les experts derrière vos succès digitaux.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { img: teamImg1, name: "Thierno Daou Diallo", role: "CEO & Fondateur" },
              { img: teamImg2, name: "Boubacar Bah", role: "Développeur Web" },
              { img: teamImg3, name: "Ibrahima Souadou Barry", role: "Stratège Digitale" },
              { img: teamImg4, name: "Fatoumata Camara", role: "Designer UX/UI" },
              { img: teamImg5, name: "Ibrahima Sow", role: "Développeur Mobile" },
              { img: teamImg6, name: "Mariama Diallo", role: "Chargée de Clientèle" }
            ].map((member, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-4 relative">
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay" />
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
                </div>
                <h4 className="font-bold text-lg">{member.name}</h4>
                <p className="text-sm text-primary">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-primary/10" />
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 max-w-4xl mx-auto leading-tight">
            Combien de clients perdez-vous <span className="text-gradient">chaque jour ?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Il est temps de passer à la vitesse supérieure. Contactez-nous dès maintenant et transformons votre vision en réalité.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button size="lg" asChild className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full text-base h-14 px-8">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <SiWhatsapp className="mr-2 h-5 w-5" />
                WhatsApp
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto rounded-full text-base h-14 px-8 border-white/20 hover:bg-white/5">
              <a href="https://calendly.com/buzzmotion/30min" target="_blank" rel="noopener noreferrer">
                <Calendar className="mr-2 h-5 w-5" />
                Prendre rendez-vous
              </a>
            </Button>
            <Button size="lg" variant="ghost" asChild className="w-full sm:w-auto rounded-full text-base h-14 px-8 text-muted-foreground hover:text-foreground">
              <a href="tel:+224660919148">
                <Phone className="mr-2 h-5 w-5" />
                Appeler
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-white/10 pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <img src={logoImg} alt="BuzzMotion Logo" className="h-12 w-auto object-contain mb-6" />
              <p className="text-xl font-bold text-white mb-2">DONNEZ VIE À VOS IDÉES</p>
              <p className="text-muted-foreground max-w-sm mb-6">
                L'agence digitale qui construit les systèmes, sites et applications de demain.
              </p>
              <div className="flex gap-4">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <SiWhatsapp />
                </a>
                <a href="https://www.linkedin.com/in/buzzmotion/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Linkedin size={16} />
                </a>
                <a href="https://www.facebook.com/BuzzMotion" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <SiFacebook />
                </a>
                <a href="https://x.com/BuzzMotion43493" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <SiX />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Liens Rapides</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><a href="#accueil" className="hover:text-primary transition-colors">Accueil</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
                <li><a href="#tarifs" className="hover:text-primary transition-colors">Tarifs</a></li>
                <li><a href="#equipe" className="hover:text-primary transition-colors">Équipe</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Contact</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><a href="tel:+224660919148" className="hover:text-primary transition-colors">+224 660 91 91 48</a></li>
                <li><a href="mailto:BuzzMotion@proton.me" className="hover:text-primary transition-colors">BuzzMotion@proton.me</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center text-sm text-muted-foreground">
            © 2026 BuzzMotion. Tous droits réservés.
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] text-white rounded-full shadow-[0_4px_30px_rgba(37,211,102,0.4)] flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
        aria-label="Contact us on WhatsApp"
      >
        <SiWhatsapp className="w-8 h-8" />
      </a>
      
    </div>
  );
}
