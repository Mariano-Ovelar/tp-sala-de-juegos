import { Component, OnInit } from '@angular/core';
import { Tateti } from 'src/app/models/juegos/tateti';

@Component({
  selector: 'app-ta-te-ti',
  templateUrl: './ta-te-ti.component.html',
  styleUrls: ['./ta-te-ti.component.css']
})
export class TaTeTiComponent implements OnInit {

  tateti: Tateti = new Tateti("", "");

  empates = 0;
  ganadosComputadora = 0;
  ganadosHumano = 0;

  //ids de las celdas en el html
  IDS = [['ceroCero', 'ceroUno', 'ceroDos'], ['unoCero', 'unoUno', 'unoDos'], ['dosCero', 'dosUno', 'dosDos']];

  constructor() { }

  ngOnInit(): void {
  }
  jugadaHumano(celda: any, fila: any, columna: any) {
    //antes tenés que ver si no está terminado el juego y si es el turno del jugador
    //no chequeo si es el turno del jugador
    //si en algún momento chequeara de quién es el turno, si no fuera del jugador llamaría a la jugada de la computadora.
    //pero esto pasaría si se clickea una celda, no tiene mucho sentido...

    if (!this.tateti.estaTerminado()) {
      if (!this.tateti.estaOcupada(fila, columna)) {
        this.tateti.agregarFicha(this.tateti.fichaHumano, fila, columna);
        this.tateti.jugados += 1;
        var celdaH = document.getElementById(this.IDS[fila][columna]);

        this.mostrarCelda(celdaH, this.tateti.fichaHumano);
        this.tateti.mostrarTablero();

        if (this.tateti.estaTerminado()) {
          this.actualizarMarcador('h');
          console.log("terminó Humano");
          this.tateti.reset(this.tateti.fichaHumano, 'h');
          //se mantiene la misma ficha que tenía al principio.
          //podría haber una función que elija al azar a quién le toca el turno
          this.limpiarCeldas();
          this.mostrarTurno(this.tateti);
          this.mostrarMarcador();
          console.log("Humano: " + this.ganadosHumano + ". Computadora: " + this.ganadosComputadora + ". Empates: " + this.empates);
        } else {
          this.tateti.cambiarTurno();
          this.mostrarTurno(this.tateti);
          console.log("turno: " + this.tateti.turno);
          this.jugadaComputadora(this.tateti);
        }
      } else {
        console.log('ocupada');
      }
    }
  }

  /* Jugada computadora */

  jugadaComputadora(tateti: any) {
    //se podría modularizar un poco, encapsular y abstraer algunas partes de esta función...
    //se supone que es el turno de la computadora, no habría otra forma de llegar acá si no, del modo en que está escrito
    if (!tateti.estaTerminado()) {
      //toda esta parte debería estar encapsulada en una función, qué es lo que está haciendo la computadora, elegirCelda()

      //elegir una posicion al azar de entre 	celdasVaciasDeLineasConDosOcupadas(tateti.fichaComputadora); y si es vacío, si no hay ninguna
      // entonces de celdasVaciasDeLineasConDosOcupadas(tateti.fichaHumano);, es decir si no puede ganar entonces bloquear la posibilidad de ganar del contrario
      //y si no en la primera desocupada.
      var posicion = tateti.desocupada();

      var posiblesParaGanar = tateti.celdasVaciasDeLineasConDosOcupadas(tateti.fichaComputadora);
      var posiblesParaBloquear = tateti.celdasVaciasDeLineasConDosOcupadas(tateti.fichaHumano);

      if (posiblesParaGanar.length >= 1) {
        posicion = posiblesParaGanar[Math.floor(Math.random() * posiblesParaGanar.length)];//elijo al azar una de las celdas
      } else if (posiblesParaBloquear.length >= 1) {
        posicion = posiblesParaBloquear[Math.floor(Math.random() * posiblesParaBloquear.length)];//elijo al azar una de las celdas
      } else {
        //antes de dejar que elija cualquiera desocupada, ver si está libre la del medio, la (1,1)
        if (!tateti.estaOcupada(1, 1)) posicion = [1, 1];
      }

      //una vez que eligió, pone la ficha en el tablero.
      var fila = posicion[0];
      var columna = posicion[1];
      tateti.agregarFicha(tateti.fichaComputadora, fila, columna);
      tateti.jugados += 1; //esta acción tal vez tendría que hacerse dentro de agregar ficha 

      //una vez agregada, se muestra en la página
      var celda = document.getElementById(this.IDS[fila][columna]);
      this.mostrarCelda(celda, tateti.fichaComputadora);

      tateti.mostrarTablero();

      //chequea si con esa jugada se terminó el partido
      if (tateti.estaTerminado()) {
        this.actualizarMarcador('c');
        console.log("terminó Computadora");
        tateti.reset(tateti.fichaHumano, 'h');//¿habría otra manera de no tener el reset en 2 lugares?
        this.limpiarCeldas();
        this.mostrarTurno(tateti);
        this.mostrarMarcador();
        console.log("Humano: " + this.ganadosHumano + ". Computadora: " + this.ganadosComputadora + ". Empates: " + this.empates);
      } else {
        tateti.cambiarTurno();
        this.mostrarTurno(tateti);
        console.log("turno: " + tateti.turno);
      }
    }
  }

  actualizarMarcador(quienTermino: any) {
    if (this.tateti.hay3EnLinea()) {
      (quienTermino == 'h') ? this.ganadosHumano++ : this.ganadosComputadora++;
    } else {
      this.empates++;
    }
  }

  mostrarMarcador() {
    var ganadosH: any = document.getElementById('ganadosH');
    var ganadosC: any = document.getElementById('ganadosC');
    var empate: any = document.getElementById('empate');

    ganadosC.textContent = "Computadora: " + this.ganadosComputadora;
    ganadosH.textContent = "Humano: " + this.ganadosHumano;
    empate.textContent = "Empate: " + this.empates;
  }

  limpiarCeldas() {
    //recorrer los ids de las celdas, y para cada celda, ponerle un espacio como contenido o el número que le corresponde
    var celda: any;
    for (var fila of this.IDS) {
      for (var id of fila) {
        celda = document.getElementById(id);
        celda.textContent = "";
      }
    }
  }

  mostrarCelda(celda: any, ficha: any) {
    celda.textContent = ficha;
  }

  mostrarTurno(tateti: any) {
    var display: any = document.getElementById('turno');
    display.textContent = 'Turno: ' + tateti.turno;
  }

  eligeFicha(tipoFicha: any) {

    this.tateti = new Tateti(tipoFicha, 'h');

    var celdas: any = document.getElementsByClassName("celda");

    //mostrar celdas
    for (var c of celdas) {
      c.style.display = "inline-block";
    }

    //ocultar selección de ficha
    var ficha: any = document.getElementById("ficha");
    ficha.style.display = "none";

    //mostrar jugadores, turno y marcador
    var hum: any = document.getElementById("hum");
    var comp: any = document.getElementById("comp");
    var turno: any = document.getElementById("turno");
    var marcador: any = document.getElementsByClassName('marcador')[0];
    var jugadores: any = document.getElementById("jugadores");

    hum.textContent = "Humano juega con " + this.tateti.fichaHumano;
    comp.textContent = "Computadora juega con " + this.tateti.fichaComputadora;

    jugadores.style.display = "block";
    marcador.style.display = "block";

    this.mostrarMarcador();
  }

}
