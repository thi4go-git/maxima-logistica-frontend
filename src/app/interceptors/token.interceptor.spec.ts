import { TestBed } from '@angular/core/testing';

import { TokenInterceptor } from './token.interceptor';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('TokenInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
        },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('Deve adicionar o Header Authorization Bearer com token existente', () => {
    const token = 'fakeAccessToken';
    localStorage.setItem('access_token', JSON.stringify({ access_token: token }));

    const url = 'https://api.example.com/data';
    httpClient.get(url).subscribe();

    const req = httpTestingController.expectOne(url);
    expect(req.request.headers.has('Authorization')).toBeTruthy();
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);

    req.flush({}); // Complete the request
  });

  it('Não Deve adicionar o Header Authorization com URL terminando com:  /protocol/openid-connect/token', () => {
    const token = 'fakeAccessToken';
    localStorage.setItem('access_token', JSON.stringify({ access_token: token }));

    const url = 'https://auth.example.com/protocol/openid-connect/token';
    httpClient.post(url, {}).subscribe();

    const req = httpTestingController.expectOne(url);
    expect(req.request.headers.has('Authorization')).toBeFalsy();

    req.flush({}); // Complete the request
  });

  it('Não Deve adicionar o Header Authorization token inexistente no LocalStorage', () => {
    localStorage.removeItem('access_token');

    const url = 'https://api.example.com/data';
    httpClient.get(url).subscribe();

    const req = httpTestingController.expectOne(url);
    expect(req.request.headers.has('Authorization')).toBeFalsy();

    req.flush({}); // Complete the request
  });
});