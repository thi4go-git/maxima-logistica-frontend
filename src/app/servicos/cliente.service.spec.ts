import { TestBed, getTestBed } from '@angular/core/testing';

import { ClienteService } from './cliente.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClienteDTOResourceList } from '../entity/clienteDDTOResourceList';
import { ClientePaginator } from '../entity/clientePaginator';
import { environment } from 'src/environments/environment';

describe('ClienteService', () => {

  let clienteService: ClienteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    const testBed = getTestBed();
    clienteService = testBed.get(ClienteService);
    httpMock = testBed.get(HttpTestingController);
  });

  it('Deve Criar o serviço ClienteService', () => {
    expect(clienteService).toBeTruthy();
  });

  it('Teste método listarTodosPaginadoFilter', () => {
    const page = 0;
    const size = 15;
    const filtro: ClienteDTOResourceList = new ClienteDTOResourceList;

    const retornoMock: ClientePaginator = new ClientePaginator;
    retornoMock.totalElements = 10;
    retornoMock.size = 500;

    clienteService.listarTodosPaginadoFilter(page, size, filtro).subscribe((retorno) => {
      expect(retorno).toBe(retornoMock);
    });

    const request = httpMock.expectOne(environment.apiUrl + '/api/clientes/filter?page=0&size=15');
    expect(request.request.method).toBe('POST');

    httpMock.verify();
  });

  it('Teste método buscarPeloCnpj', () => {
    const cnpj = '12345678901234';

    const retornoMock: ClienteDTOResourceList = {
      id: 5,
      nome: 'teste@govbr.com.br',
      cnpj: cnpj,
      cep: '123456',
      logradouro: '123456',
      bairro: 'http://localhost:81',
      localidade: 'http://localhost:81',
      uf: 'http://localhost:81',
      latitude: 'http://localhost:81',
      longitude: 'http://localhost:81',
    };

    clienteService.buscarPeloCnpj(cnpj).subscribe((retorno) => {
      expect(retorno).toBe(retornoMock);
    });

    const request = httpMock.expectOne(environment.apiUrl + '/api/clientes/' + cnpj);
    expect(request.request.method).toBe('GET');

    httpMock.verify();
  });

  it('Teste método salvarCliente', () => {

    const cliCadastrarMock: ClienteDTOResourceList = {
      id: 0,
      nome: 'teste@govbr.com.br',
      cnpj: '123456',
      cep: '123456',
      logradouro: '123456',
      bairro: 'bairro',
      localidade: 'localidade',
      uf: 'uf',
      latitude: 'latitude',
      longitude: 'longitude',
    };

    clienteService.salvarCliente(cliCadastrarMock).subscribe((retorno) => {
      expect(retorno).toBe(cliCadastrarMock);
    });

    const request = httpMock.expectOne(environment.apiUrl + '/api/clientes');
    expect(request.request.method).toBe('POST');

    httpMock.verify();
  });

  it('Teste método atualizarCliente', () => {

    const cliAtualziarMock: ClienteDTOResourceList = {
      id: 0,
      nome: 'teste@govbr.com.br',
      cnpj: '123456',
      cep: '123456',
      logradouro: '123456',
      bairro: 'bairro',
      localidade: 'localidade',
      uf: 'uf',
      latitude: 'latitude',
      longitude: 'longitude',
    };

    clienteService.atualizarCliente(cliAtualziarMock).subscribe((retorno) => {
      expect(retorno).toBe(cliAtualziarMock);
    });

    const request = httpMock.expectOne(environment.apiUrl + '/api/clientes/' + cliAtualziarMock.cnpj);
    expect(request.request.method).toBe('PUT');

    httpMock.verify();
  });

  it('Teste método deletarCliente', () => {

    const cnpjDeletar = '0123456789asds';

    clienteService.deletarCliente(cnpjDeletar).subscribe((retorno) => {
      expect(retorno).toBe(undefined);
    });

    const request = httpMock.expectOne(environment.apiUrl + '/api/clientes/' + cnpjDeletar);
    expect(request.request.method).toBe('DELETE');

    httpMock.verify();
  });


});
