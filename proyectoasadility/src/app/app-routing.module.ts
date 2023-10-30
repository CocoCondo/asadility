import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LobbyComponent } from './lobby/lobby.component';

const routes: Routes = [
  { path: '',   redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', title: 'Asadility', component: DashboardComponent },
  { path: '**', title: 'Not found :(', component: PageNotFoundComponent },
  { path: 'lobby', title: 'LOBBY', component: LobbyComponent}
  { path: 'juego1', title: 'juego1', component: Juego1Component} //
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
