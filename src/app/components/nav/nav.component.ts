import { Component } from '@angular/core';
import { FormsService } from 'src/app/services/forms.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
signedIn:boolean=false

constructor(private formsService:FormsService){
  this.formsService.isAuthenticated.subscribe((bool:boolean)=>{
    this.signedIn=bool
  })
}
}
