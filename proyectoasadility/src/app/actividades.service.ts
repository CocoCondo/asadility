import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  private url = "http://localhost:8080/api/actividades";

  constructor(
    private http: HttpClient,
  ) { }

  getActividades(): Observable<any> {
    const urlFinal = `${this.url}`
    const response = this.http.get<any>(urlFinal)
    return response;
  }

  crearActividad(datosActividad: any): Observable<any> {
    const urlFinal = `${this.url}/crear`;
    return this.http.post<any>(urlFinal, datosActividad);
  }
}
