import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Colaborador } from 'src/app/Models/Colaborador';
import { ColaboradorService } from '../../colaborador.service';

@Component({
  selector: 'app-editar-colaborador',
  templateUrl: './editar-colaborador.component.html',
  styleUrls: ['./editar-colaborador.component.css']
})
export class EditarColaboradorComponent {

  constructor(
    public dialogRef: MatDialogRef<EditarColaboradorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { colaborador: Colaborador },
    private colaboradorService: ColaboradorService
  ) {}

  onCancelarClick(): void {
    this.dialogRef.close();
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
          this.dialogRef.close();
        },
        (erro) => {
          console.error('Erro ao atualizar o colaborador:', erro);
          // Adicione aqui a lógica para lidar com o erro, se necessário
        }
      );
    } else {
      console.error('ID do colaborador é indefinido. Não é possível editar.');
      // Adicione aqui a lógica para lidar com o caso em que o ID é indefinido
    }
  }
}
