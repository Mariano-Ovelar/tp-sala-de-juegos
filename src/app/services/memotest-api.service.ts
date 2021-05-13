import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPokemon } from '../interfaces/ipokemon';
import { Pokemon } from '../models/pokemon';


@Injectable({
  providedIn: 'root'
})
export class MemotestApiService {
  public path: string = "https://pokeapi.co/api/v2/pokemon";

  constructor(public http: HttpClient) {


  }

  getAll() {
    return this.http.get<IPokemon[]>(`${this.path}`);

  }
  getPokemon(nombre: string) {
    return `${this.path}/${nombre}`;
  }

}
