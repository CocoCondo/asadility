import { Component } from '@angular/core';
import { Juego } from 'src/app/Juego'
import { JuegoService } from '../juego.service';
import { Jugador } from '../jugador';
import { JugadorService } from '../jugador.service';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';

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
  constructor(private jugadorService: JugadorService, private route: ActivatedRoute) { }

  /*async getJugadores(param1:string): Promise<void> {
    ((await this.jugadorService.getJugadores(param1)).subscribe(jugadores => this.jugadores = jugadores)
    );
 }*/




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

  async ngOnInit(): Promise<void> {
    let code = '';
    this.route.paramMap.subscribe(async (params) => {
      code = params.get('code') || '';

    })
    const data = await (await this.jugadorService.getJugadores(code)).toPromise();
    this.jugadores = data.players;
    console.log('a', this.jugadores)

  }

}



