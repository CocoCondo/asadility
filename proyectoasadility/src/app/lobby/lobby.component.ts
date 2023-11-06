import { Component } from '@angular/core';
import { Juego } from 'src/app/Juego'
import { JuegoService } from '../juego.service';
import { Jugador } from '../jugador';
import { JugadorService } from '../jugador.service';


@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent {
  juegos: Juego[] = [];
  jugadores: Jugador[] = [];
  selectedJuego: Juego = {
    id: 0,
    imagen: "",
    nombre: ""
  }
  constructor(private jugadorService: JugadorService) { }

  async getJugadores(): Promise<void> {
    ((await this.jugadorService.getJugadores()).subscribe(jugadores => this.jugadores = jugadores)
    );
 }




  getJuegos(): void {
    /*this.juegoService.getJuegos()
      .subscribe(juegos => {
        juegos.results.map((juego: any) => {
          let nuevoJuego = {
            id: juego.id,
            nombre: juego.name,
            imagen: juego.background_image,
            rating: juego.rating,
            sugerencias: juego.suggestions_count
          }
          this.juegos.push(nuevoJuego)
        })
      })
*/
  }



  empezar(): void {

  }

  ngOnInit(): void {
    this.getJugadores();

  }
}



