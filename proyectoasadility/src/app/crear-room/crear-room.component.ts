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

    ngOnInit(): void {
        this.traerActividades();
      }

    constructor(
        private actividadesService: ActividadesService,
        private roomService: RoomService,
        private router: Router
        ) {}
    
    // Método para recuperar las actividades cargadas en el sistema
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
                console.log("Actividades cargadas exitosamente", this.actividades);
                console.log("Actividades a checkear", this.checkeados);
            },
            error => {
                console.log("Error al traer las actividades " + error);
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
                    console.log('Sala creada con éxito', respuesta);
                    alert('¡Sala creada con éxito!');
                    this.router.navigateByUrl('/admindashboard'); //editar con la ruta que se crea necesaria
                  },
                  (error) => {
                    console.error('Error al crear la sala', error);
                    alert('Error al crear la sala...');
                  }
            )
        }
        
    }
}
