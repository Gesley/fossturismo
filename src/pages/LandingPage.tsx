import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mountain, TreePine, Waves, Sun, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";

const activities = [
  { icon: Mountain, title: "Rapel", desc: "Descidas emocionantes em paredões rochosos" },
  { icon: TreePine, title: "Trilhas", desc: "Caminhos pela mata nativa preservada" },
  { icon: Waves, title: "Cachoeiras", desc: "Banhos em quedas d'água cristalinas" },
  { icon: Sun, title: "Pôr do Sol", desc: "Vistas panorâmicas de tirar o fôlego" },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const aboutRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src={heroBg}
          alt="Cânion com cachoeiras e floresta tropical"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/80" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.img
            src={logo}
            alt="FossTurismo"
            className="w-28 h-28 mx-auto mb-6 object-contain rounded-full shadow-lg"
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
            FossTurismo
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-primary-foreground/80 font-light mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Turismo de aventura em meio à natureza selvagem. Rapel, trilhas, cachoeiras e experiências inesquecíveis.
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

      {/* Activities */}
      <section ref={aboutRef} className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-display font-bold text-center mb-4 text-gradient-nature"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Nossas Aventuras
          </motion.h2>
          <motion.p
            className="text-center text-muted-foreground mb-16 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Experiências únicas na Fazenda Chapada Guanabara
          </motion.p>

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
            Preencha o Termo de Responsabilidade para garantir seu acesso à Fazenda Chapada Guanabara.
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
          <p>© {new Date().getFullYear()} FossTurismo — Turismo de Aventura. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
