import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  passwordConfir: string = "";
  public usuario: Usuario
  constructor(
    private authSvc: AuthService,
    private router: Router,
    private usuariosService: UsuariosService
    ) {
    this.usuario = new Usuario("", "", "", "");

  }

  ngOnInit(): void {
  }

  onRegister() {
    if (this.usuario.validarDatos(this.usuario, true)) {
      if (this.passwordConfir == this.usuario.password) {
        this.usuario.register(this.usuario, this.router, this.authSvc, this.usuariosService);
      }
      else {
        alert("Las contraseñas no coinciden, porfavor revise los datos ingresado.");
      }
    }
  }

}
