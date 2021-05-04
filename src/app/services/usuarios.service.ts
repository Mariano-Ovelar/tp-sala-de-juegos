import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private dtbase = '/usuarios';
  private usuariosRef: AngularFirestoreCollection<Usuario>;
  public nomUser:string="s";

  constructor(
    private db: AngularFirestore
  ) {
    this.usuariosRef = db.collection(this.dtbase);
  }
  getAll(): AngularFirestoreCollection<Usuario> {
    return this.usuariosRef;
  }
  create(usuario: any): any {
    return this.usuariosRef.add({ ...usuario });
  }
 

}
