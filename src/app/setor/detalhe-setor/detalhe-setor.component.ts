import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SetorService } from '../setor.service';
import { EquipamentoService } from 'src/app/authenticated/equipamento.service';

@Component({
  selector: 'app-detalhe-setor',
  templateUrl: './detalhe-setor.component.html',
  styleUrls: ['./detalhe-setor.component.css']
})
export class DetalheSetorComponent implements OnInit {
  isLoading: boolean = false;
  // Variáveis para armazenar informações do setor e lista de equipamentos
  setor: any; // Aqui você pode definir a estrutura de dados do setor
  equipamentos: any[] = []; // Aqui você pode definir a estrutura de dados dos equipamentos

  constructor(private route: ActivatedRoute, private router: Router,
    private setorService: SetorService, private equipamentoService: EquipamentoService) { }

  ngOnInit(): void {
    // Use o ActivatedRoute para obter o ID do setor da URL e carregar os dados do setor e dos equipamentos
    this.route.paramMap.subscribe(params => {
      this.isLoading = true;
      const setorId = Number(params.get('id'));
      if (setorId) {
        // Aqui você pode chamar um serviço para obter os detalhes do setor com base no ID
        this.setorService.buscarSetorPorId(setorId).subscribe(setor => this.setor = setor);
        this.isLoading = false;
        // Aqui você pode chamar um serviço para obter a lista de equipamentos do setor com base no ID do setor
        // this.equipamentoService.getEquipamentosBySetorId(setorId).subscribe(equipamentos => this.equipamentos = equipamentos);
      }
    });
  }

  voltarParaUsuarios(): void {
    // Navegar de volta para a página anterior (ou outra página desejada)
    this.router.navigate(['/dashboard']);
  }
}
