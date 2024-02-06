import { Component } from '@angular/core';
import { Empresa } from 'src/app/Models/Empresa';
import { EmpresaService } from '../../empresa.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastrar-empresa',
  templateUrl: './cadastrar-empresa.component.html',
  styleUrls: ['./cadastrar-empresa.component.css']
})
export class CadastrarEmpresaComponent {
  empresa: Empresa = { nome: '', cnpj: '',  status: true };
  mensagemCadastro: string | null = null;
  constructor(private empresaService: EmpresaService, private router: Router, private snackBar: MatSnackBar) {}

  onSubmit(): void {
    this.empresaService.cadastrarEmpresa(this.empresa).subscribe(
      (response) => {
        console.log('Empresa cadastrada com sucesso!', response);
        this.empresa = { nome: '', cnpj: '', status: true };
        const errorMessage = "Empresa cadastrada com sucesso!."
          this.snackBar.open(errorMessage, '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
      },
      error => {
        console.error('Erro ao cadastrar colaborador', error);
        const errorMessage = "Preencha os campos destacados em vermelho."
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
