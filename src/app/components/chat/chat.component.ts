import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mensaje } from 'src/app/models/mensaje';
import { AuthService } from 'src/app/services/auth.service';
import { MensajesService } from 'src/app/services/mensajes.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public mensaje: Mensaje = new Mensaje("");
  public allMensaje: Array<Mensaje> = new Array<Mensaje>();
  @Input() usuarioNombre: string = "";
  @Input() user$: Observable<any> = new Observable<any>();

  constructor(
    private authSvc: AuthService,
    private mensajesService: MensajesService,
    private usuariosService: UsuariosService

  ) {

  }

  ngOnInit(): void {
    this.cargarChat()
  }

  enviar() {
    this.authSvc.getUserAuth().subscribe(user => {

      this.usuariosService.getAll().snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() })
          )
        )
      ).subscribe(customer => {
        var allUsers = customer;
        allUsers.map((e: any) => {
          this.authSvc.getUserAuth().subscribe(a => {
            if (e.email == a?.email) {
              this.mensaje.nombre = e.nombre;
              this.mensaje.email = user?.email ?? "";
              this.mensajesService.create(this.mensaje).then(() => {
                console.log("mensaje enviado");

                this.mensaje.texto = "";
              });


              this.cargarChat();
            }
          })
        });
      });
      /*  */

    }
    );
  }


  cargarChat() {
    this.mensajesService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(customer => {
      this.allMensaje = customer;
    });
  }
}
