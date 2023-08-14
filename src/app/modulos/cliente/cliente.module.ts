import { NgModule } from '@angular/core';
import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteListaComponent } from './cliente-lista/cliente-lista.component';
import { SharedModule } from '../shared/shared.module';
import { ClienteMapaEditComponent } from './cliente-mapa-edit/cliente-mapa-edit.component';


@NgModule({
  declarations: [
    ClienteListaComponent,
    ClienteMapaEditComponent
    
  ],
  imports: [
    SharedModule,
    ClienteRoutingModule
  ], exports: [
    ClienteListaComponent,
    ClienteMapaEditComponent    
  ]
})
export class ClienteModule { }
