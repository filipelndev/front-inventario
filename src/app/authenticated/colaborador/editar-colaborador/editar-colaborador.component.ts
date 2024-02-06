import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Colaborador } from 'src/app/Models/Colaborador';
import { ColaboradorService } from '../../colaborador.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editar-colaborador',
  templateUrl: './editar-colaborador.component.html',
  styleUrls: ['./editar-colaborador.component.css']
})
export class EditarColaboradorComponent {

  isChecked = false;

  constructor(
    public dialogRef: MatDialogRef<EditarColaboradorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { colaborador: Colaborador },
    private colaboradorService: ColaboradorService,
    private snackBar: MatSnackBar
  ) {}

  onCancelarClick(): void {
    this.dialogRef.close();
  }

  toggle() {
    this.data.colaborador.status = !this.data.colaborador.status;
  }

  onSubmit() {
    // Lógica para salvar o colaborador
    console.log('Colaborador cadastrado:', this.data.colaborador);

    // Verificar se o ID do colaborador está definido
    if (this.data.colaborador.id !== undefined) {
      // Chamar o serviço para editar o colaborador
      this.colaboradorService.editarColaborador(this.data.colaborador.id, this.data.colaborador).subscribe(
        (colaboradorAtualizado) => {
          console.log('Colaborador atualizado:', colaboradorAtualizado);
          this.snackBar.open('Colaborador atualizado com sucesso!', '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          this.dialogRef.close();
        },
        (erro) => {
          console.error('Erro ao atualizar o colaborador:', erro);
          const errorMessage = "Preencha os campos destacados em vermelho."
          this.snackBar.open(errorMessage, '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
        }
      );
    } else {
      console.error('ID do colaborador é indefinido. Não é possível editar.');
      const errorMessage = "Erro ao encontrar o colaborador. ID não existe ou é indefinido."
          this.snackBar.open(errorMessage, '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
    }
  }
}
