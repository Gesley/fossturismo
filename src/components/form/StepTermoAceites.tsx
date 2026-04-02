import { TermFormData } from "@/types/termForm";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  data: TermFormData;
  onChange: (data: Partial<TermFormData>) => void;
}

const termoTexto = `Declaro estar plenamente ciente de que as atividades praticadas em ambiente natural envolvem riscos inerentes, previsíveis e imprevisíveis, incluindo, mas não se limitando a:

• Quedas, escorregões e impactos;
• Afogamentos;
• Deslizamentos;
• Presença de animais silvestres (cobras, onças, insetos, entre outros);
• Condições climáticas adversas;
• Terrenos irregulares, declives, cânions e cachoeiras;
• Risco de lesões graves ou morte.

Reconheço que tais riscos fazem parte da atividade e assumo integralmente suas consequências.`;

const capacidadeTexto = `Declaro que possuo plena capacidade física, técnica e psicológica para a prática da atividade escolhida, bem como conhecimento suficiente para avaliar os riscos envolvidos.

Caso esteja conduzindo grupo, declaro ser plenamente responsável pela orientação, segurança e conduta de todos os participantes.`;

const equipamentosTexto = `Declaro que TODOS os equipamentos utilizados para a prática do esporte são de minha responsabilidade, encontram-se em perfeitas condições de uso e foram previamente verificados, inexistindo qualquer obrigação do proprietário e/ou seu representante legal quanto à sua segurança.`;

const condutaTexto = `Comprometo-me a:
a) Não descartar lixo ou resíduos, devendo recolhê-los e levá-los consigo;
b) Zelar pelo DECK e toda estrutura de madeira existente no local não permitindo danos ao mesmo;
c) Não retirar plantas, animais, pedras, minerais ou qualquer material do local;
d) Não provocar danos ambientais;
e) Não utilizar fogo sob nenhuma hipótese;
f) Respeitar trabalhadores, moradores e atividades existentes na propriedade.

Comunicar ao proprietário e/ou seu representante legal qualquer situação anormal observada. O descumprimento destas normas implicará responsabilização civil, administrativa e criminal.`;

const responsabilidadeTexto = `Assumo total responsabilidade por quaisquer danos materiais, ambientais ou pessoais causados por mim ou por integrantes do meu grupo, obrigando-me a indenizar integralmente o proprietário e/ou seu representante legal e terceiros prejudicados.`;

const despesasTexto = `Declaro que todas as despesas decorrentes de: atendimento médico, hospitalização, remoção, resgate, transporte, medicamentos e outras serão de minha exclusiva responsabilidade, isentando o proprietário e/ou seu representante legal de qualquer obrigação financeira.`;

const isencaoTexto = `Declaro que, de forma livre e consciente:
• Isento o proprietário e/ou seu representante legal de responsabilidade por acidentes, lesões, danos ou morte decorrentes dos riscos naturais da atividade;
• Renuncio ao direito de pleitear qualquer indenização, judicial ou extrajudicial, contra o proprietário e/ou seu representante legal.`;

const sections = [
  { key: "aceitaRiscos" as const, title: "2. Ciência dos Riscos", text: termoTexto, label: "Declaro que li e aceito os riscos descritos acima" },
  { key: "aceitaCapacidade" as const, title: "3. Capacidade Técnica", text: capacidadeTexto, label: "Declaro que tenho capacidade física e técnica" },
  { key: "aceitaEquipamentos" as const, title: "5. Equipamentos", text: equipamentosTexto, label: "Confirmo responsabilidade pelos equipamentos" },
  { key: "aceitaConduta" as const, title: "6. Normas de Conduta", text: condutaTexto, label: "Aceito todas as normas de conduta" },
  { key: "aceitaResponsabilidade" as const, title: "7. Responsabilidade por Danos", text: responsabilidadeTexto, label: "Confirmo ciência das responsabilidades legais" },
  { key: "aceitaDespesas" as const, title: "8. Despesas Médicas e Resgate", text: despesasTexto, label: "Aceito responsabilidade por despesas médicas" },
  { key: "aceitaIsencao" as const, title: "9. Isenção e Renúncia Parcial", text: isencaoTexto, label: "Aceito a isenção de responsabilidade descrita" },
];

const StepTermoAceites = ({ data, onChange }: Props) => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-display font-bold text-gradient-nature">Termo de Responsabilidade</h2>
      <p className="text-muted-foreground">Leia atentamente cada seção e marque os aceites obrigatórios.</p>

      {sections.map((section) => (
        <div key={section.key} className="border border-border rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-display font-semibold">{section.title}</h3>
          <div className="bg-muted/50 rounded-lg p-4 text-sm leading-relaxed whitespace-pre-line text-muted-foreground max-h-48 overflow-y-auto">
            {section.text}
          </div>
          <label className="flex items-start gap-3 cursor-pointer">
            <Checkbox
              checked={data[section.key]}
              onCheckedChange={(c) => onChange({ [section.key]: !!c })}
              className="mt-0.5"
            />
            <span className="text-sm font-medium">{section.label} *</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default StepTermoAceites;
