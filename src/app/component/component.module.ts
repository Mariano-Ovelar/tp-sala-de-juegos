import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from './registro/registro.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ChatComponent } from './chat/chat.component';


@NgModule({
  declarations: [
    RegistroComponent,
    NavbarComponent,
    ChatComponent


  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class ComponentModule { }
