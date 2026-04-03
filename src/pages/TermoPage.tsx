import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, FileText, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TermFormData, initialFormData } from "@/types/termForm";
import StepDadosPessoais from "@/components/form/StepDadosPessoais";
import StepAtividade from "@/components/form/StepAtividade";
import StepTermoAceites from "@/components/form/StepTermoAceites";
import StepGrupo from "@/components/form/StepGrupo";
import StepFinalizacao from "@/components/form/StepFinalizacao";
import { generateTermoPDF } from "@/lib/pdfGenerator";
import { toast } from "sonner";
import logo from "@/assets/logo-fazenda-guanabara.png";

const STORAGE_KEY = "fazenda-guanabara-termo-draft";

const steps = [
  { title: "Dados Pessoais", icon: "👤" },
  { title: "Atividade", icon: "🧗" },
  { title: "Termo Legal", icon: "⚖️" },
  { title: "Grupo", icon: "👥" },
  { title: "Finalização", icon: "✍️" },
];

const TermoPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<TermFormData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...initialFormData, ...parsed, documentoUpload: null };
      }
    } catch {}
    return initialFormData;
  });

  // Auto-save
  useEffect(() => {
    const { documentoUpload, assinaturaDataUrl, ...rest } = formData;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
  }, [formData]);

  const updateForm = (partial: Partial<TermFormData>) => {
    setFormData((prev) => ({ ...prev, ...partial }));
  };

  const validateStep = (): boolean => {
    switch (currentStep) {
      case 0:
        if (!formData.nomeCompleto || !formData.cpf || !formData.rg || !formData.endereco || !formData.cidade || !formData.estadoCivil || !formData.profissao) {
          toast.error("Preencha todos os campos obrigatórios.");
          return false;
        }
        return true;
      case 1:
        if (formData.atividades.length === 0) {
          toast.error("Selecione pelo menos uma atividade.");
          return false;
        }
        return true;
      case 2:
        if (!formData.aceitaRiscos || !formData.aceitaCapacidade || !formData.aceitaEquipamentos || !formData.aceitaConduta || !formData.aceitaResponsabilidade || !formData.aceitaDespesas || !formData.aceitaIsencao) {
          toast.error("Todos os aceites são obrigatórios para continuar.");
          return false;
        }
        return true;
      case 3:
        if (!formData.dataAcesso || formData.quantidadePessoas < 1) {
          toast.error("Preencha a data e quantidade de pessoas.");
          return false;
        }
        return true;
      case 4:
        if (!formData.nomeResponsavel || !formData.cpfResponsavel) {
          toast.error("Preencha o nome e CPF do responsável.");
          return false;
        }
        if (!formData.consentimentoLGPD) {
          toast.error("Você deve concordar com a Política de Privacidade para continuar.");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep()) {
      if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    if (!validateStep()) return;
    try {
      const pdf = generateTermoPDF(formData);
      const dateStr = formData.dataFinal.replace(/-/g, "");
      const nameSlug = formData.nomeCompleto.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z-]/g, "");
      pdf.save(`termo-fazenda-guanabara-${nameSlug}-${dateStr}.pdf`);
      toast.success("PDF gerado com sucesso!");
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      toast.error("Erro ao gerar PDF. Tente novamente.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <img src={logo} alt="Fazenda Guanabara" className="w-8 h-8 object-contain rounded" />
            <span className="font-display font-semibold">Fazenda Guanabara</span>
          </button>
          <span className="text-sm text-muted-foreground">Termo de Responsabilidade</span>
        </div>
      </header>

      {/* Progress */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                  i < currentStep
                    ? "bg-primary text-primary-foreground"
                    : i === currentStep
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i < currentStep ? <Check size={14} /> : i + 1}
              </div>
              <span className="hidden sm:inline text-xs text-muted-foreground">{step.title}</span>
              {i < steps.length - 1 && (
                <div className={`w-8 md:w-16 h-0.5 mx-1 ${i < currentStep ? "bg-primary" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 pb-32">
        <div className="bg-card border border-border rounded-2xl p-6 md:p-10 shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 0 && <StepDadosPessoais data={formData} onChange={updateForm} />}
              {currentStep === 1 && <StepAtividade data={formData} onChange={updateForm} />}
              {currentStep === 2 && <StepTermoAceites data={formData} onChange={updateForm} />}
              {currentStep === 3 && <StepGrupo data={formData} onChange={updateForm} />}
              {currentStep === 4 && <StepFinalizacao data={formData} onChange={updateForm} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border py-4 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 0} className="gap-2">
            <ArrowLeft size={16} /> Anterior
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button variant="nature" onClick={nextStep} className="gap-2">
              Próximo <ArrowRight size={16} />
            </Button>
          ) : (
            <Button variant="hero" onClick={handleSubmit} className="gap-2">
              <FileText size={16} /> Gerar PDF
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TermoPage;
