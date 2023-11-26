import { Component, Input } from '@angular/core';
import { Jugador } from '../jugador';
import { OnInit } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})

export class LobbyComponent implements OnInit {
  jugadores: Jugador[] = [];

  @Input() start!: () => void;

  constructor(private socketService: SocketService) { }

  empezar(): void {
    this.start();
  }

  ngOnInit() {
    this.socketService.getPlayers().subscribe((players: Jugador[]) => {
    this.jugadores = players;
    });
  }

}



