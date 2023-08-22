import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/componentes/layout/layout.component';
import { ClienteListaComponent } from './cliente-lista/cliente-lista.component';
import { NotFoundComponent } from 'src/app/componentes/not-found/not-found.component';
import { ClienteMapaEditComponent } from './cliente-mapa-edit/cliente-mapa-edit.component';
import { FormularioGuard } from 'src/app/guardiao/formulario.guard';


const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'lista', component: ClienteListaComponent, title: 'Listagem de Clientes' },
      { path: 'mapa-edit/:cnpj', component: ClienteMapaEditComponent, canDeactivate: [FormularioGuard], title: 'Mapa - Edição Cliente' },
      { path: 'cadastro', component: ClienteMapaEditComponent, canDeactivate: [FormularioGuard], title: 'Cadastro de Cliente' },
      { path: '', redirectTo: '/cliente/lista', pathMatch: 'full' },
      { path: '**', component: NotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
