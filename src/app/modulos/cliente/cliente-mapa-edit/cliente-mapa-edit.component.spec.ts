import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteMapaEditComponent } from './cliente-mapa-edit.component';

describe('ClienteMapaEditComponent', () => {
  let component: ClienteMapaEditComponent;
  let fixture: ComponentFixture<ClienteMapaEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteMapaEditComponent]
    });
    fixture = TestBed.createComponent(ClienteMapaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
