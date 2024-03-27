import { Component } from '@angular/core';
import { EquipamentoService } from '../../equipamento.service';

@Component({
  selector: 'app-buscar-equipamento',
  templateUrl: './buscar-equipamento.component.html',
  styleUrls: ['./buscar-equipamento.component.css']
})
export class BuscarEquipamentoComponent {

  isLoading: boolean = false;
  tagEquipamento: string = '';
  equipamentoEncontrado: any;

  constructor(private equipamentoService: EquipamentoService) {}

  buscarEquipamentoPorTag(tagEquipamento: string): void {
    this.isLoading = true;
    if (tagEquipamento != null) {
      this.equipamentoService.buscarEquipamentoPorTag(tagEquipamento).subscribe(
        (equipamentoEncontrado) => {
          this.isLoading = false;

          if (equipamentoEncontrado) {
            this.isLoading = false;
          } else {
            this.isLoading = false;
            console.log('Equipamento não encontrado.');
          }
        },
        (erro) => {
          this.isLoading = false;
          console.error('Erro ao buscar equipamento:', erro);
        }
      );
    }
  }
}
