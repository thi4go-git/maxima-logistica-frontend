import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { AutenticacaoGuard } from "./autenticacao.guard";
import { KeycloakService } from "../servicos/keycloak.service";
import { CoreModule } from "../modulos/core/core.module";


fdescribe('AutenticacaoGuard', () => {

    let guard: AutenticacaoGuard;
    let keycloakServiceMock: jasmine.SpyObj<KeycloakService>;
    let routerMock: jasmine.SpyObj<Router>;

    beforeEach(() => {

        //Mocks para definir o retorno
        const keycloakServiceSpy = jasmine.createSpyObj('KeycloakService', ['isAuthenticated']);
        const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

        TestBed.configureTestingModule({
            providers: [
                AutenticacaoGuard,
                { provide: KeycloakService, useValue: keycloakServiceSpy },
                { provide: Router, useValue: routerSpy }
            ]
        });
        guard = TestBed.inject(AutenticacaoGuard);
        keycloakServiceMock = TestBed.inject(KeycloakService) as jasmine.SpyObj<KeycloakService>;
        routerMock = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    });

    it('Deve Criar AutenticacaoGuard', () => {
        expect(guard).toBeTruthy();
    });

    describe('Testes canActivate', () => {
        it('Deve permitir acesso se autenticado', () => {
            keycloakServiceMock.isAuthenticated.and.returnValue(true);

            const result = guard.canActivate();

            expect(result).toBe(true);
            expect(keycloakServiceMock.isAuthenticated).toHaveBeenCalled();
            expect(routerMock.navigateByUrl).not.toHaveBeenCalled();
        });
        it('Deve direcionar para Login caso não esteja autenticado', () => {
            keycloakServiceMock.isAuthenticated.and.returnValue(false);

            const result = guard.canActivate();

            expect(result).toBe(false);
            expect(keycloakServiceMock.isAuthenticated).toHaveBeenCalled();
            expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/login');
        });

    });



});