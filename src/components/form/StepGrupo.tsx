import { TermFormData } from "@/types/termForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  data: TermFormData;
  onChange: (data: Partial<TermFormData>) => void;
}

const StepGrupo = ({ data, onChange }: Props) => {
  const addParticipante = () => onChange({ participantes: [...data.participantes, ""] });
  const removeParticipante = (i: number) => onChange({ participantes: data.participantes.filter((_, idx) => idx !== i) });
  const updateParticipante = (i: number, v: string) => {
    const p = [...data.participantes];
    p[i] = v;
    onChange({ participantes: p });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display font-bold text-gradient-nature">Dados do Grupo</h2>
      <p className="text-muted-foreground">
        Informe os dados do grupo que acessará a propriedade. A quantidade de pessoas deve coincidir com o número de nomes preenchidos em Participantes do Grupo.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label>Data do Acesso *</Label>
          <Input type="date" value={data.dataAcesso} onChange={(e) => onChange({ dataAcesso: e.target.value })} />
        </div>
        <div>
          <Label>Quantidade de Pessoas *</Label>
          <Input type="number" min={1} value={data.quantidadePessoas} onChange={(e) => onChange({ quantidadePessoas: parseInt(e.target.value) || 1 })} />
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 font-semibold text-yellow-800 dark:text-yellow-200">
        **É OBRIGATÓRIO o SEGURO AVENTURA para todos os integrantes dos eventos que deverá ser feito pelo responsável do grupo!!
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label>Empresa Seguro *</Label>
          <Input type="text" value={data.empresaSeguro} onChange={(e) => onChange({ empresaSeguro: e.target.value })} placeholder="Nome da empresa do seguro" required />
        </div>
        <div>
          <Label>Número seguro *</Label>
          <Input type="text" value={data.numeroSeguro} onChange={(e) => onChange({ numeroSeguro: e.target.value })} placeholder="Número da apólice/seguro" required />
        </div>
      </div>

      <div className="bg-destructive/10 dark:bg-destructive/20 border border-destructive/20 p-4 rounded-md font-semibold text-destructive">
        Assumo total responsabilidade pelos integrantes deste grupo relacionados no anexo!
      </div>

      <div className="space-y-3">
        <Label>Participantes do Grupo</Label>
        {data.participantes.map((p, i) => (
          <div key={i} className="flex gap-2">
            <Input value={p} onChange={(e) => updateParticipante(i, e.target.value)} placeholder={`Nome do participante ${i + 1}`} />
            {data.participantes.length > 1 && (
              <Button type="button" variant="ghost" size="icon" onClick={() => removeParticipante(i)}>
                <Trash2 size={16} />
              </Button>
            )}
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={addParticipante} className="gap-2">
          <Plus size={16} /> Adicionar Participante
        </Button>
      </div>
    </div>
  );
};

export default StepGrupo;
