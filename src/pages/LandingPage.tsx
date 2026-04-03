import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mountain, TreePine, Waves, Sun, ChevronDown, ChevronLeft, ChevronRight, MapPin, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo-fazenda-guanabara.png";
import fotoPorDoSol from "@/assets/foto-por-do-sol.png";
import fotoCachoeira from "@/assets/foto-cachoeira.jpg";
import fotoPaisagem from "@/assets/foto-paisagem.png";

const activities = [
  { icon: Mountain, title: "Canyon Canabrava", desc: "Formações rochosas impressionantes e vistas de tirar o fôlego" },
  { icon: TreePine, title: "Trilhas", desc: "Caminhos pela mata nativa preservada em meio a paisagens únicas" },
  { icon: Waves, title: "Cachoeiras", desc: "Banhos em quedas d'água cristalinas cercadas pela natureza" },
  { icon: Sun, title: "Pôr do Sol", desc: "Vistas panorâmicas deslumbrantes ao entardecer" },
];

const galleryImages = [
  { src: fotoPorDoSol, title: "Pôr do Sol", desc: "Vista panorâmica do pôr do sol na Fazenda Guanabara" },
  { src: fotoCachoeira, title: "Cachoeira", desc: "Cachoeira cristalina em meio à mata preservada" },
  { src: fotoPaisagem, title: "Paisagem", desc: "As colinas douradas e a estrutura da fazenda" },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const aboutRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src={heroBg}
          alt="Canyon Canabrava - Fazenda Guanabara"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/80" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.img
            src={logo}
            alt="Fazenda Guanabara"
            className="w-32 h-32 mx-auto mb-6 object-contain rounded-2xl shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          />
          <motion.h1
            className="text-5xl md:text-7xl font-display font-bold text-primary-foreground mb-4 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Fazenda Guanabara
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-primary-foreground/90 font-light mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Turismo de aventura em meio a uma natureza esplêndida!
            <br />
            <span className="text-primary-foreground/70 text-lg">Trilhas, cachoeira e o Canyon Canabrava!!</span>
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              variant="hero"
              size="lg"
              className="text-lg px-10 py-6 rounded-full"
              onClick={() => navigate("/termo")}
            >
              Preencher Termo de Responsabilidade
            </Button>
          </motion.div>
        </div>

        <button
          onClick={() => aboutRef.current?.scrollIntoView({ behavior: "smooth" })}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/60 animate-bounce"
        >
          <ChevronDown size={32} />
        </button>
      </section>

      {/* Photo Gallery */}
      <section ref={aboutRef} className="py-20 px-4 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent uppercase tracking-wider mb-3">
              <MapPin size={16} /> Conheça o local
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gradient-nature mb-4">
              Um Paraíso Natural
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Descubra as belezas naturais da Fazenda Guanabara — trilhas, cachoeiras e o impressionante Canyon Canabrava
            </p>
          </motion.div>

          {/* Carousel */}
          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-nature aspect-[16/9] max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src={galleryImages[currentSlide].src}
                  alt={galleryImages[currentSlide].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-1">
                    {galleryImages[currentSlide].title}
                  </h3>
                  <p className="text-white/80 text-sm md:text-base">
                    {galleryImages[currentSlide].desc}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors"
            >
              <ChevronRight size={20} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {galleryImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === currentSlide ? "bg-white scale-125" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Small gallery grid */}
          <div className="grid grid-cols-3 gap-4 mt-6 max-w-4xl mx-auto">
            {galleryImages.map((img, i) => (
              <motion.button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`relative rounded-xl overflow-hidden aspect-video border-2 transition-all duration-300 ${
                  i === currentSlide
                    ? "border-accent shadow-gold scale-[1.02]"
                    : "border-transparent opacity-60 hover:opacity-90"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent uppercase tracking-wider mb-3">
              <Compass size={16} /> Aventuras
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gradient-nature mb-4">
              Nossas Aventuras
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experiências únicas na Fazenda Guanabara
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {activities.map((act, i) => (
              <motion.div
                key={act.title}
                className="bg-card rounded-xl p-8 text-center border border-border hover:shadow-nature transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-nature flex items-center justify-center">
                  <act.icon className="text-primary-foreground" size={28} />
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">{act.title}</h3>
                <p className="text-muted-foreground text-sm">{act.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-nature">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-6">
            Pronto para a aventura?
          </h2>
          <p className="text-primary-foreground/80 mb-8 text-lg">
            Preencha o Termo de Responsabilidade para garantir seu acesso à Fazenda Guanabara.
          </p>
          <Button
            variant="hero"
            size="lg"
            className="text-lg px-10 py-6 rounded-full"
            onClick={() => navigate("/termo")}
          >
            Preencher Termo
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} Fazenda Guanabara — Turismo de Aventura. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
