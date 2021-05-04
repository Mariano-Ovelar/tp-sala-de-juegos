import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { first } from "rxjs/operators";
import { Usuario } from '../models/usuario';
first
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogged: boolean = false;
  constructor(
    public angularFireAuth: AngularFireAuth
    
    ) {
     
  }

  async login(usuario: Usuario) {
    try {
      const res = await this.angularFireAuth.signInWithEmailAndPassword(usuario.email, usuario.password);
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }

  }
  async register(usuario: Usuario) {
    return await this.angularFireAuth.createUserWithEmailAndPassword(usuario.email, usuario.password).then(() => {
      console.log("registro exitoso!!!!");
    }).catch(err => {
      console.log(err);
    });
  }
  async logout() {
    return await this.angularFireAuth.signOut().then(() => {
      console.log("logout exitoso!!!!");
    }).catch(err => {
      console.log(err);
    });
  }

  getCurrentUser() {
    return this.angularFireAuth.authState.pipe(first()).toPromise();

  }

  getUserAuth(){
    return this.angularFireAuth.authState;
  }
  
}
