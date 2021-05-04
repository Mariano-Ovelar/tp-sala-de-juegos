import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { TaTeTiComponent } from './page/juegos/ta-te-ti/ta-te-ti.component';
import { ListaJuegosComponent } from './lista-juegos/lista-juegos.component';


@NgModule({
  declarations: [
    TaTeTiComponent,
    ListaJuegosComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule
  ]
})
export class ComponentsModule { }
