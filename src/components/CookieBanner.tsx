import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("fazenda-guanabara-lgpd-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptConsent = () => {
    localStorage.setItem("fazenda-guanabara-lgpd-consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[100] animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="max-w-4xl mx-auto bg-card border border-border shadow-2xl rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="bg-primary/10 p-3 rounded-full shrink-0">
          <Cookie className="text-primary" size={24} />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <p className="text-sm text-foreground font-medium mb-1">Privacidade e Dados Pessoais</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Utilizamos dados pessoais apenas para a geração do seu Termo de Responsabilidade. 
            Não armazenamos suas informações em nossos servidores.
            Ao continuar, você concorda com nossa <Link to="/politica-privacidade" className="text-primary underline font-semibold">Política de Privacidade</Link>.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button variant="outline" size="sm" onClick={() => setIsVisible(false)} className="w-full md:w-auto">
            <X size={14} className="mr-2" /> Fechar
          </Button>
          <Button variant="nature" size="sm" onClick={acceptConsent} className="w-full md:w-auto px-8">
            Aceitar e Continuar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
