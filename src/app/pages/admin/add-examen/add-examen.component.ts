import { Router } from '@angular/router';
import { ExamenService } from '../../../services/examenservice/examen.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import  Swal  from 'sweetalert2';
import { CategoriaService } from './../../../services/categoriaservice/categoria.service';
import { Component, OnInit } from '@angular/core';
import { Examen } from 'src/app/interfaces/examen';
import { Categoria } from 'src/app/interfaces/categoria';

@Component({
  selector: 'app-add-examen',
  templateUrl: './add-examen.component.html',
  styleUrls: ['./add-examen.component.css']
})
export class AddExamenComponent implements OnInit {
  // 
  categorias:any = [];

  examenData: Examen = {
    titulo:'',
    descripcion:'',
    puntosMaximos:'',
    numeroDePreguntas:'',
    activo:true, 
    categoriaId:'',
    usuarioId:'1',
    
  }

  constructor(
    private categoriaService:CategoriaService,
    private snack:MatSnackBar,
    private examenService:ExamenService,
    private router:Router) { }

  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe({
      next:(data) => {
        this.categorias = data;
        console.log(this.categorias);
      },
      error:(error) => {
        console.log(error);
        Swal.fire('Error !!','Error al cargar los datos','error');
      }
  })
  }

  guardarExamen(){
    console.log(this.examenData);
    if(this.examenData.titulo.trim() == '' || this.examenData.titulo == null){
      this.snack.open('El título es requerido','',{
        duration:3000
      });
      return ;
    }

    this.examenService.agregarExamen(this.examenData).subscribe({
      next:(data) => {
        console.log(data);
        Swal.fire('Examen guardado','El examen ha sido guardado con éxito','success');
        this.examenData = {
          titulo : '',
          descripcion : '',
          puntosMaximos : '',
          numeroDePreguntas : '',
          activo:true,
          categoriaId:'',
          usuarioId:'1',
          
        }
        this.router.navigate(['/admin/examenes']);
      },
      error:(error) => {
        Swal.fire('Error','Error al guardar el examen','error');
      }
    })
  }

}
