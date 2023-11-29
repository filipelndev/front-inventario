import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Equipamento } from 'src/app/Models/Equipamento';
import { EmpresaService } from '../../empresa.service';
import { ColaboradorService } from '../../colaborador.service';
import { Colaborador } from 'src/app/Models/Colaborador';
import { Empresa } from 'src/app/Models/Empresa';

@Component({
  selector: 'app-editar-equipamentos',
  templateUrl: './editar-equipamentos.component.html',
  styleUrls: ['./editar-equipamentos.component.css']
})
export class EditarEquipamentosComponent implements OnInit{
  constructor(
    private empresaService: EmpresaService, private colaboradorService: ColaboradorService,
    public dialogRef: MatDialogRef<EditarEquipamentosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { equipamento: Equipamento }
  ) {}

  empresas: Empresa[] = [];
  colaboradores: Colaborador[] = [];

  ngOnInit(): void {
    this.carregarEmpresas();
    this.carregarColaboradores();
  }

  carregarEmpresas(): void {
    this.empresaService.getEmpresas().subscribe((empresas) => {
      this.empresas = empresas;
    });
  }

  carregarColaboradores(): void {
    this.colaboradorService.getColaboradores().subscribe((colaboradores) => {
      this.colaboradores = colaboradores;
    });
  }

  onCancelarClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    // Lógica para salvar o equipamento
    console.log('Equipamento cadastrado:', this.data.equipamento);
    this.dialogRef.close();
    // Adicione aqui a lógica para salvar o equipamento no serviço/back-end
  }
}
