import { LoginService } from './../../services/loginservice/login.service';
import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  user:any = null;


  constructor(public login: LoginService, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubjec.asObservable().subscribe({
      next: (data: any) => {
        this.isLoggedIn = this.login.isLoggedIn();
        this.user = this.login.getUser();
        data;
      }
    })
  }

  public logout() {
    this.login.logout();
    window.location.reload();
  }
}