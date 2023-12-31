import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CrearActividadComponent } from './crear-actividad/crear-actividad.component';
import { CrearRoomComponent } from './crear-room/crear-room.component';
import { AuthService } from './auth.service';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'register', title:'register', component:RegisterComponent},
  { path: 'dashboard', title: 'Asadility', component: DashboardComponent },
  {
    path: 'admindashboard', title: 'Admin Dashboard', component: AdminDashboardComponent,
    canActivate: [() => inject(AuthService).isAuthenticated()],
  },
  {
    path: 'admindashboard/crearactividad', title: 'Crear actividad', component: CrearActividadComponent,
    canActivate: [() => inject(AuthService).isAuthenticated()],
  },
  {
    path: 'admindashboard/crear_room', title: 'Crear Room', component: CrearRoomComponent,
    canActivate: [() => inject(AuthService).isAuthenticated()],
  },
  { path: '**', title: 'Not found :(', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
