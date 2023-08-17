import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { AutenticacaoGuard } from "./autenticacao.guard";
import { KeycloakService } from "../servicos/keycloak.service";
import { MatSnackBar } from "@angular/material/snack-bar";


describe('AutenticacaoGuard', () => {

    let guard: AutenticacaoGuard;
    let router: Router;
    let snackBar: MatSnackBar;
    let keycloakService: KeycloakService;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [
                AutenticacaoGuard,
                { provide: KeycloakService, useValue: {} },
                { provide: Router, useValue: {} },
                { provide: MatSnackBar, useValue: {} }
            ]
        });
        guard = TestBed.inject(AutenticacaoGuard);
    });

    it('Deve Criar AutenticacaoGuard', () => {
        expect(guard).toBeTruthy();
    });



});