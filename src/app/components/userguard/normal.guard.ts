import { LoginService } from '../../services/loginservice/login.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class NormalGuard {

  constructor(private loginService:LoginService,private router:Router){

  }

  canActivate(): boolean {
    if (this.loginService.isLoggedIn() && this.loginService.getUserRole() === 'NORMAL') {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}
