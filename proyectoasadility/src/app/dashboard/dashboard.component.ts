import { Component } from '@angular/core';

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

  showHostForm() {
    this.showHost = true;
    this.showJoin = false;
  }

  showJoinForm() {
    this.showHost = false;
    this.showJoin = true;
  }

  login() {
    // Lógica para procesar el login del HOST
    console.log('Login:', this.username, this.password);
    //FALTA LA LOGICA DEL LOGEO
  }

  join() {
    // Lógica para unirse a la sala (JOIN)
    console.log('Join Room:', this.roomNumber, 'Name:', this.joinName);
    //FALTA LA LOGICA DE ENTRAR AL ROOM
    //Hacer ruteo
  }
}
