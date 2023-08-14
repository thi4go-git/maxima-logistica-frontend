import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EnderecoDTOViacep } from '../entity/enderecoViaCepDTO';
import { Observable } from 'rxjs';



@Injectable({ providedIn: 'root' })
export class EnderecoService {

  apiCliente: string = environment.apiUrl + '/api/enderecos';

  constructor(private http: HttpClient) { }

  retornarEnderecoViaCep(cep: string): Observable<EnderecoDTOViacep> {
    return this.http.get<EnderecoDTOViacep>(this.apiCliente + '/viacep/' + cep);
  }

}
