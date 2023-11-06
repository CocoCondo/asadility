import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LobbyComponent } from './lobby/lobby.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', title: 'Asadility', component: DashboardComponent },
  { path: 'lobby', title: 'LOBBY', component: LobbyComponent },
  { path: '**', title: 'Not found :(', component: PageNotFoundComponent },

  //{ path: 'juego1', title: 'juego1', component: Juego1Component} esto falta hacer la view del juego//
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
