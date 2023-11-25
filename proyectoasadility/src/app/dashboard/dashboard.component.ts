import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {catchError} from 'rxjs/operators'; 
import { throwError } from 'rxjs';
import { SocketService } from '../socket.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit  {
  showHost = false;
  showJoin = false;
  showLobby = false;
  showVoting = false;
  showResults = false;
  username: string = '';
  password: string = '';
  roomNumber: string = '';
  joinName: string = '';

  constructor(private authService: AuthService, private socketService: SocketService, private router: Router){}

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
          next: (res: any) => {
            console.log("logged in");
            this.router.navigateByUrl('/admindashboard');
          },
          error: (err: any) => {
            console.log(err);
          },
        });
    }
  }

  join() {
    this.socketService.joinRoom(this.roomNumber, this.joinName);
    this.showHost = false;
    this.showJoin = false;
    this.showLobby = true;
  }

  start = (): void => {
    this.showHost = false;
    this.showJoin = false;
    this.showLobby = false;
    this.showVoting = true;
    this.socketService.startVote(this.roomNumber);
    }

  ngOnInit() {
    this.socketService.getEnd().subscribe((roomId: string) => {
      this.showHost = false;
      this.showJoin = false;
      this.showVoting = false;
      this.showResults = true;
    });
  }

}