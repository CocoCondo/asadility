import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { Juego } from '../Juego';

@Component({
  selector: 'app-votacion',
  templateUrl: './votacion.component.html',
  styleUrls: ['./votacion.component.css']
})
export class VotacionComponent implements OnInit{

  @Input() roomId: string = "";
  actividad: Juego = {_id: 0, name: "", description: "", img: "", votes: 0};
  
  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.socketService.getActivity().subscribe((actividad: Juego) => {
    this.actividad = actividad;
    });
  }

  vote(actividadId: number){
    this.socketService.vote(this.roomId, actividadId);
  }

}
