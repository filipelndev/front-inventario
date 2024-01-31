import { Component } from '@angular/core';
import { EquipamentoService } from '../../equipamento.service';

@Component({
  selector: 'app-buscar-equipamento',
  templateUrl: './buscar-equipamento.component.html',
  styleUrls: ['./buscar-equipamento.component.css']
})
export class BuscarEquipamentoComponent {

  tagEquipamento: string = '';
  equipamentoEncontrado: any;

  constructor(private equipamentoService: EquipamentoService) {}

  buscarEquipamentoPorTag(tagEquipamento: string): void {
    if (tagEquipamento != null) {
      this.equipamentoService.buscarEquipamentoPorTag(tagEquipamento).subscribe(
        (equipamentoEncontrado) => {
          console.log('Resposta do backend:', equipamentoEncontrado);

          if (equipamentoEncontrado) {
            console.log('Equipamento encontrado:', equipamentoEncontrado);
          } else {
            console.log('Equipamento não encontrado.');
          }
        },
        (erro) => {
          console.error('Erro ao buscar equipamento:', erro);
        }
      );
    }
  }
}
