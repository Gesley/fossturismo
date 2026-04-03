import jsPDF from "jspdf";
import { TermFormData } from "@/types/termForm";

export function generateTermoPDF(data: TermFormData): jsPDF {
  const doc = new jsPDF("p", "mm", "a4");
  const pageW = 210;
  const margin = 20;
  const contentW = pageW - margin * 2;
  let y = 20;

  const addPage = () => { doc.addPage(); y = 20; };
  const checkPage = (needed: number) => { if (y + needed > 275) addPage(); };

  const title = (text: string) => {
    checkPage(12);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(text, pageW / 2, y, { align: "center" });
    y += 8;
  };

  const sectionTitle = (text: string) => {
    checkPage(12);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(text, margin, y);
    y += 6;
  };

  const paragraph = (text: string) => {
    checkPage(10);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const lines = doc.splitTextToSize(text, contentW);
    for (const line of lines) {
      checkPage(5);
      doc.text(line, margin, y);
      y += 4.5;
    }
    y += 3;
  };

  const field = (label: string, value: string) => {
    checkPage(8);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(`${label}: `, margin, y);
    const labelW = doc.getTextWidth(`${label}: `);
    doc.setFont("helvetica", "normal");
    doc.text(value || "_______________", margin + labelW, y);
    y += 6;
  };

  const bullet = (text: string) => {
    checkPage(6);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const lines = doc.splitTextToSize(text, contentW - 6);
    doc.text("•", margin + 2, y);
    for (let i = 0; i < lines.length; i++) {
      checkPage(5);
      doc.text(lines[i], margin + 6, y);
      y += 4.5;
    }
    y += 1;
  };

  const checkbox = (checked: boolean, text: string) => {
    checkPage(6);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const mark = checked ? "[X]" : "[   ]";
    doc.text(mark, margin + 2, y);
    doc.text(text, margin + 12, y);
    y += 6;
  };

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("TERMO DE CIÊNCIA, RESPONSABILIDADE", pageW / 2, y, { align: "center" });
  y += 7;
  doc.text("E ASSUNÇÃO DE RISCOS", pageW / 2, y, { align: "center" });
  y += 12;

  // Dados pessoais inline
  paragraph(`Eu, ${data.nomeCompleto}, nacionalidade: ${data.nacionalidade}, estado civil: ${data.estadoCivil}, profissão: ${data.profissao}, CPF nº ${data.cpf}, RG nº ${data.rg}, residente e domiciliado(a) à ${data.endereco}, na cidade de: ${data.cidade},`);

  paragraph("DECLARO, por meio deste instrumento, que estou ciente de que terei acesso à Fazenda Chapada Guanabara, propriedade particular, privada e de acesso restrito, sendo o ingresso permitido exclusivamente mediante autorização prévia do proprietário e/ou seu representante legal.");

  // 1. DO OBJETO
  sectionTitle("1. DO OBJETO");
  paragraph("O acesso será destinado exclusivamente à prática da atividade esportiva:");
  for (const atv of ["Trekking / Trilhas", "Canionismo", "Rapel", "Mountain Bike"]) {
    checkbox(data.atividades.includes(atv), atv);
  }
  if (data.atividades.includes("Outra")) {
    checkbox(true, `Outra: ${data.outraAtividade}`);
  } else {
    checkbox(false, "Outra: _______________");
  }
  paragraph("Comprometo-me a realizar a atividade dentro dos limites autorizados e de forma responsável.");

  // 2. DA CIÊNCIA DOS RISCOS
  sectionTitle("2. DA CIÊNCIA DOS RISCOS");
  paragraph("Declaro estar plenamente ciente de que as atividades praticadas em ambiente natural envolvem riscos inerentes, previsíveis e imprevisíveis, incluindo, mas não se limitando a:");
  for (const r of [
    "Quedas, escorregões e impactos;",
    "Afogamentos;",
    "Deslizamentos;",
    "Presença de animais silvestres (cobras, onças, insetos, entre outros);",
    "Condições climáticas adversas;",
    "Terrenos irregulares, declives, cânions e cachoeiras;",
    "Risco de lesões graves ou morte."
  ]) {
    bullet(r);
  }
  paragraph("Reconheço que tais riscos fazem parte da atividade e assumo integralmente suas consequências.");

  // 3. DA CAPACIDADE TÉCNICA
  sectionTitle("3. DA CAPACIDADE TÉCNICA");
  paragraph("Declaro que possuo plena capacidade física, técnica e psicológica para a prática da atividade escolhida, bem como conhecimento suficiente para avaliar os riscos envolvidos.");
  paragraph("Caso esteja conduzindo grupo, declaro ser plenamente responsável pela orientação, segurança e conduta de todos os participantes.");

  if (data.isFederado) {
    paragraph("Se canoísta FEDERADO:");
    field("Número", data.numeroFederacao);
    field("UF", data.ufFederacao);
  }

  // 4. DO GRUPO
  sectionTitle("4. DO GRUPO");
  paragraph("O acesso está autorizado exclusivamente para o grupo abaixo identificado:");
  field("Data do acesso", data.dataAcesso);
  field("Quantidade de pessoas", data.quantidadePessoas.toString());

  y += 2;
  checkPage(15);
  doc.setFont("helvetica", "bold");
  paragraph("É OBRIGATÓRIO o SEGURO AVENTURA para todos os integrantes dos eventos que deverá ser feito pelo responsável do grupo!!");
  doc.setFont("helvetica", "normal");

  field("Empresa Seguro", data.empresaSeguro);
  field("Número seguro", data.numeroSeguro);

  y += 2;
  checkPage(10);
  doc.setFont("helvetica", "bold");
  paragraph("Assumo total responsabilidade pelos integrantes deste grupo relacionados no anexo!");
  doc.setFont("helvetica", "normal");

  // 5. DOS EQUIPAMENTOS
  sectionTitle("5. DOS EQUIPAMENTOS");
  paragraph("Declaro que TODOS os equipamentos utilizados para a prática do esporte são de minha responsabilidade, encontram-se em perfeitas condições de uso e foram previamente verificados, inexistindo qualquer obrigação do proprietário e/ou seu representante legal quanto à sua segurança.");

  // 6. DAS NORMAS DE CONDUTA
  sectionTitle("6. DAS NORMAS DE CONDUTA");
  paragraph("Comprometo-me a:");
  for (const n of [
    "a) Não descartar lixo ou resíduos, devendo recolhê-los e levá-los consigo;",
    "b) Zelar pelo DECK e toda estrutura de madeira existente no local não permitindo danos ao mesmo;",
    "c) Não retirar plantas, animais, pedras, minerais ou qualquer material do local;",
    "d) Não provocar danos ambientais;",
    "e) Não utilizar fogo sob nenhuma hipótese;",
    "f) Respeitar trabalhadores, moradores e atividades existentes na propriedade."
  ]) {
    bullet(n);
  }
  paragraph("Comunicar ao proprietário e/ou seu representante legal qualquer situação anormal observada. O descumprimento destas normas implicará responsabilização civil, administrativa e criminal.");

  // 7. DA RESPONSABILIDADE POR DANOS
  sectionTitle("7. DA RESPONSABILIDADE POR DANOS");
  paragraph("Assumo total responsabilidade por quaisquer danos materiais, ambientais ou pessoais causados por mim ou por integrantes do meu grupo, obrigando-me a indenizar integralmente o proprietário e/ou seu representante legal e terceiros prejudicados.");

  // 8. DAS DESPESAS MÉDICAS E RESGATE
  sectionTitle("8. DAS DESPESAS MÉDICAS E RESGATE");
  paragraph("Declaro que todas as despesas decorrentes de: Atendimento médico; Hospitalização; Remoção; Resgate; Transporte; Medicamentos; Outras — serão de minha exclusiva responsabilidade, isentando o proprietário e/ou seu representante legal de qualquer obrigação financeira.");

  // 9. DA ISENÇÃO E RENÚNCIA PARCIAL
  sectionTitle("9. DA ISENÇÃO E RENÚNCIA PARCIAL");
  paragraph("Declaro que, de forma livre e consciente:");
  bullet("Isento o proprietário e/ou seu representante legal de responsabilidade por acidentes, lesões, danos ou morte decorrentes dos riscos naturais da atividade;");
  bullet("Renuncio ao direito de pleitear qualquer indenização, judicial ou extrajudicial, contra o proprietário e/ou seu representante legal.");

  // 10. DISPOSIÇÕES FINAIS
  sectionTitle("10. DISPOSIÇÕES FINAIS");
  paragraph("Declaro que:");
  bullet("Li integralmente este termo;");
  bullet("Compreendi seu conteúdo;");
  bullet("Assino de forma livre e voluntária;");
  bullet("Estou ciente de todos os riscos e responsabilidades assumidas.");
  paragraph("Este termo possui validade para a data indicada e poderá ser revogado a qualquer momento pelo proprietário e/ou seu representante legal.");

  // Dados finais
  y += 4;
  field("Brasília/DF", data.dataFinal);
  field("Nome Responsável", data.nomeResponsavel);
  field("CPF", data.cpfResponsavel);
  field("Veículo", data.veiculo);
  field("Placa", data.placa);
  field("Cor", data.corVeiculo);

  // Espaço para assinatura via GOV.BR
  y += 10;
  checkPage(40);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("ASSINATURA DIGITAL (GOV.BR)", pageW / 2, y, { align: "center" });
  y += 10;
  
  // Linha para assinatura
  doc.setDrawColor(150, 150, 150);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageW - margin, y);
  y += 5;
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("Este documento deve ser assinado digitalmente via plataforma GOV.BR", pageW / 2, y, { align: "center" });
  y += 10;

  // Lista de participantes
  if (data.participantes.some((p) => p.trim())) {
    checkPage(20);
    sectionTitle("LISTA DE PARTICIPANTES DO GRUPO");
    const filtered = data.participantes.filter((p) => p.trim());
    for (let i = 0; i < filtered.length; i++) {
      checkPage(6);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(`${i + 1}. ${filtered[i]}`, margin, y);
      y += 5;
    }
  }

  // ANEXO: Documento (RG/CPF)
  if (data.documentoDataUrl) {
    doc.addPage();
    y = 20;
    sectionTitle("ANEXO: DOCUMENTO DE IDENTIFICAÇÃO (RG/CPF)");
    y += 10;
    
    try {
      const imgProps = doc.getImageProperties(data.documentoDataUrl);
      const ratio = imgProps.height / imgProps.width;
      const targetW = contentW;
      const targetH = targetW * ratio;
      
      const finalH = targetH > 240 ? 240 : targetH;
      const finalW = finalH / ratio;
      
      doc.addImage(
        data.documentoDataUrl, 
        "JPEG", 
        margin + (contentW - finalW) / 2, 
        y, 
        finalW, 
        finalH
      );
    } catch (e) {
      paragraph("Erro ao renderizar a imagem do documento. Certifique-se de que o arquivo é uma imagem válida.");
      console.error("PDF Image Error:", e);
    }
  }

  return doc;
}
