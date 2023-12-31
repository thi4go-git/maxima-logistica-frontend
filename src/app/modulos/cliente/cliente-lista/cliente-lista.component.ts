import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/entity/cliente';
import { ClienteDTOResourceList } from 'src/app/entity/clienteDDTOResourceList';
import { AvisosDialogService } from 'src/app/servicos/avisos-dialog.service';
import { ClienteService } from 'src/app/servicos/cliente.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';



@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit, AfterViewInit {

  constructor(
    private service: ClienteService,
    private snackBar: MatSnackBar,
    private avisoDialogService: AvisosDialogService,
    private router: Router
  ) { }

  displayedColumns: string[] = [
    'id', 'nome', 'cnpj', 'cep', 'logradouro', 'bairro', 'localidade', 'uf',
    'latitude', 'longitude', 'edit', 'del'
  ];


  listaClientes: Cliente[] = [];

  mostraProgresso: boolean = false;

  dataSource: MatTableDataSource<Cliente> = new MatTableDataSource;
  totalElementos = 0;
  pagina = 0;
  tamanho = 10;
  pageSizeOptions: number[] = [this.tamanho];
  qtdeRegistros: number = 0;

  clienteFilter: ClienteDTOResourceList = new ClienteDTOResourceList();

  selection = new SelectionModel<Cliente>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.listarTodosFiltro();
  }


  listarTodosFiltro() {

    this.mostraProgresso = true;

    this.service.listarTodosPaginadoFilter(this.pagina, this.tamanho, this.clienteFilter)
      .subscribe({
        next: (resposta) => {
          this.listaClientes = resposta.content;
          this.dataSource = new MatTableDataSource(this.listaClientes);
          this.totalElementos = resposta.totalElements;
          this.pagina = resposta.number;
          this.qtdeRegistros = this.listaClientes.length;
          if (this.listaClientes.length == 0) {
            this.snackBar.open("Lista Vazia!", "Info!", {
              duration: 2000
            });
          }
          this.mostraProgresso = false;
        },
        error: (errorResponse) => {
          this.mostraProgresso = false;
          console.log(errorResponse);
          this.snackBar.open("Erro ao Obter Lista!", "ERRO!", {
            duration: 2000
          });
        }
      });
  }


  paginar(event: PageEvent) {
    this.pagina = event.pageIndex;
    this.tamanho = event.pageSize
    this.listarTodosFiltro();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: Cliente): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }


  verMapaEEditar(cliente: Cliente) {
    this.router.navigate(['/cliente/mapa-edit/' + cliente.cnpj]);
  }

  dialogExclusao(cliente: Cliente) {
    this.avisoDialogService.openConfirmationDialog("Confirma a Exclusão do Cliente CNPJ '"
      + cliente.cnpj + "' ?")
      .then(result => {
        if (result) {
          this.deletarCliente(cliente.cnpj);
        } else {
          this.snackBar.open("EXCLUSÃO Cancelada!", "Cancelado!", {
            duration: 3000
          });
        }
      });
  }

  deletarCliente(cnpj: string) {
    this.service.deletarCliente(cnpj)
      .subscribe({
        next: (resposta) => {
          this.snackBar.open("Sucesso ao excluir Cliente!", "SUCESSO!", {
            duration: 3000
          });
          this.listarTodosFiltro();
        },
        error: (errorResponse) => {
          console.log(errorResponse);
          this.snackBar.open("Erro ao excluir Cliente!", "ERRO!", {
            duration: 3000
          });
        }
      });
  }

}
