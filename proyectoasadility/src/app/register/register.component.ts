import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService){};

  crearNuevoUsuario() {
    const datosUsuario = {
      username: this.username,
      password:this.password
    };

    // Llama al método crearActividad del servicio
    this.authService.crearUsuario(datosUsuario).subscribe(
      (respuesta) => {
        console.log('Usuario creado con éxito', respuesta);
        // Realiza acciones adicionales después de crear la actividad
      },
      (error) => {
        console.error('Error al crear usuario', error);
        // Maneja el error según tus necesidades
      }
    );
  }
  

}
