import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Jugador } from './jugador';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {
  private url = "http://localhost:8080/jugadores" //hay que poner la direccion a la base de datos (por ejemplo /api/jugadores)

  constructor(
    private http: HttpClient,
  ) { }

  async getJugadores(): Promise<Observable<any>> {
    return this.http.get<Jugador[]>(this.url);
    
  }
}
