import { LoginService } from '../../services/loginservice/login.service';
import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree , Router, CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';

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

    /* canActivate: CanActivateFn = (route, state) => {
    const loginService = inject(LoginService);
    const router = inject(Router);
  
    if (loginService.isLoggedIn() && loginService.getUserRole() === 'NORMAL') {
      return true;
    }
  
    router.navigate(['login']);
    return false;
  }; 
}*/
