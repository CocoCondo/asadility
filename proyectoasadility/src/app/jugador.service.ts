import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Jugador } from './jugador';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  constructor(
    private http: HttpClient,
  ) { }

  async getJugadores(code: string): Promise<Observable<any>> {
    const url = `http://localhost:8080/api/rooms/${code}/users` //hay que poner la direccion a la base de datos (por ejemplo /api/jugadores)
    return this.http.get<Jugador[]>(url);
  }
}
