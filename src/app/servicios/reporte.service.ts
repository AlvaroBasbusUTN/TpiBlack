import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  apiUrlBase: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  reporteJugFecha(): Observable<any> {
    return this.http.get<any>(this.apiUrlBase + "/reporte/jugFechas");
  }

  victoriasCroupier(): Observable<any> {
    return this.http.get<any>(this.apiUrlBase + "/reporte/victoriasCroupier");
  }

  victoriaJugador(): Observable<any> {
    return this.http.get<any>(this.apiUrlBase + "/reporte/victoriaJugador");
  }

  empates(): Observable<any> {
    return this.http.get<any>(this.apiUrlBase + "/reporte/empates");
  }

  promedio(): Observable<any> {
    return this.http.get<any>(this.apiUrlBase + "/reporte/promedio");
  }

}
