import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { RoomService } from '../room.service';
import { Juego } from '../Juego';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit{

  @Input() roomId: string = "";
  roomActivities: Juego[] = [];

  constructor(private roomService: RoomService) { }

  ngOnInit() {
      console.log("Esta es la room: " + this.roomId);
      this.roomService.getActividades(this.roomId).subscribe(
        result => {
        this.roomActivities = result.activities;
        })
    };
}


