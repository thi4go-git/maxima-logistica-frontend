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
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from 'src/environments/environment';

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

  enderecoPesquisar: string = '';
  coordenadaObtida: string = '';

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

    const dialogMapa = this.dialogMostrarMapa.open(ClienteMapaVisualizarComponent, {
      height: '520px',
      width: '450px',
      data: coordenada
    });

    this.visualizarMapa();
  }



  obterNovaCoordenadasDoEndereco() {
    if (this.enderecoPesquisar == null ||
      this.enderecoPesquisar == undefined) {
      alert("Informe o endereço: (Nome rua, Nº rua, Bairro, Cidade ou CEP) ")
    } else {

      let loader = new Loader({
        apiKey: environment.tokenGoogleMaps
      })

      loader.load().then(() => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: this.enderecoPesquisar }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results != null) {
              const localizacao = results[0].geometry.location;
              this.coordenadaObtida = '' + localizacao;

              const valores = this.coordenadaObtida.slice(1, -1).split(',');
              const latitudeObtida = parseFloat(valores[0].trim());
              const longitudeObtida = parseFloat(valores[1].trim());

              this.cliente.latitude = latitudeObtida;
              this.cliente.longitude = longitudeObtida;

              this.snackBar.open("Coordenada Obtida: Latitude: " + latitudeObtida + " - Longitude: " + longitudeObtida + " - Favor conferir no mapa!", "OK!", {
                duration: 4000
              });

            }
          } else {
            console.error("Geocodificação falhou devido a: " + status);

            this.snackBar.open("Geocodificação falhou devido a: " + status, "OK!", {
              duration: 3000
            });
          }
        });
      });

    }
  }


  visualizarMapa() {
    const coordenadaObtida: Coordenada = new Coordenada;
    coordenadaObtida.latitude = Number(this.cliente.latitude);
    coordenadaObtida.longitude = Number(this.cliente.longitude);
    const dialogMapa = this.dialogMostrarMapa.open(ClienteMapaVisualizarComponent, {
      height: '520px',
      width: '450px',
      data: coordenadaObtida
    });
  }


  atualizarCliente() {
    this.mostraProgresso = true;
    if (this.cliente.cep) {
      this.cliente.cep = this.cliente.cep.replaceAll("-", "");
    }
    this.clienteService
      .atualizarCliente(this.cliente).subscribe({
        next: (resposta) => {
          this.mostraProgresso = false;
          this.cliente = resposta;
        },
        error: (errorResponse) => {
          console.log(errorResponse);
          this.snackBar.open("Erro ao Atualizar Cliente", "ERRO!", {
            duration: 2000
          });
          this.mostraProgresso = false;
        }
      });
  }


}
