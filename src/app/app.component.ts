import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { UsuariosService } from './services/usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'salaDeJuegos';
  user$: Observable<any> = this.authSvc.angularFireAuth.user;

  public userName: string = "";

  constructor(
    private authSvc: AuthService,
    private usuariosService: UsuariosService

  ) { }

  ngOnInit() {
    this.cagarUsuario();
  }

  cagarUsuario() {
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
            this.userName = e.nombre;
          }
        })
      });
    });
  }

}
