import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {
  private url = "http://localhost:8080" 

  constructor(
    private http: HttpClient,
  ) { }

  getJuegos(): Observable<any> {
    const urlFinal = `${this.url}/games`
    const response = this.http.get<any>(urlFinal)
    return response;
  }

  startJuego(juegoId: string): void{
    const urlFinal = `${this.url}/${juegoId}`
    const response = this.http.post<any>(urlFinal,"Empezar")
  }
}