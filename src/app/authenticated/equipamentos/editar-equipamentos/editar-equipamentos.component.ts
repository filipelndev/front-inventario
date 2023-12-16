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
    @Inject(MAT_DIALOG_DATA) public data: { equipamento: Equipamento }
  ) {}

  empresas: Empresa[] = [];
  colaboradores: Colaborador[] = [];
  tipoEquipamento: TipoEquipamento[] = [];
  nome_empresa: any;
  nome_colaborador: any;
  nome_tipo_equipamento: any;

  ngOnInit(): void {
    this.carregarEmpresas();
    this.carregarColaboradores();
    this.carregarTipo();
    this.nome_empresa = this.data.equipamento.empresa_nome;
    this.nome_colaborador = this.data.equipamento.colaborador_nome;
    this.nome_tipo_equipamento = this.data.equipamento.tipo_equipamento_nome;
  }

  carregarEmpresas(): void {
    this.empresaService.getEmpresas().subscribe((empresas: any) => {
      this.empresas = empresas.results;
    });
  }

  carregarColaboradores(): void {
    this.colaboradorService.getColaboradores().subscribe((colaboradores: any) => {
      this.colaboradores = colaboradores.results;
    });
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
          this.dialogRef.close();
        },
        (erro) => {
          console.error('Erro ao atualizar o equipamento:', erro);
          // Adicione aqui a lógica para lidar com o erro, se necessário
        }
      );
    } else {
      console.error('ID do equipamento é indefinido. Não é possível atualizar.');
      // Adicione aqui a lógica para lidar com o caso em que o ID é indefinido
    }
  }
}
