import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  user$: Observable<any> = this.authSvc.angularFireAuth.user;
  mensaje: string = "";
  constructor(private authSvc: AuthService) { }

  ngOnInit(): void {
  }

}
