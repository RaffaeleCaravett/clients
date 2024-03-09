import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsService } from 'src/app/services/forms.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
signedIn:boolean=false

constructor(private formsService:FormsService,private router:Router){
  this.formsService.isAuthenticated.subscribe((bool:boolean)=>{
    this.signedIn=bool
  })
}

logout(){
  localStorage.clear()
  this.formsService.authenticateUser(false)
  this.formsService.token=''
  this.formsService.refreshToken=''
  this.router.navigate(['/'])
}
}
