import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/page/home/home.component';
import { LoginComponent } from './components/page/ingreso/login/login.component';
import { PageNotFoundComponent } from './components/page/page-not-found/page-not-found.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { RegistroComponent } from './components/page/ingreso/registro/registro.component';
import { AuthService } from './services/auth.service';
import { MensajesService } from './services/mensajes.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

import { NavbarComponent } from './components/navbar/navbar.component';

import { AngularFireDatabaseModule }  from '@angular/fire/database';
import { ChatComponent } from './components/chat/chat.component';
import { TaTeTiComponent } from './components/page/juegos/ta-te-ti/ta-te-ti.component';
import { PiedraPapelTijeraComponent } from './components/page/juegos/piedra-papel-tijera/piedra-papel-tijera.component';
import { ListaJuegosComponent } from './components/lista-juegos/lista-juegos.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuienSoyComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegistroComponent,
    NavbarComponent,
    ChatComponent,
    TaTeTiComponent,
    PiedraPapelTijeraComponent,
    ListaJuegosComponent
    
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    HttpClientModule
  ],
  providers: [AuthService,MensajesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
