import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {
  private url = "" //hay que poner la direccion a la base de datos (por ejemplo /api/jugadores)

  constructor(
    private http: HttpClient,
  ) { }

  getJugadores(): Observable<any> {
    const urlFinal = `${this.url}`
    const response = this.http.get<any>(urlFinal)
    return response;
  }
}
