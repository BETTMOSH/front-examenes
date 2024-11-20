import  Swal  from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../../services/usuarioservice/user.service';
import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user = {
    username : '',
    password : '',
    nombre : '',
    apellido : '',
    fechaNacimiento: '',
    email : '',
    telefono : ''
    
  };
  fotoFile: File | null = null;

  constructor(private userService:UserService,private snack:MatSnackBar) { }

  ngOnInit(): void {}

  formSubmit(){

    console.log(this.user);
    if(this.user.username == '' || this.user.username == null){
      this.snack.open('El nombre de usuario es requerido !!','Aceptar',{
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'center'
      });
      return;
    }

     // Convertimos fechaNacimiento al formato que viene desde el backend
  if(this.user.fechaNacimiento) {
    this.user.fechaNacimiento = formatDate(this.user.fechaNacimiento, 'yyyy-MM-dd', 'en-EN');
  }

    this.userService.addUsuario(this.user).subscribe({
      next: (data) => {
        console.log(data);
        Swal.fire('Usuario guardado','Usuario registrado con exito en el sistema','success');
      },
      error: (error) => {
        console.log(error);
        this.snack.open('Ha ocurrido un error en el sistema !!','Aceptar',{
          duration : 3000
        });
      }
  })
  }

}
