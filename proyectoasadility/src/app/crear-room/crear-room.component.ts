import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Juego } from '../Juego';
import { Checkeado } from '../checkeado';
import { ActividadesService } from '../actividades.service';
import { RoomService } from '../room.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-room',
  templateUrl: './crear-room.component.html',
  styleUrls: ['./crear-room.component.css']
})
export class CrearRoomComponent implements OnInit {
    actividades: Juego[] = [];
    public checkeados: Checkeado[] = [];
    roomCode: string = "";

    ngOnInit(): void {
        this.traerActividades();
      }

    constructor(
        private actividadesService: ActividadesService,
        private roomService: RoomService,
        private router: Router
        ) {}
    
    traerActividades(){
        this.actividadesService.getActividades().subscribe(
            result => {
                this.actividades = result.actividades
                for (const actividad of this.actividades){
                    const actividadChequeable = {
                        id: actividad._id,
                        name: actividad.name,
                        checked: false
                    }
                    this.checkeados.push(actividadChequeable);
                }
            },
            error => {
                console.log("Error al traer las actividades ");
            }
        )
    }

    crearSala(){
        let juegosDeSala: number[] = [];
        for (const checkeado of this.checkeados){
            if(checkeado.checked){
                let idDeJuego = checkeado.id;
                juegosDeSala.push(idDeJuego);
            }
        }
        if (juegosDeSala.length === 0){
            alert('¡Debe seleccionar al menos una actividad!');
        }else{
            this.roomService.crearRoom(juegosDeSala).subscribe(
                (respuesta) => {
                    this.roomCode = respuesta.code;
                  },
                  (error) => {
                    console.error('Error al crear la sala', error);
                    alert('Error al crear la sala...');
                  }
            )
        }
        
    }
}
