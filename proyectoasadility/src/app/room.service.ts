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
        console.log("Estamos enviando esto: " + actividades)
        const urlFinal = `${this.url}`; // Ajusta la ruta según tu backend
        return this.http.post<any>(urlFinal, actividades);
    }

  }