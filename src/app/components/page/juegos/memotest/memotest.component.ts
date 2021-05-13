import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon';
import { MemotestApiService } from '../../../../services/memotest-api.service';

@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.css']
})

export class MemotestComponent implements OnInit {

  baraja: Array<Pokemon> = [];
  cartasEnMesa: Array<Pokemon> = [];
  barajaAux: Array<Pokemon> = [];
  cartaDiseñoTrasera: Pokemon;
  cartaOno: any;
  cartaDos: any;
  puntos: number = 8;
  intentos: number = 0;
  constructor(
    private pokemonApi: MemotestApiService
  ) {
    this.cartaDiseñoTrasera = new Pokemon();
  }

  ngOnInit(): void {
    for (let index = 0; index < 18; index++) {
      this.cartasEnMesa.push(
        {
          "nombre": "null",
          "img": "null",
          "bocaAbajo": true,
        });
      this.barajaAux.push(
        {
          "nombre": "null",
          "img": "null",
          "bocaAbajo": true,
        });
    }
    this.IniciarJuego();
  }

  IniciarJuego() {

    this.pokemonApi.getAll()?.subscribe(async (pokemones: any) => {
      this.cartaDiseñoTrasera = await this.generarCarta(this.pokemonApi.getPokemon("132"));

      pokemones.results.forEach(async (pokemon: any) => {
        var url = pokemon.url;
        var carta = await this.generarCarta(url);
        if (this.baraja.length < 9) {
          this.baraja.push(carta);
          this.colocarCartas(url);
        }
        console.log("hola");
      }

      );

    });

  }

  async generarCarta(url: any) {
    var respuesta: Pokemon = new Pokemon();
    try {
      var dato = await fetch(url);
      var pokemon = await dato.json();
      respuesta.nombre = pokemon.name;
      respuesta.img = pokemon.sprites.other.dream_world.front_default;
      respuesta.bocaAbajo = true;
    } catch (error) {

    }
    return respuesta;
  }
  private getNumeroRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  private async colocarCartas(url: any) {
    var cartasColocadas = 0;
    do {
      var carta = await this.generarCarta(url);
      var index = this.getNumeroRandom(0, 18);
      if (this.casillaDesocupada(this.cartasEnMesa[index])) {
        cartasColocadas++;
        this.cartasEnMesa[index] = carta;
      }
    } while (cartasColocadas < 2);
  }
  private casillaDesocupada(casilla: any) {
    return casilla.nombre == "null";
  }
  volterar(carta: any) {

    if (this.cartaOno == null) {
      carta.bocaAbajo = !carta.bocaAbajo;
      this.cartaOno = carta;
    }
    else if (this.cartaDos == null) {
      this.intentos++;
      carta.bocaAbajo = !carta.bocaAbajo;
      this.cartaDos = carta;
      if (this.cartaOno.nombre == this.cartaDos.nombre) {
        this.puntos++;
        this.cartaOno = null;
        this.cartaDos = null;

      }
      else {
        var diley = timer(1000);
        diley.subscribe(() => {
          this.cartaOno.bocaAbajo = !this.cartaOno.bocaAbajo;
          this.cartaDos.bocaAbajo = !this.cartaDos.bocaAbajo;
          this.cartaOno = null;
          this.cartaDos = null;
        })

      }

    }

  }
  reitentar(baraja: any) {
    this.intentos = 0;
    this.cartaOno = null;
    this.cartaDos = null;
    this.limpiarBaraja(this.barajaAux);
    console.log(this.barajaAux);

    for (let index = 0; index < baraja.length; index++) {
      this.barajarCartas(baraja[index]);
    }
    console.log(this.barajaAux);

    for (let index = 0; index < this.barajaAux.length; index++) {
      baraja[index].nombre = this.barajaAux[index].nombre;
      baraja[index].img = this.barajaAux[index].img;
      baraja[index].bocaAbajo = this.barajaAux[index].bocaAbajo;

    }
  }
  barajarCartas(carta: any) {
    var cartasColocadas: number = 0;
    do {
      var index = this.getNumeroRandom(0, 18);
      if (this.casillaDesocupada(this.barajaAux[index])) {
        cartasColocadas++;
        this.barajaAux[index].nombre = carta.nombre;
        this.barajaAux[index].img = carta.img;
        this.barajaAux[index].bocaAbajo = true;
      }
    } while (cartasColocadas < 1);

  }

  limpiarBaraja(baraja: any) {
    for (let index = 0; index < 18; index++) {
      baraja[index].nombre = "null";
      baraja[index].img = "null";
      baraja[index].bocaAbajo = true;
    }
  }
}
