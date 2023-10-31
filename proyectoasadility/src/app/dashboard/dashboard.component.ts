import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {catchError} from 'rxjs/operators'; 
import { of, throwError } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  showHost = false;
  showJoin = false;
  username: string = '';
  password: string = '';
  roomNumber: string = '';
  joinName: string = '';

  constructor(private authService: AuthService, private router: Router){}

  showHostForm() {
    this.showHost = true;
    this.showJoin = false;
  }

  showJoinForm() {
    this.showHost = false;
    this.showJoin = true;
  }

  login() {
    console.log('Login:', this.username, this.password);
    if (this.username && this.password) {
      this.authService.login(this.username, this.password)
        .pipe(
          catchError((error) => {
            return throwError(() => error);
          })
        )
        .subscribe({
          next: (res) => {
            console.log(res);
            console.log("logged in");
            this.router.navigateByUrl('/');
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  join() {
    // Lógica para unirse a la sala (JOIN)
    console.log('Join Room:', this.roomNumber, 'Name:', this.joinName);
    //FALTA LA LOGICA DE ENTRAR AL ROOM
    //Hacer ruteo
  }
}
