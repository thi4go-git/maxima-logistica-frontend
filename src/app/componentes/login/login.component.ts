import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
    private snackBar: MatSnackBar
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

  }

}
