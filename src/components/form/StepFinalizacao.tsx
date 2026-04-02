import { useRef, useCallback } from "react";
import SignatureCanvas from "react-signature-canvas";
import { TermFormData } from "@/types/termForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eraser, Upload } from "lucide-react";

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
  const sigRef = useRef<SignatureCanvas>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const clearSignature = useCallback(() => {
    sigRef.current?.clear();
    onChange({ assinaturaDataUrl: "" });
  }, [onChange]);

  const saveSignature = useCallback(() => {
    if (sigRef.current && !sigRef.current.isEmpty()) {
      onChange({ assinaturaDataUrl: sigRef.current.toDataURL() });
    }
  }, [onChange]);

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

      {/* Assinatura */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Assinatura</h3>

        <label className="flex items-center gap-3 mb-4">
          <Checkbox
            checked={data.assinaturaPosterior}
            onCheckedChange={(c) => onChange({ assinaturaPosterior: !!c, assinaturaDataUrl: "" })}
          />
          <span className="text-sm">Assinar posteriormente via GOV.BR</span>
        </label>

        {!data.assinaturaPosterior && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Desenhe sua assinatura abaixo:</p>
            <div className="border border-border rounded-xl overflow-hidden bg-background">
              <SignatureCanvas
                ref={sigRef}
                penColor="hsl(150, 30%, 12%)"
                canvasProps={{
                  className: "w-full",
                  style: { width: "100%", height: "200px" },
                }}
                onEnd={saveSignature}
              />
            </div>
            <Button type="button" variant="outline" size="sm" onClick={clearSignature} className="gap-2">
              <Eraser size={14} /> Limpar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepFinalizacao;
