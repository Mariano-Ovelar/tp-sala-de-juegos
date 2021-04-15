import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  password: string = "";
  email: string = "";
  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  async onLogin() {
  
    try {
      const user = await this.authSvc.login(this.email, this.password);
      if (user == null) {
        alert("email o password incorecto");
      } else {
        this.router.navigate(['/home']);
        this.authSvc.isLogged=true;
      }
    } catch (error) {

    }
  }

  completarCampos() {
    this.email = "marianoovelar200@gmail.com";
    this.password = "mar12346789"
  }
}
