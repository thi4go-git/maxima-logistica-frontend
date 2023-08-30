import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({ providedIn: 'root' })
export class KeycloakService {

  urlToken: string = environment.tokenUrl;
  cliId = environment.cliId;
  cliSecret = environment.cliSecret;

  jwtHelper: JwtHelperService;

  constructor(private http: HttpClient) {
    this.jwtHelper = new JwtHelperService();
  }

  obterToken(username: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');
    const headers = {
      'Authorization': 'Basic ' + btoa(this.cliId + ':' + this.cliSecret),
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post<any>(this.urlToken, params.toString(), { headers });
  }

  isAuthenticated(): boolean {
    const token = this.obterTokenStorage();
    if (token) {
      const expirado = this.jwtHelper.isTokenExpired(token);
      return !expirado;
    }
    return false;
  }

  obterTokenStorage() {
    const tokenStr = localStorage.getItem('access_token');
    if (tokenStr) {
      const token = JSON.parse(tokenStr).access_token;
      return token;
    }
    return null;
  }

  encerrarSessao() {
    localStorage.removeItem('access_token');
  }

  getUsuarioAutenticado() {
    const token = this.obterTokenStorage();
    if (token) {
      const usuario = this.jwtHelper.decodeToken(token).preferred_username
      return usuario;
    }
  }

}
