import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from '../helperUrl';
import { Usuario } from 'src/app/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  public addUsuario(user:Usuario){
    return this.httpClient.post(`${baserUrl}/usuarios/`,user);
  }
}
