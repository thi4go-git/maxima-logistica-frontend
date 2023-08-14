import { NgModule } from '@angular/core';
import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteListaComponent } from './cliente-lista/cliente-lista.component';
import { SharedModule } from '../shared/shared.module';
import { ClienteMapaEditComponent } from './cliente-mapa-edit/cliente-mapa-edit.component';
import { ClienteMapaVisualizarComponent } from './cliente-mapa-visualizar/cliente-mapa-visualizar.component';


@NgModule({
  declarations: [
    ClienteListaComponent,
    ClienteMapaEditComponent,
    ClienteMapaVisualizarComponent
  ],
  imports: [
    SharedModule,
    ClienteRoutingModule
  ], exports: [
    ClienteListaComponent,
    ClienteMapaEditComponent,
    ClienteMapaVisualizarComponent
  ]
})
export class ClienteModule { }
