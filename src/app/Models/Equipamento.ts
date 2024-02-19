import { Colaborador } from "./Colaborador";
import { Empresa } from "./Empresa";
import { TipoEquipamento } from "./TipoEquipamento";

export interface Equipamento {
  id?: number;
  tag_patrimonio: string;
  tipo_equipamento_id: TipoEquipamento;
  situacao: string;
  pedido: string;
  data_compra: Date;
  data_cadastro?: Date;
  ultima_alteracao?: Date;
  empresa_id: Empresa;
  colaborador_id: Colaborador;
  marca: string;
  modelo: string;
  especificacoes: string;
  acesso_remoto?: string;
  acesso_id?: string;
  acesso_senha?: string;
  observacoes: string;
  status: boolean;

  empresa_nome?: string;
  colaborador_nome?: string;
  tipo_equipamento_nome?: string;


}
