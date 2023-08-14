import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteDTOResourceList } from 'src/app/entity/clienteDDTOResourceList';
import { EnderecoDTOViacep } from 'src/app/entity/enderecoViaCepDTO';
import { AvisosDialogService } from 'src/app/servicos/avisos-dialog.service';
import { ClienteService } from 'src/app/servicos/cliente.service';
import { EnderecoService } from 'src/app/servicos/endereco.service';
import { ClienteMapaVisualizarComponent } from '../cliente-mapa-visualizar/cliente-mapa-visualizar.component';
import { Coordenada } from 'src/app/entity/coordenada';

@Component({
  selector: 'app-cliente-mapa-edit',
  templateUrl: './cliente-mapa-edit.component.html',
  styleUrls: ['./cliente-mapa-edit.component.css']
})
export class ClienteMapaEditComponent implements OnInit {

  cnpj: string = '';
  listaErros: string[] = [];

  divEnderecoClienteMapa: string = 'mapa-tela';

  cliente: ClienteDTOResourceList = new ClienteDTOResourceList;
  mostraProgresso: boolean = false;

  latitude: number = -16.7590297;
  longitude: number = -49.2552972;

  constructor(
    private activatedRoute: ActivatedRoute,
    private clienteService: ClienteService,
    private enderecoService: EnderecoService,
    private snackBar: MatSnackBar,
    private avisoDialogService: AvisosDialogService,
    private dialogMostrarMapa: MatDialog
  ) {
  }


  ngOnInit(): void {
    this.listarPorCNPJ();
  }

  onSubmit() {

  }

  listarPorCNPJ() {
    this.mostraProgresso = true;

    this.activatedRoute.params.subscribe(parametro => {

      if (parametro && parametro['cnpj'] != undefined) {
        this.cnpj = parametro['cnpj'];
        this.clienteService
          .buscarPeloCnpj(this.cnpj).subscribe({
            next: (resposta) => {
              this.cliente = resposta;
              this.mostraProgresso = false;
            },
            error: (errorResponse) => {
              console.log(errorResponse);
              this.snackBar.open("Erro ao obter Cliente pelo CNPJ!", "ERRO!", {
                duration: 2000
              });
              this.mostraProgresso = false;
            }
          });
      }

    });
  }


  pesquisarEnderecoViaCep(cep: string) {
    this.mostraProgresso = true;
    this.enderecoService
      .retornarEnderecoViaCep(cep).subscribe({
        next: (resposta) => {
          this.mostraProgresso = false;
          this.definirEnderecoViaCep(resposta);
        },
        error: (errorResponse) => {
          console.log(errorResponse);
          this.snackBar.open("Erro ao obter endereço VIA CEP!", "ERRO!", {
            duration: 2000
          });
          this.mostraProgresso = false;
        }
      });
  }


  definirEnderecoViaCep(enderecoCiaCep: EnderecoDTOViacep) {
    this.avisoDialogService.openConfirmationDialog("Preencher as informações de endereço através da consulta obtida pelo VIA Cep?")
      .then(result => {
        if (result) {
          this.cliente.cep = enderecoCiaCep.cep;
          this.cliente.logradouro = enderecoCiaCep.logradouro;
          this.cliente.bairro = enderecoCiaCep.bairro;
          this.cliente.localidade = enderecoCiaCep.localidade;
          this.cliente.uf = enderecoCiaCep.uf;
        } else {
          this.snackBar.open("Informe o endereço manualmente!", "OK!", {
            duration: 3000
          });
        }
      });
  }


  abrirEnderecoClienteNoMapa(cliente: ClienteDTOResourceList) {


    const latNumber: number = Number(cliente.latitude);
    const longNumber: number = Number(cliente.longitude);

    const coordenada = new Coordenada();
    coordenada.latitude = latNumber
    coordenada.longitude = longNumber;

    const enderecoMapa = this.dialogMostrarMapa.open(ClienteMapaVisualizarComponent, {
      height: '400px',
      width: '500px',
      data: coordenada
    });



  }

}
