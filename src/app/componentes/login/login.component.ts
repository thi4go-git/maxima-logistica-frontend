import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { KeycloakService } from 'src/app/servicos/keycloak.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  erros: string[] = [];

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private keycloakService: KeycloakService,
  ) { }

  onSubmit() {
    if (this.username && this.password) {
      this.erros = [];
      this.logar();
    } else {
      this.erros = ['Favor informar username e Senha'];
      this.snackBar.open("Favor informar username e Senha!", "Info!", {
        duration: 3000
      });
    }
  }

  private logar() {
    this.keycloakService
      .obterToken(this.username, this.password)
      .subscribe({
        next: (response) => {
          this.erros = [];
          const access_token = JSON.stringify(response);
          localStorage.setItem('access_token', access_token);
          this.router.navigate(['/cliente/lista'])
        },
        error: (errorResponse) => {
          const status = errorResponse.status;
          const msgErro = errorResponse.message;
          if (status == 0) {
            const infoErr = 'STATUS: (' + status + ") " + msgErro;
            this.erros = [infoErr];
          } else {
            this.erros = [errorResponse.error.error_description];
          }
        }
      });
  }

}
