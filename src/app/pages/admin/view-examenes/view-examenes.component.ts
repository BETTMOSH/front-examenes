import  Swal  from 'sweetalert2';
import { ExamenService } from '../../../services/examenservice/examen.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-view-examenes',
  templateUrl: './view-examenes.component.html',
  styleUrls: ['./view-examenes.component.css']
})
export class ViewExamenesComponent implements OnInit {

  examenes : any = [];

  constructor(private examenService:ExamenService) {}

  // Se obtienen los exámenes de la base de datos y se almacenan en la variable examenes
  ngOnInit(): void {
    this.examenService.listarExamenes().subscribe({
      next:(dato:any) => {
        this.examenes = dato;
        console.log(this.examenes);
      },
      error:(error) => {
        console.log(error);
        Swal.fire('Error','Error al cargar los exámenes','error');
      }
    })
  }
  //metodo modal o alerta para eliminar examen
  eliminarExamen(examenId:any){
    Swal.fire({
      title:'Eliminar examen',
      text:'¿Estás seguro de eliminar el examen?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Eliminar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){ //propiedad de SweetAlert "booblean"
        this.examenService.eliminarExamen(examenId).subscribe({
          next:(data) => {
            this.examenes = this.examenes.filter((examen:any) => examen.examenId != examenId);
            Swal.fire('Examen eliminado','El examen ha sido eliminado de la base de datos','success');
          },
          error:(error) => {
            Swal.fire('Error','Error al eliminar el examen','error');
          }
        })
      }
    })
  }
}
