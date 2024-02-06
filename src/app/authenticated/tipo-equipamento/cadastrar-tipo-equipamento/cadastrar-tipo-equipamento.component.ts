import { Component } from '@angular/core';
import { TipoEquipamento } from 'src/app/Models/TipoEquipamento';
import { TipoEquipamentoService } from '../../tipo-equipamento.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastrar-tipo-equipamento',
  templateUrl: './cadastrar-tipo-equipamento.component.html',
  styleUrls: ['./cadastrar-tipo-equipamento.component.css']
})
export class CadastrarTipoEquipamentoComponent {

  tipoEquipamento: TipoEquipamento = { tipo: '', status: true };
  mensagemCadastro: string | null = null;

  constructor(private tipoEquipamentoService: TipoEquipamentoService,
    private router: Router, private snackBar: MatSnackBar,) {}  // Injete o serviço no construtor

  onSubmit(): void {
    // Chama o serviço para cadastrar o tipo de equipamento
    this.tipoEquipamentoService.cadastrarTipoEquipamento(this.tipoEquipamento).subscribe(
      (response) => {
        console.log('Tipo de equipamento cadastrado:', response);
        this.tipoEquipamento = { tipo: '', status: true };
        const errorMessage = "Tipo de equipamento cadastrado com sucesso!."
          this.snackBar.open(errorMessage, '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
      },
      (error) => {
        console.error('Erro ao cadastrar tipo de equipamento:', error);
        const errorMessage = "Preencha todos os campos destacados em vermelho."
          this.snackBar.open(errorMessage, '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
      }
    );
  }

  onVoltarClick(): void {
    this.router.navigate(['/dashboard']);
  }
}
