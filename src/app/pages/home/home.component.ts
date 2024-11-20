import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/loginservice/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  visitas: any;
  
  constructor(public loginService: LoginService) { }
  
  ngOnInit(): void {
    
  }
}
