import { Component } from '@angular/core';
import { TipoEquipamento } from 'src/app/Models/TipoEquipamento';
import { TipoEquipamentoService } from '../../tipo-equipamento.service';

@Component({
  selector: 'app-cadastrar-tipo-equipamento',
  templateUrl: './cadastrar-tipo-equipamento.component.html',
  styleUrls: ['./cadastrar-tipo-equipamento.component.css']
})
export class CadastrarTipoEquipamentoComponent {

  tipoEquipamento: TipoEquipamento = { tipo: '', status: true };
  mensagemCadastro: string | null = null;

  constructor(private tipoEquipamentoService: TipoEquipamentoService) {}  // Injete o serviço no construtor

  onSubmit(): void {
    // Chama o serviço para cadastrar o tipo de equipamento
    this.tipoEquipamentoService.cadastrarTipoEquipamento(this.tipoEquipamento).subscribe(
      (response) => {
        console.log('Tipo de equipamento cadastrado:', response);
        this.tipoEquipamento = { tipo: '', status: true };
        this.mensagemCadastro = 'Tipo de equipamento cadastrado com sucesso!'
        setTimeout(() => {
          this.mensagemCadastro = null;
        }, 4000);
      },
      (error) => {
        console.error('Erro ao cadastrar tipo de equipamento:', error);
        this.mensagemCadastro = 'Erro ao cadastrar tipo de equipamento. Por favor, tente novamente.';
        setTimeout(() => {
          this.mensagemCadastro = null;
        }, 4000);
      }
    );
  }
}
