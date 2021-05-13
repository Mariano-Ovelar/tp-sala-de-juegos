import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { MemotestComponent } from './memotest/memotest.component';
import { SimonDiceComponent } from './simon-dice/simon-dice.component';
import { PongComponent } from './pong/pong.component';


@NgModule({
  declarations: [
    MemotestComponent,
    SimonDiceComponent,
    PongComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule
  ]
})
export class JuegosModule { }
