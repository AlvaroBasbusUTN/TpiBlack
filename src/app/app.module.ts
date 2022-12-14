import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { TableroComponent } from './tablero/tablero.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { PartidaService } from './servicios/partida.service';
import { UsuarioService } from './servicios/usuario.service';


@NgModule({
  declarations: [
    AppComponent,
    TableroComponent,
    EstadisticasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [PartidaService, UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
