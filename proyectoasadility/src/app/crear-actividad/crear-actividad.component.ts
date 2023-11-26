import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActividadesService } from '../actividades.service';

@Component({
  selector: 'app-crear-actividad',
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.css']
})
export class CrearActividadComponent {
  titulo: string = '';
  descripcion: string = '';
  img:any='';


  constructor(private actividadesService: ActividadesService) {}

  crearNuevaActividad() {
    const datosActividad = {
      titulo: this.titulo,
      descripcion:this.descripcion,
      img: this.img
    };

    this.actividadesService.crearActividad(datosActividad).subscribe(
      (respuesta) => {
        console.log('Actividad creada con éxito', respuesta);
      },
      (error) => {
        console.error('Error al crear la actividad', error);
      }
    );
  }

}
