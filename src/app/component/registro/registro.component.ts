import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  /*  registerFrom = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    }); */
  password: string = "";
  email: string = "";
  nombre: string = "";
  constructor(private authSvc: AuthService) { }

  ngOnInit(): void {
  }

  onRegister() {
   
    this.authSvc.register(this.email, this.password);


  }
}
