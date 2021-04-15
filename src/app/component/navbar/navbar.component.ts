import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user$: Observable<any>=this.authSvc.angularFireAuth.user;
  constructor(private authSvc: AuthService,private router:Router) {

   }

  async ngOnInit() {
  }
  onLogout(){
    this.authSvc.logout();
    this.router.navigate(['/ingreso/login'])
  }

}
