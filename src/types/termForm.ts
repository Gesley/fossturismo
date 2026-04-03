export interface TermFormData {
  // Dados pessoais
  nomeCompleto: string;
  nacionalidade: string;
  estadoCivil: string;
  profissao: string;
  cpf: string;
  rg: string;
  endereco: string;
  cidade: string;

  // Atividades
  atividades: string[];
  outraAtividade: string;

  // Aceites
  aceitaRiscos: boolean;
  aceitaCapacidade: boolean;
  aceitaEquipamentos: boolean;
  aceitaConduta: boolean;
  aceitaResponsabilidade: boolean;
  aceitaDespesas: boolean;
  aceitaIsencao: boolean;
  consentimentoLGPD: boolean;

  // Federação
  isFederado: boolean;
  numeroFederacao: string;
  ufFederacao: string;

  // Grupo
  dataAcesso: string;
  quantidadePessoas: number;
  empresaSeguro: string;
  numeroSeguro: string;
  participantes: string[];

  // Dados finais
  dataFinal: string;
  nomeResponsavel: string;
  cpfResponsavel: string;
  veiculo: string;
  placa: string;
  corVeiculo: string;

  // Assinatura
  assinaturaDataUrl: string;
  assinaturaPosterior: boolean;

  // Upload
  documentoUpload: File | null;
  documentoDataUrl: string | null;
}

export const initialFormData: TermFormData = {
  nomeCompleto: "",
  nacionalidade: "Brasileira",
  estadoCivil: "",
  profissao: "",
  cpf: "",
  rg: "",
  endereco: "",
  cidade: "",
  atividades: [],
  outraAtividade: "",
  aceitaRiscos: false,
  aceitaCapacidade: false,
  aceitaEquipamentos: false,
  aceitaConduta: false,
  aceitaResponsabilidade: false,
  aceitaDespesas: false,
  aceitaIsencao: false,
  consentimentoLGPD: false,
  isFederado: false,
  numeroFederacao: "",
  ufFederacao: "",
  dataAcesso: new Date().toISOString().split("T")[0],
  quantidadePessoas: 1,
  empresaSeguro: "",
  numeroSeguro: "",
  participantes: [""],
  dataFinal: new Date().toISOString().split("T")[0],
  nomeResponsavel: "",
  cpfResponsavel: "",
  veiculo: "",
  placa: "",
  corVeiculo: "",
  assinaturaDataUrl: "",
  assinaturaPosterior: false,
  documentoUpload: null,
  documentoDataUrl: null,
};
