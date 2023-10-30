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
  constructor(private juegoService: JuegoService, private jugadorService: JugadorService) { }

  getJugadores(): void{
    this.jugadorService.getJugadores()
      .subscribe(jugadores => {
        jugadores.results.map((jugador: any) => {
          let nuevoJugador = {
            nombre: jugador.nombre,
          }
          this.jugadores.push(nuevoJugador)
        })
      })
  }




  getJuegos(): void {
    this.juegoService.getJuegos()
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

  }



  empezar(): void {
    
  }

  ngOnInit(): void {

  }
}



