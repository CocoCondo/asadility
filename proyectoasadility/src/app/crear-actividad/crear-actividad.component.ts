import { Component } from '@angular/core';

@Component({
  selector: 'app-crear-actividad',
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.css']
})
export class CrearActividadComponent {
  titulo: string = '';
  descripcion: string = '';
  img:string='';

  crearActividad(){
    //A implementar
  }

}
