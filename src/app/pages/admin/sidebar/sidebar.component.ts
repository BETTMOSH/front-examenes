import { TYPE } from 'src/app/values.constants';
import { LoginService } from './../../../services/loginservice/login.service';

import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public login:LoginService) { }

  ngOnInit(): void {

  }

  public logout(){
    this.login.logout();
    
  }
  // aviso de despedida
  toast(typeIcon = TYPE.SUCCESS, timerProgressBar: boolean = false) {
    Swal.fire({
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      icon: typeIcon,
      timerProgressBar,
      timer: 5000,
      title: 'Hasta pronto!!!'
    })
  }

  logoutYtoast() {
    this.logout();
    this.toast();
    setTimeout(() => {
      window.location.reload();
    },2000);
  }

}
