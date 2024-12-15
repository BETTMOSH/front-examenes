import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../helperUrl';
import { Categoria } from 'src/app/interfaces/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http:HttpClient) {}

  public listarCategorias(){
    return this.http.get(`${baserUrl}/categoria/`);
  }

  public agregarCategoria(categoria:Categoria){
    return this.http.post(`${baserUrl}/categoria/`,categoria);
  }

  public actualizarCategoria(categoria:string){
    return this.http.put(`${baserUrl}/categoria/`,categoria);
  }

  public eliminarCategoria(id:number){
    return this.http.delete(`${baserUrl}/categoria/${id}`);
  }
  
}
