import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Equipamento } from 'src/app/Models/Equipamento';
import { EmpresaService } from '../../empresa.service';
import { ColaboradorService } from '../../colaborador.service';
import { Colaborador } from 'src/app/Models/Colaborador';
import { Empresa } from 'src/app/Models/Empresa';
import { EquipamentoService } from '../../equipamento.service';
import { TipoEquipamentoService } from '../../tipo-equipamento.service';
import { TipoEquipamento } from 'src/app/Models/TipoEquipamento';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editar-equipamentos',
  templateUrl: './editar-equipamentos.component.html',
  styleUrls: ['./editar-equipamentos.component.css']
})
export class EditarEquipamentosComponent implements OnInit{
  constructor(
    private empresaService: EmpresaService,
    private colaboradorService: ColaboradorService,
    private equipamentoService: EquipamentoService,
    private tipoEquipamentoService: TipoEquipamentoService,
    public dialogRef: MatDialogRef<EditarEquipamentosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { equipamento: Equipamento },
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  empresas: Empresa[] = [];
  colaboradores: Colaborador[] = [];
  tipoEquipamento: TipoEquipamento[] = [];
  nome_empresa: any;
  nome_colaborador: any;
  nome_tipo_equipamento: any;

  ngOnInit(): void {
    this.carregarEmpresas();
    this.getColaboradores();
    this.carregarTipo();
    console.log(this.data);
    this.nome_empresa = this.data.equipamento.empresa_nome;
    this.nome_colaborador = this.data.equipamento.colaborador_nome;
    this.nome_tipo_equipamento = this.data.equipamento.tipo_equipamento_nome;
  }

  carregarEmpresas(): void {
    this.empresaService.getEmpresas().subscribe((empresas: any) => {
      this.empresas = empresas.results;
      console.log(empresas);
    });
  }

  getColaboradores(): void {
    this.colaboradorService.getColaboradores().subscribe(
      (colaboradores: any) => {
        this.colaboradores = colaboradores.results;
        console.log(colaboradores);
      },
      error => {
        console.error('Erro ao carregar colaboradores:', error);
      }
    );
  }


  carregarTipo(): void {
    this.tipoEquipamentoService.getTipoEquipamento().subscribe((tipoEquipamento: any) => {
      this.tipoEquipamento = tipoEquipamento.results;
    });
  }

  onCancelarClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    const equipamentoId = this.data.equipamento.id;

    if (equipamentoId !== undefined) {
      this.equipamentoService.editarEquipamento(equipamentoId, this.data.equipamento).subscribe(
        (equipamentoAtualizado) => {
          console.log('Equipamento atualizado:', equipamentoAtualizado);
          const errorMessage = "Equipamento atualizado com sucesso!."
          this.snackBar.open(errorMessage, '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          this.dialogRef.close();
        },
        (erro) => {
          console.error('Erro ao atualizar o equipamento:', erro);
          const errorMessage = "Preencha os campos destacados em vermelho."
          this.snackBar.open(errorMessage, '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
        }
      );
    } else {
      console.error('ID do equipamento é indefinido. Não é possível atualizar.');
      const errorMessage = "Erro ao localizar o equipamento. ID não existe ou é indefinido"
          this.snackBar.open(errorMessage, '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
    }
  }

  getDescricaoSituacao(situacao: string): string {
    switch (situacao) {
      case '0':
        return 'Novo';
      case '1':
        return 'Em operação';
      case '2':
        return 'Em manutenção';
      case '3':
        return 'Disponível';
      case '4':
        return 'Indisponível';
      default:
        return 'Desconhecido';
    }
  }
}
