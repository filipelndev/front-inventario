import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Equipamento } from 'src/app/Models/Equipamento';
import { MatDialog } from '@angular/material/dialog';
import { EditarEquipamentosComponent } from '../editar-equipamentos/editar-equipamentos.component';

@Component({
  selector: 'app-listar-equipamentos',
  templateUrl: './listar-equipamentos.component.html',
  styleUrls: ['./listar-equipamentos.component.css']
})
export class ListarEquipamentosComponent implements OnInit {
  displayedColumns: string[] = ['tagPatrimonio', 'tipoEquipamento','situacao', 'marca', 'modelo', 'empresa', 'colaborador', 'status', 'editar'];
  dataSource = new MatTableDataSource<Equipamento>([]);

  constructor(private dialog: MatDialog) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    // Aqui você precisa obter os dados dos equipamentos e atribuí-los à dataSource
    this.dataSource.data = this.obterDadosEquipamentos();
    this.dataSource.paginator = this.paginator; // Configura o paginador
  }

  obterDadosEquipamentos(): Equipamento[] {
    // Substitua isso pela lógica para obter os dados reais dos equipamentos
    return [
      { tagPatrimonio: '123', tipoEquipamento: 'Computador', situacao: 'Em Operação', pedidoNFE: '456', dataCompra: new Date(), colaborador: "colaborador 1", empresa: "empresa 1", marca: "hp", modelo: "lenovo", especificacoes: "notebook lenovo novo", acessoRemoto: false, observacoes: "testando", status: true },
      { tagPatrimonio: '789', tipoEquipamento: 'Impressora', situacao: 'Novo', pedidoNFE: '101112', dataCompra: new Date(), colaborador: "colaborador 2", empresa: "empresa 2", marca: "teste", modelo: "novo teste", especificacoes: "notebook teste novo", acessoRemoto: false, observacoes: "testando2", status: false },
      // Adicione mais equipamentos conforme necessário
    ];
  }

  abrirMenuPopup(equipamento: Equipamento): void {
    const dialogRef = this.dialog.open(EditarEquipamentosComponent, {
      width: '1500px', // Ajuste conforme necessário
      data: { equipamento }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Lógica a ser executada após o fechamento do menu popup (se necessário)
    });
  }
}
