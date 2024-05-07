export interface Movimentacao {
  id?: number;
  data: Date;
  quantidade: number;
  item: number;
  documento: string;
  tipo: number;
}
