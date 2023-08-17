import { TestBed, getTestBed } from '@angular/core/testing';
import { EnderecoService } from './endereco.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { EnderecoDTOViacep } from '../entity/enderecoViaCepDTO';
import { environment } from 'src/environments/environment';

describe('EnderecoService', () => {

  let enderecoService: EnderecoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    const testBed = getTestBed();
    enderecoService = testBed.inject(EnderecoService);
    httpMock = testBed.inject(HttpTestingController);
  });

  it('Deve criar o Serviço EnderecoService', () => {
    expect(enderecoService).toBeTruthy();
  });

  it('Deve retornar endereco ViaCep', () => {

    const cep = '74915660';

    const mockRetornoCep: EnderecoDTOViacep = new EnderecoDTOViacep;
    mockRetornoCep.bairro = 'bairro';
    mockRetornoCep.cep = cep;
    mockRetornoCep.complemento = 'complemento';
    mockRetornoCep.ddd = 'ddd';

    enderecoService.retornarEnderecoViaCep(cep).subscribe((retorno) => {
      expect(retorno).toBe(mockRetornoCep);
    });

    const request = httpMock.expectOne(environment.apiUrl + '/api/enderecos/viacep/' + cep);
    expect(request.request.method).toBe('GET');

    httpMock.verify();

  });

});
