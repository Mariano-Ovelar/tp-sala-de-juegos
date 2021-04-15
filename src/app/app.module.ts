import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { QuienSoyComponent } from './component/quien-soy/quien-soy.component';
import { RegistroComponent } from './component/registro/registro.component';
import { AuthService } from './services/auth.service';
import { MensajesService } from './services/mensajes.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

import { NavbarComponent } from './component/navbar/navbar.component';

import { AngularFireDatabaseModule }  from '@angular/fire/database';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuienSoyComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegistroComponent,
    NavbarComponent
    
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    
  ],
  providers: [AuthService,MensajesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
