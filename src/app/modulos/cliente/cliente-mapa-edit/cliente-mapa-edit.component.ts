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
import { IFormCanDeactivate } from 'src/app/guardiao/iform-candeactivate';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cliente-mapa-edit',
  templateUrl: './cliente-mapa-edit.component.html',
  styleUrls: ['./cliente-mapa-edit.component.css']
})
export class ClienteMapaEditComponent implements OnInit, IFormCanDeactivate {

  cnpj: string = '';
  listaErros: string[] = [];

  divEnderecoClienteMapa: string = 'mapa-tela';

  cliente: ClienteDTOResourceList = new ClienteDTOResourceList;
  mostraProgresso: boolean = false;

  enderecoPesquisar: string = '';
  coordenadaObtida: string = '';

  formulario!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private clienteService: ClienteService,
    private enderecoService: EnderecoService,
    private snackBar: MatSnackBar,
    private avisoDialogService: AvisosDialogService,
    private dialogMostrarMapa: MatDialog,
    private router: Router,
    private formBuild: FormBuilder,
  ) {
    this.criaFormCadastro();
  }



  onSubmit() {
    if (this.cliente.id != undefined && this.cliente.id
      != null && this.cliente.id != 0) {
      this.atualizarCliente();
    } else {
      this.salvarCliente();
    }
  }

  formularioValido(): boolean {
    return this.formulario.valid && this.formulario.controls['latitude'].value && this.formulario.controls['longitude'].value;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(parametro => {
      if (parametro && parametro['cnpj'] != undefined) {
        this.cnpj = parametro['cnpj'];
        this.listarPorCNPJ();
      }
    });
  }

  private criaFormCadastro() {
    this.formulario = this.formBuild.group({
      id: [{ value: this.cliente.id, disabled: true },],
      nome: [this.cliente.nome, Validators.required],
      cnpj: [{ value: this.cliente.cnpj, disabled: false }, [Validators.required, Validators.pattern(/^\d{14}$/)]],
      cep: [this.cliente.cep, [Validators.required, Validators.pattern(/^\d{8}$/)]],
      logradouro: [this.cliente.logradouro, Validators.required],
      bairro: [this.cliente.bairro, Validators.required],
      localidade: [this.cliente.localidade, Validators.required],
      uf: [this.cliente.uf, [Validators.required, this.ufValidator]],
      latitude: [{ value: this.cliente.latitude, disabled: true }, Validators.required],
      longitude: [{ value: this.cliente.longitude, disabled: true }, Validators.required],
      enderecoPesquisa: [this.enderecoPesquisar],
    });
  }


  private criaFormUpdateCadastro() {
    this.formulario = this.formBuild.group({
      id: [{ value: this.cliente.id, disabled: true }, Validators.required],
      nome: [this.cliente.nome, Validators.required],
      cnpj: [{ value: this.cliente.cnpj, disabled: true }, [Validators.required, Validators.pattern(/^\d{14}$/)]],
      cep: [this.cliente.cep, [Validators.required, Validators.pattern(/^\d{8}$/)]],
      logradouro: [this.cliente.logradouro, Validators.required],
      bairro: [this.cliente.bairro, Validators.required],
      localidade: [this.cliente.localidade, Validators.required],
      uf: [this.cliente.uf, [Validators.required, this.ufValidator]],
      latitude: [{ value: this.cliente.latitude, disabled: true }, Validators.required],
      longitude: [{ value: this.cliente.longitude, disabled: true }, Validators.required],
      enderecoPesquisa: [this.enderecoPesquisar],
    });
  }


  podeDesativarRota(): boolean {
    //const houveAlteracaoForm: boolean = this.formulario.dirty
    // if (houveAlteracaoForm) {
    //  return confirm('As informações não foram salvas. Deseja abandonar o formulário?');
    // }
    return true;
  }


  listarPorCNPJ() {
    this.mostraProgresso = true;
    this.clienteService
      .buscarPeloCnpj(this.cnpj).subscribe({
        next: (resposta) => {
          this.cliente = resposta;
          this.mostraProgresso = false;
          this.criaFormUpdateCadastro();
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


  pesquisarEnderecoViaCep() {
    if (this.formulario.controls['cep'].valid) {

      const formValues = this.formulario.value;
      const cep: string = formValues.cep

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
  }


  definirEnderecoViaCep(enderecoCiaCep: EnderecoDTOViacep) {
    this.avisoDialogService.openConfirmationDialog("Preencher as informações de endereço através da consulta obtida pelo VIA Cep?")
      .then(result => {
        if (result) {
          this.formulario.patchValue({
            cep: enderecoCiaCep.cep.replace("-", ""),
            logradouro: enderecoCiaCep.logradouro,
            bairro: enderecoCiaCep.bairro,
            localidade: enderecoCiaCep.localidade,
            uf: enderecoCiaCep.uf,
          });
        } else {
          this.snackBar.open("Informe o endereço manualmente!", "OK!", {
            duration: 3000
          });
        }
      });
  }


  abrirEnderecoClienteNoMapa() {
    const latNumber: number = Number(this.formulario.controls['latitude'].value);
    const longNumber: number = Number(this.formulario.controls['longitude'].value);

    if (latNumber != undefined && latNumber != 0 && !Number.isNaN(latNumber)
      &&
      longNumber != undefined && longNumber != 0 && !Number.isNaN(longNumber)) {

      const coordenada = new Coordenada();
      coordenada.latitude = latNumber
      coordenada.longitude = longNumber;

      const dialogMapa = this.dialogMostrarMapa.open(ClienteMapaVisualizarComponent, {
        height: '520px',
        width: '450px',
        data: coordenada
      });

    } else {
      alert("Não existem coordenadas. Favor obter uma Coordenada (Latitude e Longitude).")
    }

  }



  obterNovaCoordenadasDoEndereco() {

    const enderecoConsulta: string = this.formulario.controls['enderecoPesquisa'].value.trim();

    if (enderecoConsulta == null ||
      enderecoConsulta == undefined || enderecoConsulta.toString().length == 0) {
      alert("Informe o endereço: (Nome rua, Nº rua, Bairro, Cidade ou CEP) ")
    } else {

      let loader = new Loader({
        apiKey: environment.tokenGoogleMaps
      })

      loader.load().then(() => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: enderecoConsulta }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results != null) {
              const localizacao = results[0].geometry.location;
              this.coordenadaObtida = '' + localizacao;

              const valores = this.coordenadaObtida.slice(1, -1).split(',');
              const latitudeObtida = parseFloat(valores[0].trim());
              const longitudeObtida = parseFloat(valores[1].trim());

              this.cliente.latitude = latitudeObtida;
              this.cliente.longitude = longitudeObtida;

              this.formulario.patchValue({
                latitude: latitudeObtida,
                longitude: longitudeObtida
              });

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




  salvarCliente() {

    if (this.formularioValido()) {
      this.mostraProgresso = true;

      this.passarInfoFormParaCliente();

      if (this.cliente.cep) {
        this.cliente.cep = this.cliente.cep.replaceAll("-", "");
      }
      if (this.cliente.cnpj) {
        this.cliente.cnpj = this.cliente.cnpj.replaceAll("-", "")
          .replaceAll(".", "")
          .replaceAll("/", "");
      }
      this.clienteService
        .salvarCliente(this.cliente).subscribe({
          next: (resposta) => {
            this.listaErros = [];
            this.mostraProgresso = false;
            this.cliente = resposta;
            this.snackBar.open("SUCESSO ao SALVAR Cliente", "SUCESSO!", {
              duration: 3000
            });
            this.router.navigate(['cliente/lista']);
          },
          error: (errorResponse) => {
            this.listaErros = errorResponse.error.erros
            console.log(errorResponse);
            this.snackBar.open("Erro ao SALVAR Cliente verifique a lista de erros.", "ERRO!", {
              duration: 2000
            });
            this.mostraProgresso = false;
          }
        });

    }


  }


  atualizarCliente() {

    if (this.formularioValido()) {
      this.mostraProgresso = true;

      this.passarInfoFormParaCliente();

      if (this.cliente.cep) {
        this.cliente.cep = this.cliente.cep.replaceAll("-", "");
      }
      this.clienteService
        .atualizarCliente(this.cliente).subscribe({
          next: (resposta) => {
            this.listaErros = [];
            this.mostraProgresso = false;
            this.cliente = resposta;
            this.snackBar.open("SUCESSO ao Atualizar Cliente", "SUCESSO!", {
              duration: 3000
            });
            this.router.navigate(['cliente/mapa-edit/' + this.cliente.cnpj]);
          },
          error: (errorResponse) => {
            this.listaErros = errorResponse.error.erros
            console.log(errorResponse);
            this.snackBar.open("Erro ao Atualizar Cliente verifique a lista de erros.", "ERRO!", {
              duration: 2000
            });
            this.mostraProgresso = false;
          }
        });

    }

  }


  ufValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (!value || value.length !== 2 || !/^[a-zA-Z]+$/.test(value)) {
      return { 'ufInvalida': true };
    }
    return null;
  }

  private passarInfoFormParaCliente() {
    this.cliente.id = this.formulario.controls['id'].value;
    this.cliente.nome = this.formulario.controls['nome'].value;
    this.cliente.cnpj = this.formulario.controls['cnpj'].value;
    this.cliente.cep = this.formulario.controls['cep'].value;
    this.cliente.logradouro = this.formulario.controls['logradouro'].value;
    this.cliente.bairro = this.formulario.controls['bairro'].value;
    this.cliente.localidade = this.formulario.controls['localidade'].value;
    this.cliente.uf = this.formulario.controls['uf'].value;
    this.cliente.latitude = this.formulario.controls['latitude'].value;
    this.cliente.longitude = this.formulario.controls['longitude'].value;
  }

}
