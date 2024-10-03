import { PreguntaService } from './../../../services/pregunta.service';
import { ActivatedRoute } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  examenId:any;
  preguntas:any;
  puntosConseguidos = 0;
  respuestasCorrectas = 0;
  intentos = 0;

  esEnviado = false;
  timer:any;

  constructor(
    private locationSt:LocationStrategy,
    private route:ActivatedRoute,
    private preguntaService:PreguntaService
  ) { }

  ngOnInit(): void {
    this.prevenirElBotonDeRetroceso();
    this.examenId = this.route.snapshot.params['examenId'];
    console.log(this.examenId);
    this.cargarPreguntas();
  }

  cargarPreguntas(){
    this.preguntaService.listarPreguntasDelExamenParaLaPrueba(this.examenId).subscribe({
      next: (data:any) => {
        console.log(data);
        this.preguntas = data;

        this.timer = this.preguntas.length *2 * 60; // 2 minutos por pregunta 

        this.preguntas.forEach((p:any) => { // Recorremos las preguntas y agregamos una propiedad a cada una para almacenar la respuesta dada por el usuario
          p['respuestaDada'] = ''; // Agregamos una propiedad a cada pregunta para almacenar la respuesta dada por el usuario
        })
        console.log(this.preguntas); // Mostramos las preguntas en la consola
        this.iniciarTemporizador();
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Error','Error al cargar las preguntas de la prueba','error');
      }
  })
  }


  iniciarTemporizador(){
    let t = window.setInterval(() => {
      if(this.timer <= 0){
        this.evaluarExamen();
        clearInterval(t);
      }else{
        this.timer --;
      }
    },1000)
  }

  //Este método previene que el usuario pueda regresar a la página anterior
  prevenirElBotonDeRetroceso(){
    history.pushState(null,null!,location.href);//PushState hace que la página actual se guarde en el historial del navegador y no se pueda regresar a la página anterior
    this.locationSt.onPopState(() => { //onPopState se ejecuta cuando el usuario intenta regresar a la página anterior
      history.pushState(null,null!,location.href); //Si el usuario intenta regresar a la página anterior, se vuelve a guardar la página actual en el historial del navegador
    })
  }

  enviarCuestionario(){
    Swal.fire({
      title: '¿Quieres enviar el examen?',
      showCancelButton: true,
      cancelButtonText:'Cancelar',
      confirmButtonText: 'Enviar',
      icon:'info'
    }).then((e) => {
      if(e.isConfirmed){
        this.evaluarExamen();
      }
    })
  }

  evaluarExamen(){
    this.preguntaService.evaluarExamen(this.preguntas).subscribe({
      next: (data:any) => {
        console.log(data);
        this.puntosConseguidos = data.puntosMaximos;
        this.respuestasCorrectas = data.respuestasCorrectas;
        this.intentos = data.intentos;
        this.esEnviado = true;
      },
      error: (error) => {
        console.log(error);
      }
  })
    /*this.esEnviado = true;
    this.preguntas.forEach((p:any) => {
      if(p.respuestaDada == p.respuesta){
        this.respuestasCorrectas ++;
        let puntos = this.preguntas[0].examen.puntosMaximos/this.preguntas.length;
        this.puntosConseguidos += puntos;
      }

      if(p.respuestaDada.trim() != ''){
        this.intentos ++;
      }
    });

    console.log("Respuestas correctas : " + this.respuestasCorrectas);
    console.log("Puntos conseguidos : " + this.puntosConseguidos);
    console.log("Intentos : " + this.intentos);
    console.log(this.preguntas);*/
  }

  obtenerHoraFormateada(){
    let mm = Math.floor(this.timer/60);
    let ss = this.timer - mm*60;
    return `${mm} : min : ${ss} seg`;
  }

  imprimirPagina(){
    window.print();
  }
}
