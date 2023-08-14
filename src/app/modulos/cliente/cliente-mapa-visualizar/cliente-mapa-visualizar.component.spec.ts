import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteMapaVisualizarComponent } from './cliente-mapa-visualizar.component';

describe('ClienteMapaVisualizarComponent', () => {
  let component: ClienteMapaVisualizarComponent;
  let fixture: ComponentFixture<ClienteMapaVisualizarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteMapaVisualizarComponent]
    });
    fixture = TestBed.createComponent(ClienteMapaVisualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
