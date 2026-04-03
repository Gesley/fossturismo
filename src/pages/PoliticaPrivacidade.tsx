import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const PoliticaPrivacidade = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={20} /> Voltar
        </button>

        <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="text-primary" size={32} />
            <h1 className="text-3xl font-display font-bold">Política de Privacidade</h1>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-muted-foreground">
            <p>
              Esta Política de Privacidade descreve como a <strong>Fazenda Guanabara</strong> (Turismo de Aventura) trata as suas informações pessoais coletadas através do formulário de Termo de Responsabilidade.
            </p>

            <section>
              <h2 className="text-xl font-semibold text-foreground">1. Quem somos</h2>
              <p>
                Somos uma propriedade de turismo de aventura focada em proporcionar experiências seguras e sustentáveis na natureza. Nosso compromisso é com a transparência e a segurança dos seus dados.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">2. Dados coletados</h2>
              <p>Coletamos os seguintes dados pessoais fornecidos voluntariamente por você:</p>
              <ul className="list-disc pl-5">
                <li>Nome completo, CPF, RG e Profissão;</li>
                <li>Nacionalidade e Estado Civil;</li>
                <li>Endereço residencial e Cidade;</li>
                <li>Atividade de aventura escolhida;</li>
                <li>Dados de acompanhantes e grupo;</li>
                <li>Imagem de documento de identificação (Upload);</li>
                <li>Dados do veículo e placa.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">3. Finalidade do uso</h2>
              <p>Os seus dados são utilizados única e exclusivamente para:</p>
              <ul className="list-disc pl-5">
                <li><strong>Geração do Termo de Responsabilidade Legal:</strong> Gerar o documento PDF obrigatório para acesso e prática de atividades na propriedade.</li>
                <li><strong>Segurança Jurídica:</strong> Registro formal da ciência de riscos e assunção de responsabilidades.</li>
                <li><strong>Controle de Acesso:</strong> Gestão operacional de visitantes para garantir a segurança de todos.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">4. Base Legal</h2>
              <p>
                O processamento desses dados baseia-se no seu <strong>Consentimento Explícito</strong> e no <strong>Cumprimento de Obrigação Legal/Contratual</strong> necessário para a prestação dos serviços de turismo de aventura.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">5. Armazenamento e Segurança</h2>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 text-yellow-800 dark:text-yellow-200">
                <strong>IMPORTANTE:</strong> Este site não armazena seus dados pessoais em servidores permanentes ou bancos de dados externos após a geração do documento. Todo o processamento ocorre no seu computador/navegador para gerar o arquivo PDF. Uma vez fechada a aba e gerado o documento, não temos mais acesso às suas informações sensíveis.
              </div>
              <p className="mt-4">
                Medidas de segurança técnica (como criptografia HTTPS e processamento local) são adotadas para proteger seus dados durante o preenchimento.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">6. Seus Direitos</h2>
              <p>
                De acordo com a LGPD, você tem direito a confirmar a existência de tratamento, acessar seus dados, corrigir informações incompletas e solicitar a exclusão de dados desnecessários. Como não armazenamos seus dados, esses direitos são garantidos pelo fato de que suas informações são "esquecidas" pelo sistema imediatamente após o uso.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">7. Contato</h2>
              <p>
                Para dúvidas sobre privacidade, entre em contato através do e-mail: <strong>contato@fazendaguanabara.com.br</strong>.
              </p>
            </section>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border">
            <Button onClick={() => navigate("/")} variant="outline" className="w-full sm:w-auto">
              Voltar ao Início
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliticaPrivacidade;
