import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user$: Observable<any> = this.authSvc.angularFireAuth.user;
  constructor(private authSvc: AuthService) { }

  ngOnInit(): void {
  }

}
