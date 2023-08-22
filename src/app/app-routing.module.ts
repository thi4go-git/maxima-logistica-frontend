import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { AutenticacaoGuard } from './guardiao/autenticacao.guard';
import { NotFoundComponent } from './componentes/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'cliente',
    canActivate: [AutenticacaoGuard],
    loadChildren: () => import('./modulos/cliente/cliente.module').then(m => m.ClienteModule)
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
