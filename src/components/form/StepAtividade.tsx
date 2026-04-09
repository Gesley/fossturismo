import { TermFormData } from "@/types/termForm";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  data: TermFormData;
  onChange: (data: Partial<TermFormData>) => void;
}

const atividadesOptions = [
  "Trekking / Trilhas",
  "Canionismo",
  "Rapel",
  "Mountain Bike",
];

const StepAtividade = ({ data, onChange }: Props) => {
  const toggleAtividade = (atv: string) => {
    const current = data.atividades;
    onChange({
      atividades: current.includes(atv)
        ? current.filter((a) => a !== atv)
        : [...current, atv],
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display font-bold text-gradient-nature">Atividade Esportiva</h2>
      <p className="text-muted-foreground">Selecione a(s) atividade(s) que irá praticar.</p>

      <div className="space-y-3">
        {atividadesOptions.map((atv) => (
          <label key={atv} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-card cursor-pointer transition-colors">
            <Checkbox
              checked={data.atividades.includes(atv)}
              onCheckedChange={() => toggleAtividade(atv)}
            />
            <span className="font-medium">{atv}</span>
          </label>
        ))}
        <label className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-card cursor-pointer transition-colors">
          <Checkbox
            checked={data.atividades.includes("Outra")}
            onCheckedChange={() => toggleAtividade("Outra")}
          />
          <span className="font-medium">Outra:</span>
          <Input
            className="flex-1"
            value={data.outraAtividade}
            onChange={(e) => onChange({ outraAtividade: e.target.value })}
            placeholder="Especifique"
            disabled={!data.atividades.includes("Outra")}
          />
        </label>
      </div>

      {/* Federação */}
      <div className="border-t border-border pt-6 mt-6">
        <label className="flex items-center gap-3 mb-4">
          <Checkbox checked={data.isFederado} onCheckedChange={(c) => onChange({ isFederado: !!c })} />
          <span className="font-medium">Sou canionista federado</span>
        </label>
        {data.isFederado && (
          <div className="grid md:grid-cols-2 gap-4 pl-8">
            <div>
              <Label>Número da Federação</Label>
              <Input value={data.numeroFederacao} onChange={(e) => onChange({ numeroFederacao: e.target.value })} />
            </div>
            <div>
              <Label>UF</Label>
              <Input value={data.ufFederacao} onChange={(e) => onChange({ ufFederacao: e.target.value })} maxLength={2} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepAtividade;
