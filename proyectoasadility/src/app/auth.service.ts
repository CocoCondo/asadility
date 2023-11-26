import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { shareReplay, map } from 'rxjs/operators'
import { Observable } from 'rxjs';

interface AuthResult {
  accessToken: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://localhost:8080";

  

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    return this.http.post<AuthResult>('http://localhost:8080/login', { username, password }).pipe(map((authResult: AuthResult) => this.setSession(authResult))).pipe(shareReplay());
  }

  private setSession(authResult: AuthResult) {
    localStorage.setItem('id_token', authResult.accessToken);
  }

  obtainAuthStatus() {
    return this.http.get<any>('http://localhost:8080/authmiddleware');
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.obtainAuthStatus().subscribe(
        (response) => {
          const codigoEstado = response.status;
          
          if (codigoEstado === 200) {
            if (response.Autenticado) {
              resolve(true);
            } else {
              resolve(false);
            }
          } else if (codigoEstado === 401) {
            resolve(false);
          } else {
            resolve(false);
          }
        },
        (error) => {
          console.error('Error:', error);
  
          reject(error);
        }
      );
    });
  }

  crearUsuario(datosUsuario: any): Observable<any> {
    const urlFinal = `${this.url}/register`;
    return this.http.post<any>(urlFinal, datosUsuario);
  }
}