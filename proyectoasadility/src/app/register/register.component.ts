import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  mostrarMensaje: boolean = false;
  mensaje: string =
    'Ta has registrado! Vuelve para atras y loggearte con tu nueva cuenta';

  constructor(private authService: AuthService) {}

  crearNuevoUsuario() {
    const datosUsuario = {
      username: this.username,
      password: this.password,
    };

    this.authService.crearUsuario(datosUsuario).subscribe(
      (respuesta) => {
        console.log('Usuario creado con éxito');
        if (datosUsuario.username != '' && datosUsuario.password != '') {
          this.mostrarMensaje = true;
          // Oculta el mensaje después de 3 segundos (3000 milisegundos)
          setTimeout(() => {
            this.mostrarMensaje = false;
          }, 3000);
        }
      },
      (error) => {
        console.error('Error al crear usuario', error);
      }
    );
  }
}
