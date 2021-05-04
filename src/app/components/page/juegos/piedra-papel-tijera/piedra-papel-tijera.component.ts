import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./piedra-papel-tijera.component.css']
})
export class PiedraPapelTijeraComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }
  seEligio(carta: string) {

  }
  //var opciones = ["piedra", "papel", "tijera"];
  opciones: any = [0, 1, 2];
  eleccionMaquina: any;

  aleatorio(minimo: any, maximo: any) {
    var numero = Math.floor(Math.random() * (maximo - minimo + 1) + minimo);
    return numero;
  }

  usuario(eleccionUsuario: any) {
    eleccionUsuario = parseInt(eleccionUsuario);
    this.eleccionMaquina = this.aleatorio(0, 2);
    //alert(eleccionUsuario);
    //alert(eleccionMaquina);
    var efecto: any = document.getElementById('efecto');

    if (eleccionUsuario == 0) {//el usuario eligio piedra 

      if (this.opciones[this.eleccionMaquina] == 1) {//si la maquina eligio papel 
        efecto.innerHTML = '<h1>¡Perdiste!</h1> <h3>La maquina eligio papel y tu piedra.</h3>';
      } else {
        if (this.opciones[this.eleccionMaquina] == 2) {
          efecto.innerHTML = '<h1>¡Ganaste!</h1> <h3>La maquina eligio tijera y tu piedra.</h3>';
        } else {
          if (this.opciones[this.eleccionMaquina] == 0) {
            efecto.innerHTML = '<h1>¡Empate!</h1> <h3>Ambos eligieron piedra.</h3>';
          }
        }
      }
    }

    if (eleccionUsuario == 1) {//el usuario eligio papel

      if (this.opciones[this.eleccionMaquina] == 2) {
        efecto.innerHTML = '<h1>¡Perdiste!</h1> <h3>La maquina eligio tijera y tu papel.</h3>';
      } else {
        if (this.opciones[this.eleccionMaquina] == 0) {
          efecto.innerHTML = '<h1>¡Ganaste!</h1> <h3>La maquina eligio piedra y tu papel.</h3>';

        } else {
          if (this.opciones[this.eleccionMaquina] == 1) {
            efecto.innerHTML = '<h1>¡Empate!</h1> <h3>Ambos eligieron papel.</h3>';
          }
        }
      }
    }

    if (eleccionUsuario == 2) {//el usuario eligio tijera 

      if (this.opciones[this.eleccionMaquina] == 1) {
        efecto.innerHTML = '<h1>¡Ganaste!</h1> <h3>La maquina eligio papel y tu tijera.</h3>';

      } else {
        if (this.opciones[this.eleccionMaquina] == 0) {
          efecto.innerHTML = '<h1>¡Perdiste!</h1> <h3>La maquina eligio piedra y tu tijera.</h3>';
        } else {
          if (this.opciones[this.eleccionMaquina] == 2) {
            efecto.innerHTML = '<h1>¡Empate!</h1> <h3>Ambos eligieron tijera.</h3>';
          }
        }
      }
    }

    efecto.style.display = "";
  }



  quitarEfecto() {
    var efecto: any = document.getElementById('efecto');

    efecto.style.display = "none";
  }
}