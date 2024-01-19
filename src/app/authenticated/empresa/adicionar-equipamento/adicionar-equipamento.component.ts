import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmpresaService } from '../../empresa.service';

@Component({
  selector: 'app-adicionar-equipamento',
  templateUrl: './adicionar-equipamento.component.html',
  styleUrls: ['./adicionar-equipamento.component.css']
})
export class AdicionarEquipamentoComponent implements OnInit {
  empresaId: number | undefined;
  equipamentoForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private empresaService: EmpresaService,
    private fb: FormBuilder
  ) {
    this.equipamentoForm = this.fb.group({
      tagPatrimonio: ['', Validators.required],
      tipoEquipamento: ['', Validators.required],
      situacao: ['', Validators.required],
      dataCompra: ['', Validators.required],
      // Adicione outros campos conforme necessário
    });
  }

  ngOnInit(): void {
    // Subscreve o evento de alteração de parâmetros na rota
    this.route.paramMap.subscribe(params => {
      // Obtém o ID da empresa a partir dos parâmetros da rota
      this.empresaId = Number(params.get('id'));
    });
  }

  /*cadastrarEquipamento(): void {
    if (this.empresaId) {
      const equipamentoData = this.equipamentoForm.value;

      // Adicione lógica para cadastrar o equipamento na empresa
      this.empresaService.cadastrarEquipamento(this.empresaId, equipamentoData).subscribe(
        (response) => {
          console.log('Equipamento cadastrado com sucesso:', response);
          // Adicione aqui a lógica de redirecionamento ou feedback ao usuário
        },
        (error) => {
          console.error('Erro ao cadastrar equipamento:', error);
          // Adicione aqui a lógica para lidar com o erro, se necessário
        }
      );
    }
  }*/
}
