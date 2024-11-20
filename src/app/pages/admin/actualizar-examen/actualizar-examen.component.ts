import  Swal  from 'sweetalert2';
import { CategoriaService } from './../../../services/categoriaservice/categoria.service';
import { ExamenService } from 'src/app/services/examenservice/examen.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-examen',
  templateUrl: './actualizar-examen.component.html',
  styleUrls: ['./actualizar-examen.component.css']
})
export class ActualizarExamenComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private examenService:ExamenService,
    private categoriaService:CategoriaService,
    private router:Router) { }

  examenId = 0;
  examen:any;
  categorias:any;

  ngOnInit(): void {
    this.examenId = this.route.snapshot.params['examenId'];
    this.examenService.obtenerExamen(this.examenId).subscribe({
      next:(data) => {
        this.examen = data;
        console.log(this.examen);
      },
      error:(error) => {
        console.log(error);
      }
    })

    this.categoriaService.listarCategorias().subscribe({
      next:(data:any) => {
        this.categorias = data;
      },
      error:(error) => {
        alert('Error al cargar las categorías');
      }
    })
  }

  public actualizarDatos(){
    this.examenService.actualizarExamen(this.examen).subscribe({
      next:(data:any) => {
        Swal.fire('Examen actualizado','El examen ha sido actualizado con éxito','success').then(
          (e) => {
            this.router.navigate(['/admin/examenes']);
          }
        );
      },
      error:(error) => {
        Swal.fire('Error en el sistema','No se ha podido actualizar el examen','error');
        console.log(error);
      }
    })
  }
}
