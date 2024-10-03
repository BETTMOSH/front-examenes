import  Swal  from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../../services/user.service';
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
    telefono : '',
    foto: ''
  };
  fotoFile: File | null = null;

  constructor(private userService:UserService,private snack:MatSnackBar) { }

  ngOnInit(): void {}

  // Método para manejar la selección de archivo
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.fotoFile = file;
      console.log('Foto seleccionada:', this.fotoFile);
    }
  }

  formSubmit(){
    const formData = new FormData();

    console.log(this.user);
    if(this.user.username == '' || this.user.username == null){
      this.snack.open('El nombre de usuario es requerido !!','Aceptar',{
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }

     // Convertimos fechaNacimiento al formato que viene desde el backend
  if(this.user.fechaNacimiento) {
    this.user.fechaNacimiento = formatDate(this.user.fechaNacimiento, 'yyyy-MM-dd', 'en-EN');
  }

  formData.append('usuario', new Blob([JSON.stringify(this.user)], {type: 'application/json'}));
  if(this.user.foto){
    formData.append('foto',this.user.foto);
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
