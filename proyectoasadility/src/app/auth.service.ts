import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { shareReplay, map } from 'rxjs/operators'

interface AuthResult {
  accessToken: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
          
          // Check if the status is 200 (OK)
          if (codigoEstado === 200) {
            // Check if the response body has the 'Autenticado' property
            if (response.Autenticado) {
              resolve(true);
            } else {
              resolve(false);
            }
          } else if (codigoEstado === 401) {
            // Handle authentication failure (Unauthorized)
            resolve(false);
          } else {
            // Handle other status codes if needed
            resolve(false);
          }
        },
        (error) => {
          console.error('Error:', error);
  
          // You might want to reject the promise with the error
          reject(error);
        }
      );
    });
  }
}