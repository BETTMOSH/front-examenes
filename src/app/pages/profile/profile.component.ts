import { LoginService } from './../../services/loginservice/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:any = null;

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    /*this.loginService.getCurrentUser().subscribe(
      (user:any) => {
        this.user = user;
      },
      (error) => {
        alert("error");
      }
    )*/
  }
  
  imprimirPagina() {
    const contenido = document.getElementById('profile-card')?.innerHTML;
    if (contenido) {
      const ventanaImpresion = window.open('', 'IMPRIMIR',);

      // Escribe el contenido del perfil en esa ventana
      ventanaImpresion?.document.write('<html><head><title>Lenguage Active</title>');
      ventanaImpresion?.document.write('<style>');
      ventanaImpresion?.document.write(`
        @media print {
        button,
          .no-print { display: none; }
        }
        <img class = "profile-image"
            src = "assets/imagenes/gabriel.jpg" alt="foto-perfil"> { max-width: 100%; height: auto; } /* Asegurar que la imagen se muestre bien en la impresión */
      `);
      ventanaImpresion?.document.write('</style></head><body>');
      ventanaImpresion?.document.write(contenido);
      ventanaImpresion?.document.write('</body></html>');

      // Espera a que todo el contenido se cargue antes de ejecutar print
      ventanaImpresion?.document.close();
      ventanaImpresion?.focus();

      // Imprime el contenido y cierra la ventana temporal
      ventanaImpresion?.print();
      ventanaImpresion?.close();
    }
  }
}