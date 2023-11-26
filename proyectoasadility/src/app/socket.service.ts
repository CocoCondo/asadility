import { Injectable } from '@angular/core';
import {io} from 'socket.io-client';
import { Observable } from 'rxjs';
import { Juego } from './Juego';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor() { }

  private socket = io('http://localhost:3000');

  joinRoom(roomId: string, player: string){
    this.socket.emit('joinroom', {roomId: roomId, player: player});
  }

  getPlayers() {
    let observable = new Observable<any>(observer => {
      this.socket.on('playerJoined', (data: any) => {
        observer.next(data);
      });
      return () => { console.log("disconnected"); this.socket.disconnect(); };  
    });
    return observable;
  }

  startVote(roomId: string){
    this.socket.emit('startVote', {roomId: roomId});
  }

  getStartVote(roomId: string){
    let observable = new Observable<any>(observer => {
      this.socket.on('startVote', (data: any) => {
        observer.next(data);
      });
      return () => { console.log("disconnected"); this.socket.disconnect(); };  
    });
    return observable;
  }

  getActivity(){
    let observable = new Observable<any>(observer => {
      this.socket.on('nextAvtivity', (data: any) => {
        observer.next(data);
      });
      return () => { console.log("disconnected"); this.socket.disconnect(); };  
    });
    return observable;
  }

  vote(roomId: string, actividadId: number){
    this.socket.emit('vote', {roomId: roomId, actividadId: actividadId});
  }

  getEnd(){
    let observable = new Observable<any>(observer => {
      this.socket.on('goBackToLobby', (data: any) => {
        observer.next(data);
      });
      return () => { console.log("disconnected"); this.socket.disconnect(); };  
    });
    return observable;
  }
}
