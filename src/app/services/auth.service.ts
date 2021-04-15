import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { first } from "rxjs/operators";
first
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogged: boolean = false;

  constructor(public angularFireAuth: AngularFireAuth) {

  }
  async login(email: string, password: string) {
    try {
      const res=await this.angularFireAuth.signInWithEmailAndPassword(email, password);
      return res;
    } catch (error) {
      console.log(error); 
      return null;
    }
    
    /* return .then(() => {
      console.log("login exitoso!!!!");
    }).catch(err => {
      console.log(err); 
      return null;
    }); */

  }
  async register(email: string, password: string) {
    return await this.angularFireAuth.createUserWithEmailAndPassword(email, password).then(() => {
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

  getCurrentUser(){
    return this.angularFireAuth.authState.pipe(first()).toPromise();

  }
}
