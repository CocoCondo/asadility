import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class RoomService {
    
    private url = "http://localhost:8080/api/rooms";

    constructor(
        private http: HttpClient,
    ) { }
    
    crearRoom(actividades: any): Observable<any> {
        const urlFinal = `${this.url}`;
        return this.http.post<any>(urlFinal, actividades);
    }

    getActividades(roomId: string): Observable<any> {
      const urlFinal = `${this.url}/${roomId}/activities`;
      return this.http.get<any>(urlFinal)
    }

  }