import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../helperUrl';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  constructor(private http:HttpClient) { }

  public listarPreguntasDelExamen(examenId:number){
    return this.http.get(`${baserUrl}/pregunta/examen/todos/${examenId}`);
  }

  public guardarPregunta(pregunta:string){
    return this.http.post(`${baserUrl}/pregunta/`,pregunta);
  }

  public eliminarPregunta(preguntaId:number){
    return this.http.delete(`${baserUrl}/pregunta/${preguntaId}`);
  }

  public actualizarPregunta(pregunta:string){
    return this.http.put(`${baserUrl}/pregunta/`,pregunta);
  }

  public obtenerPregunta(preguntaId:number){
    return this.http.get(`${baserUrl}/pregunta/${preguntaId}`);
  }

  public listarPreguntasDelExamenParaLaPrueba(examenId:number){
    return this.http.get(`${baserUrl}/pregunta/examen/todos/${examenId}`);
  }

  public evaluarExamen(preguntas:string){
    return this.http.post(`${baserUrl}/pregunta/evaluar-examen`,preguntas);
  }
}
