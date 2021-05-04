import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../models/mensaje'

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  private dtbase = '/mensajes';
  mensajesRef: AngularFirestoreCollection<Mensaje>;

  constructor(private db: AngularFirestore) {
    this.mensajesRef = db.collection(this.dtbase);
  }
  getAll(): AngularFirestoreCollection<Mensaje> {
    return this.mensajesRef;
  }
  create(mensaje: Mensaje): any {

    if (mensaje.texto != "" && mensaje.email != "") {
   
      return this.mensajesRef.doc(new Date().getTime().toString()).set({ ...mensaje });

    }

  }


}
