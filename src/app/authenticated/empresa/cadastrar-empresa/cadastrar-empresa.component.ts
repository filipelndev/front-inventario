import { Component } from '@angular/core';
import { Empresa } from 'src/app/Models/Empresa';
import { EmpresaService } from '../../empresa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-empresa',
  templateUrl: './cadastrar-empresa.component.html',
  styleUrls: ['./cadastrar-empresa.component.css']
})
export class CadastrarEmpresaComponent {
  empresa: Empresa = { nome: '', cnpj: '',  status: true };
  mensagemCadastro: string | null = null;
  constructor(private empresaService: EmpresaService, private router: Router) {}

  onSubmit(): void {
    this.empresaService.cadastrarEmpresa(this.empresa).subscribe(
      (response) => {
        console.log('Empresa cadastrada com sucesso!', response);
        this.empresa = { nome: '', cnpj: '', status: true };
        this.mensagemCadastro = 'Empresa cadastrada com sucesso!'
        setTimeout(() => {
          this.mensagemCadastro = null;
        }, 4000);
      },
      error => {
        console.error('Erro ao cadastrar colaborador', error);
        this.mensagemCadastro = 'Erro ao cadastrar colaborador. Por favor, tente novamente.';
        setTimeout(() => {
          this.mensagemCadastro = null;
        }, 4000);
      }
    );
  }

  onVoltarClick(): void {
    this.router.navigate(['/dashboard']);
  }
}
