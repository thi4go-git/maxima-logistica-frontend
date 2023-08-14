import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './modulos/core/core.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
