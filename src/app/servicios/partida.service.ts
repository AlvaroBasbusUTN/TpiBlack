import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Partida } from '../models/partida';

@Injectable({
  providedIn: 'root'
})
export class PartidaService {

  apiUrlBase: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }


      crearPartida(id: number): Observable<Partida> {
        return this.http.get<Partida>(this.apiUrlBase + "/play/crearPartida/" + id);
      }
  
  
      pedirCartaJugador(id: number): Observable<Partida>{
        return this.http.get<Partida>(this.apiUrlBase + "/play/pedirCartaJugador/" +id);
      }
  
  
  
      pedirCartaCroupier(id: number): Observable<Partida>{
        return this.http.get<Partida>(this.apiUrlBase + "/play/pedirCartaCroupier/" +id);
      }

}
