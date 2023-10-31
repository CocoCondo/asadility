import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { shareReplay, map } from 'rxjs/operators'

interface AuthResult{
  accessToken: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(username:string, password:string ) {
    return this.http.post<AuthResult>('http://localhost:8080/login', {username, password}).pipe(map((authResult: AuthResult) => this.setSession(authResult))).pipe(shareReplay());
  }
  
  private setSession(authResult: AuthResult) {
    localStorage.setItem('id_token', authResult.accessToken);
  }   

}