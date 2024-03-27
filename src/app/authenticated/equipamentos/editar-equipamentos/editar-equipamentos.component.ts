import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../empresa.service';
import { ColaboradorService } from '../../colaborador.service';
import { EquipamentoService } from '../../equipamento.service';
import { TipoEquipamentoService } from '../../tipo-equipamento.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Setor } from 'src/app/Models/Setor';
import { SetorService } from 'src/app/setor/setor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from 'src/app/Models/Empresa';
import { Colaborador } from 'src/app/Models/Colaborador';
import { TipoEquipamento } from 'src/app/Models/TipoEquipamento';
import { Location } from '@angular/common';

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
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private setorService: SetorService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  isLoading: boolean = false;
  empresas?: Empresa[] = [];
  colaboradores?: Colaborador[] = [];
  tipoEquipamento?: TipoEquipamento[] = [];
  setores?: Setor[] = []
  equipamento?: any;


  ngOnInit(): void {
    this.isLoading = true;
    this.carregarEmpresas();
    this.getColaboradores();
    this.carregarTipo();
    this.getSetores();
    this.route.paramMap.subscribe(params => {
      const equipamentoId = Number(params.get('id'));
      if (equipamentoId) {
        // Aqui você pode chamar um serviço para obter os detalhes do equipamento com base no ID
        this.equipamentoService.getEquipamentoForId(equipamentoId).subscribe(equipamento => {
          this.equipamento = equipamento;
          this.carregarEmpresas();
          this.getColaboradores();~
          this.getSetores();
          this.carregarTipo();
        });
      }
    });
  }

  carregarEmpresas(): void {
    this.empresaService.getEmpresas().subscribe((empresas: any) => {
      this.empresas = empresas.results;
    });
  }

  getColaboradores(): void {
    this.colaboradorService.getColaboradores().subscribe(
      (colaboradores: any) => {
        this.colaboradores = colaboradores.results;
      },
      error => {
        console.error('Erro ao carregar colaboradores:', error);
      }
    );
  }

  getSetores(): void {
    this.setorService.listarSetores().subscribe(
      (setores: any) => {
        this.setores = setores.results;
      },
      error => {
        console.error('Erro ao carregar colaboradores:', error);
      }
    );
  }


  carregarTipo(): void {
    this.tipoEquipamentoService.getTipoEquipamento().subscribe((tipoEquipamento: any) => {
      this.tipoEquipamento = tipoEquipamento.results;
      this.isLoading = false;
    });
  }

  onSubmit() {
    const equipamentoId = this.equipamento.id;
    if (equipamentoId !== undefined) {
      this.equipamento.setor = this.equipamento.setor_id;
      this.equipamentoService.editarEquipamento(equipamentoId, this.equipamento).subscribe(
        () => {
          const mensagem = "Equipamento atualizado com sucesso!";
          this.snackBar.open(mensagem, '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          this.location.back();
        },
        (errorResponse) => {
          console.error('Erro ao atualizar o equipamento:', errorResponse);

          // Verifica se há erros específicos do campo e formata-os
          let errorMessage = "Erro ao atualizar o equipamento:";
          const errors = errorResponse.error;
          Object.keys(errors).forEach(key => {
            const fieldErrors = errors[key];
            fieldErrors.forEach((error: string) => {
              errorMessage += `\n${key}: ${error}`;
            });
          });

          // Exibe a mensagem de erro formatada
          this.snackBar.open(errorMessage, '', {
            duration: 5000, // Aumente a duração para dar tempo suficiente para ler
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
        }
      );
    } else {
      console.error('ID do equipamento é indefinido. Não é possível atualizar.');
      const errorMessage = "Erro ao localizar o equipamento. ID não existe ou é indefinido";
      this.snackBar.open(errorMessage, '', {
        duration: 5000,
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

  voltarParaUsuarios(): void {
    // Implemente a navegação de volta para a lista de usuários ou página desejada
    this.location.back();
  }
}
