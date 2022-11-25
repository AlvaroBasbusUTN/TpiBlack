import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  apiUrlBase: string = "http://localhost:8080";

  constructor(private http: HttpClient) { 

  }

  reporteJugFecha(): Observable<any> {
    return this.http.get<any>(this.apiUrlBase + "/reporte/jugFechas");
  }

  victoriasCroupier(): Observable<number> {
    return this.http.get<number>(this.apiUrlBase + "/reporte/victoriasCroupier");
  }

  victoriaJugador(): Observable<number> {
    return this.http.get<number>(this.apiUrlBase + "/reporte/victoriaJugador");
  }

  empates(): Observable<number> {
    return this.http.get<number>(this.apiUrlBase + "/reporte/empates");
  }

  promedio(): Observable<any> {
    return this.http.get<any>(this.apiUrlBase + "/reporte/promedio");
  }

}
