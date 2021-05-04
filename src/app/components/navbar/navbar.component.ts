import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() usuarioNombre: string = "";
  @Input() user$: Observable<any>=new Observable<any>();
  constructor(
    private authSvc: AuthService,
    private router: Router,
    private usuariosService: UsuariosService
  ) {

  }

  async ngOnInit() {


  }

  onLogout() {
    this.authSvc.logout();
    this.router.navigate(['/ingreso/login'])
  }

}
