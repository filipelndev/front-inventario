import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Empresa } from 'src/app/Models/Empresa';
import { EmpresaService } from '../../empresa.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.css']
})
export class EditarEmpresaComponent {
  constructor(
    public dialogRef: MatDialogRef<EditarEmpresaComponent>,
    private empresaService: EmpresaService,
    @Inject(MAT_DIALOG_DATA) public data: { empresa: Empresa },
    private snackBar: MatSnackBar
  ) {
  }

  onCancelarClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    // Lógica para salvar o colaborador
    console.log('Empresa cadastrada: ', this.data.empresa);

    // Verificar se o ID do colaborador está definido
    if (this.data.empresa.id !== undefined) {
      // Chamar o serviço para editar o colaborador
      this.empresaService.editarEmpresa(this.data.empresa.id, this.data.empresa).subscribe(
        (empresaAtualizada) => {
          console.log('empresa atualizada:', empresaAtualizada);
          const errorMessage = "Empresa atualizada com sucesso!."
          this.snackBar.open(errorMessage, '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          this.dialogRef.close();
        },
        (erro) => {
          console.error('Erro ao atualizar a empresa:', erro);
          const errorMessage = "Preencha os campos destacados em vermelho."
          this.snackBar.open(errorMessage, '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
        }
      );
    } else {
      console.error('ID da empresa é indefinido. Não é possível editar.');
      const errorMessage = "Erro ao encontrar o empresa. ID não existe ou é indefinido."
          this.snackBar.open(errorMessage, '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
    }
  }

}
