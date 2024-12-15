import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../helperUrl';
import { CategoriaService } from '../categoriaservice/categoria.service';
import { Examen } from 'src/app/interfaces/examen';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  constructor(private http:HttpClient) { }

  public listarCuestionarios(){
    return this.http.get(`${baserUrl}/examen/`);
  }

  public agregarExamen(examen:Examen){
    return this.http.post(`${baserUrl}/examen/`,examen);
  }

  public eliminarExamen(examenId:number){
    return this.http.delete(`${baserUrl}/examen/${examenId}`);
  }

  public obtenerExamen(examenId:number){
    return this.http.get(`${baserUrl}/examen/${examenId}`);
  }

  public actualizarExamen(examen:string){
    return this.http.put(`${baserUrl}/examen/`,examen);
  }

  public listarExamenesDeUnaCategoria(categoriaId:number){
    return this.http.get(`${baserUrl}/examen/categoria/${categoriaId}`);
  }

  public obtenerExamenesActivos(){
    return this.http.get(`${baserUrl}/examen/activo`);
  }

  public obtenerExamenesActivosDeUnaCategoria(categoriaId:number){
    return this.http.get(`${baserUrl}/examen/categoria/activo/${categoriaId}`);
  }
}
