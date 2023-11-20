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

  // Método llamado cuando se desea crear una nueva actividad
  crearNuevaActividad() {
    const datosActividad = {
      // Proporciona los datos de la actividad desde tu formulario o donde sea necesario
      titulo: this.titulo,
      descripcion:this.descripcion,
      img: this.img // o cualquier otro dato que necesites enviar
    };

    // Llama al método crearActividad del servicio
    this.actividadesService.crearActividad(datosActividad).subscribe(
      (respuesta) => {
        console.log('Actividad creada con éxito', respuesta);
        // Realiza acciones adicionales después de crear la actividad
      },
      (error) => {
        console.error('Error al crear la actividad', error);
        // Maneja el error según tus necesidades
      }
    );
  }

}
