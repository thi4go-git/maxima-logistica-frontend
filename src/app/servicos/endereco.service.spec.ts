import { TestBed, getTestBed } from '@angular/core/testing';
import { EnderecoService } from './endereco.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { EnderecoDTOViacep } from '../entity/enderecoViaCepDTO';
import { environment } from 'src/environments/environment';

fdescribe('EnderecoService', () => {

  let enderecoService: EnderecoService;
  let httpMock: HttpTestingController; // Mock do HTTP para requisição mockada

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    const testBed = getTestBed();
    enderecoService = testBed.get(EnderecoService);
    httpMock = testBed.get(HttpTestingController);
  });

  it('Deve criar o componente EnderecoService', () => {
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
