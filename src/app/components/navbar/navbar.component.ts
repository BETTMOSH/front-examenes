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

  switchTheme = new FormControl(false)
  @HostBinding('class') className=''
  darkClass = 'theme-dark'
  lightClass = 'theme-light'


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

    this.switchTheme.valueChanges.subscribe((currentMode) => {

        this.className = currentMode ? this.darkClass : this.lightClass

        if(currentMode){
          this.overlay.getContainerElement().classList.add(this.darkClass)
        }
        else{
          this.overlay.getContainerElement().classList.remove(this.darkClass)
        }

    })
  }

  public logout() {
    this.loginService.logout();
    window.location.reload();
  }
}