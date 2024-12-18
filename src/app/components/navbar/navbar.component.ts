import { FormControl } from '@angular/forms';
import { LoginService } from './../../services/loginservice/login.service';
import { Component, OnInit, NgZone, HostBinding } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  user:any = '';

  isDarkTheme = false;


  constructor(
    public loginService: LoginService, 
    private ngZone: NgZone,
    private overlay: OverlayContainer
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.user = this.loginService.getUser();
    this.loginService.loginStatusSubjec.asObservable().subscribe({
      next: (data) => {
        this.isLoggedIn = this.loginService.isLoggedIn();
        this.user = this.loginService.getUser();
        data;
      }
    })

   const savedTheme = localStorage.getItem('theme');
   const body = document.body;

   if (savedTheme == 'dark') {
      this.isDarkTheme = true;
      body.classList.add('dark-theme');
      this.overlay.getContainerElement().classList.add('dark-theme');
    }else{
      this.isDarkTheme = false;
      body.classList.remove('dark-theme');
      this.overlay.getContainerElement().classList.remove('dark-theme');
    }
  }

  toggleDarkMode(): void {
    const body = document.body;
    this.isDarkTheme = !this.isDarkTheme;
    if (this.isDarkTheme) {
      body.classList.add('dark-theme');
      this.overlay.getContainerElement().classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark-theme');
      this.overlay.getContainerElement().classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }

    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
  }

  public logout() {
    this.loginService.logout();
    window.location.reload();
  }
}