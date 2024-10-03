import { LoginService } from './../../services/login.service';
import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  user:any = null;
  profileRoute = '/admin';

  constructor(public login: LoginService, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();

    if (this.user && !this.user.roles) {
      this.user.roles = [];
    }

    this.login.loginStatusSubjec.asObservable().subscribe({
      next: () => {
        this.isLoggedIn = this.login.isLoggedIn();
        this.user = this.login.getUser();

        if (this.user && this.user.roles.includes('admin')) {
          this.profileRoute = '/admin';
        } else if (this.user && this.user.roles.includes('user')) {
          this.profileRoute = '/user-dashboard/profile';
        }
      }
    });
  }

  /* @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.ngZone.runOutsideAngular(() => {
      console.log('Touchstart event:', event);
    });
  } */

  public logout() {
    this.login.logout();
    window.location.reload();
  }

  getProfileRoute(): string {
    if (this.user && this.user.roles.includes('admin')) {
      this.profileRoute = '/admin';
    } else if (this.user && this.user.roles.includes('user')) {
      this.profileRoute = '/user-dashboard/profile';
    }
    console.log('Profile route:', this.profileRoute);
    return this.profileRoute;
  }
}