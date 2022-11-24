import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Partida } from '../models/partida';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  apiUrlBase: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  postLogin(user: Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(this.apiUrlBase + "/login/", user);
  }

  obtenerPartidaUser(id: number ): Observable<Partida>{
    return this.http.get<Partida>(this.apiUrlBase + "/" + id);
  }
}
