export interface Equipamento {
  id?: number;
  tagPatrimonio: string;
  tipoEquipamento: string;
  situacao: string;
  pedidoNFE: string;
  dataCompra: Date;
  empresa: string;
  colaborador: string;
  marca: string;
  modelo: string;
  especificacoes: string;
  acessoRemoto: boolean;
  idAcessoRemoto?: string;
  senhaAcesso?: string;
  observacoes: string;
  status: boolean;
}
