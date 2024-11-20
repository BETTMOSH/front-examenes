import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/loginservice/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TYPE } from 'src/app/values.constants';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  //creamos un objeto para almacenar los datos del formulario
  loginData = {
    "username" : '',
    "password" : '',
  }

  constructor(
    private snack:MatSnackBar,
    private loginService:LoginService,
    private router:Router) { }

  ngOnInit(): void {

  }

  formSubmit(){
    if(this.loginData.username.trim() == '' || this.loginData.username.trim() == null){
      this.snack.open('El nombre de usuario es requerido !!','Aceptar',{
        duration:3000
      })
      return;
    }
    if(this.loginData.password.trim() == '' || this.loginData.password.trim() == null){
      this.snack.open('La contraseña es requerida !!','Aceptar',{
        duration:3000
      })
      return;
    }
   
    this.loginService.generateToken(this.loginData).subscribe({
      next: (data:any) => {
        console.log(data);
        this.loginService.loginUser(data.token);
        
        this.loginService.getCurrentUser().subscribe({
          next: (user:any) => {
          this.loginService.setUser(user);
          console.log(user);

          if(this.loginService.getUserRole() == 'ADMIN'){
            this.router.navigate(['admin']);
            this.loginService.loginStatusSubjec.next(true);
          }
          else if(this.loginService.getUserRole() == 'NORMAL'){
            this.router.navigate(['user-dashboard/profile']);
            this.loginService.loginStatusSubjec.next(true);
          }
          else{
            this.loginService.logout();
          }
        }
      })
      },error: (error) => {
        console.log(error);
        this.snack.open('Detalles inválidos , vuelva a intentar !!','Aceptar',{
          duration:3000
        })
      }
    })
  }

  /* toast(typeIcon = TYPE.SUCCESS, timerProgressBar: boolean = false) {
    Swal.fire({
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      icon: typeIcon,
      timerProgressBar,
      timer: 5000,
      title: 'Inicio de sesión exitoso'
    })
  } */
}
