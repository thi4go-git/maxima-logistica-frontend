import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClientePaginator } from '../entity/clientePaginator';
import { ClienteDTOResourceList } from '../entity/clienteDDTOResourceList';




@Injectable({ providedIn: 'root' })
export class ClienteService {

  apiCliente: string = environment.apiUrl + '/api/clientes';

  constructor(private http: HttpClient) { }

  listarTodosPaginadoFilter(page: number, size: number, clienteFilter: ClienteDTOResourceList): Observable<ClientePaginator> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)

console.log(clienteFilter);


    return this.http.post<ClientePaginator>(this.apiCliente + '/filter',
      clienteFilter, { params });
  }

  buscarPeloCnpj(cnpj: string): Observable<ClienteDTOResourceList> {
    return this.http.get<ClienteDTOResourceList>(this.apiCliente + '/' + cnpj);
  }

  salvarCliente(cliente: ClienteDTOResourceList): Observable<ClienteDTOResourceList> {
    return this.http.post<ClienteDTOResourceList>(this.apiCliente, cliente);
  }

  atualizarCliente(cliente: ClienteDTOResourceList): Observable<ClienteDTOResourceList> {
    return this.http.put<ClienteDTOResourceList>(this.apiCliente + '/' + cliente.cnpj, cliente);
  }

  deletarCliente(cnpj: string): Observable<any> {
    return this.http.delete<ClienteDTOResourceList>(this.apiCliente + '/' + cnpj);
  }
}
