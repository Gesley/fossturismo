import { TermFormData } from "@/types/termForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

const StepDadosPessoais = ({ data, onChange }: Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display font-bold text-gradient-nature">Dados Pessoais</h2>
      <p className="text-muted-foreground">Preencha seus dados para o termo de responsabilidade.</p>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="nome">Nome Completo *</Label>
          <Input id="nome" value={data.nomeCompleto} onChange={(e) => onChange({ nomeCompleto: e.target.value })} placeholder="Seu nome completo" required />
        </div>
        <div>
          <Label htmlFor="nacionalidade">Nacionalidade *</Label>
          <Input id="nacionalidade" value={data.nacionalidade} onChange={(e) => onChange({ nacionalidade: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="estadoCivil">Estado Civil *</Label>
          <Select value={data.estadoCivil} onValueChange={(v) => onChange({ estadoCivil: v })}>
            <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
            <SelectContent>
              {["Solteiro(a)", "Casado(a)", "Divorciado(a)", "Viúvo(a)", "União Estável"].map((o) => (
                <SelectItem key={o} value={o}>{o}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="profissao">Profissão *</Label>
          <Input id="profissao" value={data.profissao} onChange={(e) => onChange({ profissao: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="cpf">CPF *</Label>
          <Input id="cpf" value={data.cpf} onChange={(e) => onChange({ cpf: formatCPF(e.target.value) })} placeholder="000.000.000-00" />
        </div>
        <div>
          <Label htmlFor="rg">RG *</Label>
          <Input id="rg" value={data.rg} onChange={(e) => onChange({ rg: e.target.value })} />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="endereco">Endereço Completo *</Label>
          <Input id="endereco" value={data.endereco} onChange={(e) => onChange({ endereco: e.target.value })} placeholder="Rua, número, bairro" />
        </div>
        <div>
          <Label htmlFor="cidade">Cidade *</Label>
          <Input id="cidade" value={data.cidade} onChange={(e) => onChange({ cidade: e.target.value })} />
        </div>
      </div>
    </div>
  );
};

export default StepDadosPessoais;
