import { TestBed, getTestBed } from '@angular/core/testing';

import { KeycloakService } from './keycloak.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('KeycloakService', () => {

  let keycloakService: KeycloakService;
  let httpMock: HttpTestingController;
  const tokenMock = '{"access_token":"eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJJc25GYzJwXzZvR19pTHAtVlNmdUdJaXppX1ZNYnROOGNlc0s3bjI2Q2NNIn0.eyJleHAiOjE2OTIyMjc3MDAsImlhdCI6MTY5MjIyNzY0MCwianRpIjoiNTlmNGI0Y2YtZmJkMy00ZGY0LWI3ODEtYmE0MDQ4ZGExMzYxIiwiaXNzIjoiaHR0cDovL2Nsb3VkdGVjbm9sb2dpYS5keW5ucy5jb206ODE4MC9yZWFsbXMvQ0xPVURfVEVDTk9MT0dJQSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI0ZmI5NTM0Ny1kZGI4LTQ0YjAtYjdjNS05ZjNkYWU0YTg2MGMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJtYXhpbWEtbG9naXN0aWNhIiwic2Vzc2lvbl9zdGF0ZSI6ImQxYzBmMTQwLWMyMTItNDJiMC1hNDc2LWIzY2VmNTFjODMwMiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1jbG91ZF90ZWNub2xvZ2lhIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsInNpZCI6ImQxYzBmMTQwLWMyMTItNDJiMC1hNDc2LWIzY2VmNTFjODMwMiIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6Ik3DoXhpbWEgVGVjaCBMb2fDrXN0aWNhIiwicHJlZmVycmVkX3VzZXJuYW1lIjoibWF4aW1hIiwiZ2l2ZW5fbmFtZSI6Ik3DoXhpbWEgVGVjaCIsImZhbWlseV9uYW1lIjoiTG9nw61zdGljYSIsImVtYWlsIjoibWF4aW1hQG1haWwuY29tIn0.sqK-DpWg7ImcAmTKi6xlOifurUKP8qVQ-43ztGCZxj4K3uk9tOfJTxzwPLtndGypD0BlC49IixnqW-3lVzJczltq3P1ow4SSzDyZ0lIxKEqd3wTNdI3RpJwIlM9d34dl_UzhoVdPlLMQJjO6zEhVLlKwPKW4ZgMwaJNLbUVM8Lqov4FZXek7xk6XXcbYKlCK-gAXV6RLfl5NCZzu5rf9FVNpNWO1smSfYDvSzVeXww9JAqcNE44LCpQrPSzgpD_FvRkGYyhnhA2zUuAxnjVg4IKVorCEJkXwVTDxZqcEt4_W77JNfSHR_lZHx2gksL5KqH-6MehNn5ytzoKAAtfL7Q","expires_in":60,"refresh_expires_in":1800,"refresh_token":"eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI2YTg5NWY5Yy0zMWQ4LTQwOWQtOTY0Ni1kNWZmYTc4OWYwN2YifQ.eyJleHAiOjE2OTIyMjk0NDAsImlhdCI6MTY5MjIyNzY0MCwianRpIjoiYTk3NmZjMWYtZmVjMy00ZTRhLTk1NDktY2Q0YjU3NDMyMzk5IiwiaXNzIjoiaHR0cDovL2Nsb3VkdGVjbm9sb2dpYS5keW5ucy5jb206ODE4MC9yZWFsbXMvQ0xPVURfVEVDTk9MT0dJQSIsImF1ZCI6Imh0dHA6Ly9jbG91ZHRlY25vbG9naWEuZHlubnMuY29tOjgxODAvcmVhbG1zL0NMT1VEX1RFQ05PTE9HSUEiLCJzdWIiOiI0ZmI5NTM0Ny1kZGI4LTQ0YjAtYjdjNS05ZjNkYWU0YTg2MGMiLCJ0eXAiOiJSZWZyZXNoIiwiYXpwIjoibWF4aW1hLWxvZ2lzdGljYSIsInNlc3Npb25fc3RhdGUiOiJkMWMwZjE0MC1jMjEyLTQyYjAtYTQ3Ni1iM2NlZjUxYzgzMDIiLCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJzaWQiOiJkMWMwZjE0MC1jMjEyLTQyYjAtYTQ3Ni1iM2NlZjUxYzgzMDIifQ.NSDXABYbPo1wXYiZGAOyrUIdt7heFIrb4SjQ0KvyXEI","token_type":"Bearer","not-before-policy":0,"session_state":"d1c0f140-c212-42b0-a476-b3cef51c8302","scope":"email profile"}'


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    const testBed = getTestBed();
    keycloakService = testBed.get(KeycloakService);
    httpMock = testBed.get(HttpTestingController);
  });

  it('Deve Criar o Serviço KeycloakService ', () => {
    expect(keycloakService).toBeTruthy();
  });

  describe('Deve obter token método: obterToken', () => {
    it('deve Obter  Token', () => {
      let retornoToken = '{"token":"sdasdada.54d5as4dasdads.asdkalsdasdas54"}';
      let userTeste: string = 'teste';
      let senhaTeste: string = 'teste';

      keycloakService.obterToken(userTeste, senhaTeste).subscribe(reqs => {
        expect(reqs).toEqual(retornoToken);
      });

      const req = httpMock.expectOne(`${keycloakService.urlToken}`);
      expect(req.request.method).toBe('POST');
      req.flush(retornoToken);
    });
  });

  describe('Teste método isAuthenticated', () => {
    it('Deve retornar FALSE', () => {
      let resposta = keycloakService.isAuthenticated();
      expect(false).toEqual(resposta);
    });
    it('Deve verificar token JWT e retornar FALSE', () => {
      localStorage.setItem('access_token', tokenMock);
      let resposta = keycloakService.isAuthenticated();
      expect(false).toEqual(resposta);
    });
  });

  describe('Teste método getUsuarioAutenticado', () => {
    it('Deve retornar undefined', () => {
      let usuarioAutenticado = 'maxima';
      let resposta = keycloakService.getUsuarioAutenticado();
      expect(usuarioAutenticado).toEqual(resposta);
    });
  });

  it('Teste método encerrarSessao', () => {
    let resposta = keycloakService.encerrarSessao();
    expect(undefined).toEqual(undefined);
  });





});
