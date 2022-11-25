import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Partida } from '../models/partida';
import { Usuario } from '../models/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  apiUrlBase: string = "http://localhost:8080/user";
 // apiUrlBase: string = environment.baseUrl;

  constructor(private http: HttpClient) { 

  }

  postLogin(user: Usuario):Observable<Usuario>{
    const headers = { 'content-type': 'application/json', 'Access-Control-Allow-Headers': '*' };
    return this.http.post<Usuario>(this.apiUrlBase + "/login/", user);
  }

  obtenerPartidaUser(id: number ): Observable<Partida>{
    return this.http.get<Partida>(this.apiUrlBase + "/" + id);
  }
}
