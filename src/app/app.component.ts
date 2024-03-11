import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos'
import { FormsService } from './services/forms.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'clients';

  constructor(private formsService:FormsService,private router:Router){}
  ngOnInit(): void {
      AOS.init()
      if(localStorage.getItem('accessToken')){
        let token= localStorage.getItem('accessToken')
        let refreshToken= localStorage.getItem('refreshToken')
this.formsService.verifyClienteToken(token!).subscribe({
  next:(cliente:any)=>{
  if(cliente){
    localStorage.setItem('cliente',cliente)
    this.formsService.token=token!
    this.formsService.refreshToken=refreshToken!
    this.formsService.authenticateUser(true)
    this.router.navigate(['/search',cliente.id])
  }
},error:(err:any)=>{
this.formsService.verifyClienteRefreshToken(refreshToken!).subscribe({
  next:(tokens:any)=>{
    if(tokens){
      this.formsService.verifyClienteToken(tokens.accessToken).subscribe({
        next:(data:any)=>{
          if(data){
            localStorage.setItem('cliente',data)
            this.formsService.token=tokens.accessToken
            this.formsService.refreshToken=tokens.refreshToken!
            this.formsService.authenticateUser(true)
            this.router.navigate(['/search',data.id])
          }
        },
        error:(err:any)=>{
localStorage.clear()
        }
      })
    }
  }})
}
})
      }
  }
}
