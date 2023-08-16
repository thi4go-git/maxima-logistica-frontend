import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'src/app/servicos/keycloak.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  usuarioLogado: string = "Deslogado";
  versao: string = '';

  constructor(
    private keycloakService: KeycloakService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usuarioLogado = this.keycloakService.getUsuarioAutenticado();   
    this.versao = environment.versao;
  }

  logout() {
    this.keycloakService.encerrarSessao();
    this.router.navigate(['/login']);
  }

}
