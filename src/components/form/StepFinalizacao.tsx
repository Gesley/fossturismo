import { useRef } from "react";
import { TermFormData } from "@/types/termForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, ShieldCheck } from "lucide-react";

interface Props {
  data: TermFormData;
  onChange: (data: Partial<TermFormData>) => void;
}

const formatCPF = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
};

const StepFinalizacao = ({ data, onChange }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange({ documentoUpload: file });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-display font-bold text-gradient-nature">Finalização</h2>

      {/* Dados finais */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Dados do Responsável e Veículo</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Data *</Label>
            <Input type="date" value={data.dataFinal} onChange={(e) => onChange({ dataFinal: e.target.value })} />
          </div>
          <div>
            <Label>Nome do Responsável *</Label>
            <Input value={data.nomeResponsavel} onChange={(e) => onChange({ nomeResponsavel: e.target.value })} />
          </div>
          <div>
            <Label>CPF do Responsável *</Label>
            <Input value={data.cpfResponsavel} onChange={(e) => onChange({ cpfResponsavel: formatCPF(e.target.value) })} placeholder="000.000.000-00" />
          </div>
          <div>
            <Label>Veículo</Label>
            <Input value={data.veiculo} onChange={(e) => onChange({ veiculo: e.target.value })} placeholder="Modelo do veículo" />
          </div>
          <div>
            <Label>Placa</Label>
            <Input value={data.placa} onChange={(e) => onChange({ placa: e.target.value.toUpperCase() })} placeholder="ABC-1234" />
          </div>
          <div>
            <Label>Cor do Veículo</Label>
            <Input value={data.corVeiculo} onChange={(e) => onChange({ corVeiculo: e.target.value })} />
          </div>
        </div>
      </div>

      {/* Upload documento */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Anexar Documento (RG/CPF)</h3>
        <div
          className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="mx-auto mb-2 text-muted-foreground" size={32} />
          <p className="text-muted-foreground text-sm">
            {data.documentoUpload ? data.documentoUpload.name : "Clique para enviar imagem ou PDF do RG/CPF"}
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      {/* Assinatura via GOV.BR */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Assinatura</h3>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
          <ShieldCheck className="mx-auto mb-3 text-blue-600" size={40} />
          <p className="text-blue-800 font-semibold text-base mb-2">
            Assinatura Digital via GOV.BR
          </p>
          <p className="text-blue-600 text-sm leading-relaxed">
            O PDF gerado conterá um espaço exclusivo para assinatura digital pela plataforma GOV.BR.
            <br />
            Após gerar o documento, acesse{" "}
            <a
              href="https://assinador.iti.br"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold hover:text-blue-800 transition-colors"
            >
              assinador.iti.br
            </a>{" "}
            para assinar digitalmente.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StepFinalizacao;
