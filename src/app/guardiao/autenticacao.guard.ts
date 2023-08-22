import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { KeycloakService } from '../servicos/keycloak.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({ providedIn: 'root' })
export class AutenticacaoGuard implements CanActivate {

  constructor(
    private keycloakService: KeycloakService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }


  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const autenticado = this.keycloakService.isAuthenticated();

    if (autenticado) {
      return true;
    } else { 
      localStorage.clear();
      this.router.navigateByUrl('/login');
      return false;
    }
  }


}