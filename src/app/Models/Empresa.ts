import { Equipamento } from "./Equipamento";

export interface Empresa {
  id?: number;
  nome: string;
  cnpj: string;
  status: boolean;
  equipamentos?: Equipamento[];
}
