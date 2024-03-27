import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Setor } from 'src/app/Models/Setor';
import { Location } from '@angular/common';
import { SetorService } from '../setor.service';

@Component({
  selector: 'app-editar-setor',
  templateUrl: './editar-setor.component.html',
  styleUrls: ['./editar-setor.component.css']
})
export class EditarSetorComponent implements OnInit {
  setor?: any;
  isLoading: boolean = false;

  constructor(
    private setorService: SetorService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    const setorId = Number(this.route.snapshot.paramMap.get('id'));
    if (setorId) {
      this.carregarSetor(setorId);
    } else {
      console.error('ID do setor não fornecido.');
      // Redirecionar ou exibir uma mensagem de erro, conforme necessário
    }
  }

  carregarSetor(id: number): void {
    this.isLoading = true;
    this.setorService.buscarSetorPorId(id).subscribe(
      (setor: Setor) => {
        this.setor = setor;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao carregar setor:', error);
        this.isLoading = false;
        // Exibir uma mensagem de erro, caso necessário
      }
    );
  }

  onSubmit() {
    const setorId = this.setor.id;
    console.log('id: ', setorId);
    console.log('setor', this.setor);
    if (setorId !== undefined) {
      this.setorService.atualizarSetor(setorId, this.setor)
        .subscribe(
          (setorAtualizado) => {
            console.log('Setor atualizado:', setorAtualizado);
            const mensagem = 'Setor atualizado com sucesso!';
            this.snackBar.open(mensagem, '', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });
            this.location.back();
          },
          (error) => {
            console.error('Erro ao atualizar o setor:', error);
            const errorMessage = 'Erro ao atualizar o setor. Por favor, tente novamente.';
            this.snackBar.open(errorMessage, '', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });
          }
        );
    } else {
      console.error('ID do setor é indefinido. Não é possível editar.');
      const errorMessage = 'Erro ao encontrar o setor. ID não existe ou é indefinido.';
      this.snackBar.open(errorMessage, '', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
    }
  }

  voltarParaSetores(): void {
    this.location.back();
  }
}
