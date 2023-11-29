import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Empresa } from 'src/app/Models/Empresa';
import { EmpresaService } from '../../empresa.service';

@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.css']
})
export class EditarEmpresaComponent {
  constructor(
    public dialogRef: MatDialogRef<EditarEmpresaComponent>,
    private empresaService: EmpresaService,
    @Inject(MAT_DIALOG_DATA) public data: { empresa: Empresa }
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
          this.dialogRef.close();
        },
        (erro) => {
          console.error('Erro ao atualizar a empresa:', erro);
          // Adicione aqui a lógica para lidar com o erro, se necessário
        }
      );
    } else {
      console.error('ID da empresa é indefinido. Não é possível editar.');
      // Adicione aqui a lógica para lidar com o caso em que o ID é indefinido
    }
  }

}
