import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriaService } from './../../../services/categoriaservice/categoria.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/loginservice/login.service';


@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  categorias:any;
  

  constructor(
    public login:LoginService,
    private categoriaService:CategoriaService,
    private snack:MatSnackBar
  ) { }

  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe({
      next: (data:any) => {
        this.categorias = data;
      },
      error: (error) => {
        this.snack.open('Error al cargar las categorías','',{
          duration:3000
        })
        console.log(error);
      }
  })
  }

  public logout(){
    this.login.logout();
    window.location.reload();
  }

}
