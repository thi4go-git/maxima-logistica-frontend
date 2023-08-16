import { NgModule } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from 'src/app/componentes/layout/layout.component';
import { LoginComponent } from 'src/app/componentes/login/login.component';
import { ConfirmationDialogComponent } from 'src/app/componentes/confirmation-dialog/confirmation-dialog.component';
import { TemplateModule } from '../template/template.module';
import { NotFoundComponent } from 'src/app/componentes/not-found/not-found.component';
import { AvisosDialogService } from 'src/app/servicos/avisos-dialog.service';
import { ClienteService } from 'src/app/servicos/cliente.service';
import { EnderecoService } from 'src/app/servicos/endereco.service';
import { ClienteModule } from '../cliente/cliente.module';
import { KeycloakService } from 'src/app/servicos/keycloak.service';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    ConfirmationDialogComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    TemplateModule,
    ClienteModule
  ], exports: [
  ], providers: [
    AvisosDialogService,
    ClienteService,
    EnderecoService,
    KeycloakService
  ]
})
export class CoreModule { }
