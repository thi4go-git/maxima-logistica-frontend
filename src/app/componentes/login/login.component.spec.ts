import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LoginComponent } from "./login.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { KeycloakService } from "src/app/servicos/keycloak.service";
import { CoreModule } from "src/app/modulos/core/core.module";
import { of, throwError } from "rxjs";


describe('LoginComponent', () => {

    let loginComponent: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    let mockRouter: any;
    let mockMatSnackBar: any;
    let mockKeycloakService: any;

    beforeEach((() => {
        mockRouter = jasmine.createSpyObj('Router', [
            'navigate'
        ]);

        mockMatSnackBar = jasmine.createSpyObj('MatSnackBar', [
            'open'
        ]);

        mockKeycloakService = jasmine.createSpyObj('KeycloakService', [
            'obterToken'
        ]);

        TestBed.configureTestingModule({
            declarations: [],
            imports: [
                CoreModule
            ],
            providers: [
                { provide: Router, useValue: mockRouter },
                { provide: MatSnackBar, useValue: mockMatSnackBar },
                { provide: KeycloakService, useValue: mockKeycloakService }
            ]
        })
            .compileComponents();
    }));


    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        loginComponent = fixture.componentInstance;
    });

    it('Deve Criar o componente', () => {
        expect(loginComponent).toBeTruthy();
    });

    describe('Teste onInit', () => {
        it('Deve Chamar o método Logar', () => {
            loginComponent.username = 'teste'
            loginComponent.password = 'teste'

            //Mock obter token
            mockKeycloakService.obterToken.and.returnValue(of(true));
            loginComponent.onSubmit();

            expect(mockKeycloakService.obterToken).toHaveBeenCalledOnceWith(loginComponent.username, loginComponent.password);

        });
        it('Deve mostrar mensagem para informar credenciais', () => {
            loginComponent.username = ''
            loginComponent.password = ''

            const erroEsperado = ['Favor informar username e Senha'];

            loginComponent.onSubmit();
            expect(loginComponent.erros).toEqual(erroEsperado);
        });
    });

    describe('Teste método Logar', () => {
        it('Ocorrer erro ao obter Token Status code = 0', () => {
            const msgErroEsperado = ['STATUS: (0) undefined'];
            const mockErrorResponse = { status: 0, statusText: 'Error', error: { error_description: 'Erro Geral' } };

            mockKeycloakService.obterToken.and.returnValue(throwError(mockErrorResponse));

            loginComponent.logar();

            expect(mockKeycloakService.obterToken).toHaveBeenCalledWith(loginComponent.username, loginComponent.password);
            expect(loginComponent.erros).toEqual(msgErroEsperado);
        });
        it('Ocorrer erro ao obter Token Status code diferente de 0', () => {
            const msgErroEsperado = ['Erro Geral'];
            const mockErrorResponse = { status: 500, statusText: 'Error', error: { error_description: 'Erro Geral' } };

            mockKeycloakService.obterToken.and.returnValue(throwError(mockErrorResponse));

            loginComponent.logar();

            expect(mockKeycloakService.obterToken).toHaveBeenCalledWith(loginComponent.username, loginComponent.password);
            expect(loginComponent.erros).toEqual(msgErroEsperado);
        });
        it('Deve obter o token com sucesso e Logar', () => {
            // se o retorno é Observable necessita do returnValue(of(   'of'
            mockKeycloakService.obterToken.and.returnValue(of({ access_token: 'meu_token_teste' }));

            loginComponent.logar();

            expect(mockKeycloakService.obterToken).toHaveBeenCalledWith(loginComponent.username, loginComponent.password);
            expect(mockRouter.navigate).toHaveBeenCalledWith(['/cliente/lista']);
        });
    });


});
