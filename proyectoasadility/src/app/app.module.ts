import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FooterComponent } from './footer/footer.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LobbyComponent } from './lobby/lobby.component';

// Interceptors
import { AuthinterceptorService } from './authinterceptor.service';
import { CrearActividadComponent } from './crear-actividad/crear-actividad.component';
import { CrearRoomComponent } from './crear-room/crear-room.component';
import { RegisterComponent } from './register/register.component';
import { VotacionComponent } from './votacion/votacion.component';
import { ResultadosComponent } from './resultados/resultados.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PageNotFoundComponent,
    FooterComponent,
    AdminDashboardComponent,
    LobbyComponent,
    CrearActividadComponent,
    CrearRoomComponent,
    RegisterComponent,
    VotacionComponent,
    ResultadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthinterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }