import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { TableroComponent } from './tablero/tablero.component';

const routes: Routes = [
  { path: "", component: TableroComponent },
  { path: "estadisticas", component: EstadisticasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
