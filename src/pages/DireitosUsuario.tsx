import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const DireitosUsuario = () => {
  const navigate = useNavigate();
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
    toast.success("Sua solicitação de direitos foi recebida com sucesso.");
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={20} /> Voltar
        </button>

        <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <UserCheck className="text-primary" size={32} />
            <h1 className="text-3xl font-display font-bold">Direitos do Titular</h1>
          </div>

          {enviado ? (
            <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 p-8 rounded-xl text-center">
              <h2 className="text-xl font-bold text-green-800 dark:text-green-300 mb-4">Solicitação Recebida</h2>
              <p className="text-green-700 dark:text-green-400 mb-6">
                Recebemos sua solicitação sobre o exercício de seus direitos relacionados à LGPD. 
                Daremos uma resposta no prazo legal estabelecido pela Lei 13.709/2018.
              </p>
              <Button onClick={() => navigate("/")}>Voltar para o Início</Button>
            </div>
          ) : (
            <>
              <p className="text-muted-foreground mb-8">
                Preencha o formulário abaixo para exercer seus direitos legais conforme a LGPD (acesso, correção, exclusão). 
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input id="nome" required placeholder="Seu nome completo" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input id="cpf" required placeholder="000.000.000-00" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="solicitacao">O que você deseja solicitar?</Label>
                  <textarea 
                    id="solicitacao" 
                    required 
                    className="w-full min-h-[120px] bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Ex: Gostaria de confirmar se existem dados armazenados em meu CPF e solicitar exclusão."
                  ></textarea>
                </div>

                <div className="bg-muted p-4 rounded-md text-xs text-muted-foreground italic mb-6">
                  * Ressaltamos que nosso sistema não armazena dados em banco de dados centralizado e todos os processamentos são excluídos logo após a geração do documento PDF.
                </div>

                <Button type="submit" className="w-full nature-gradient">Enviar Solicitação</Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DireitosUsuario;
