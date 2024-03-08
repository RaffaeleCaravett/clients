import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormsService } from 'src/app/services/forms.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit{
section:string=''
isLinear: any;
firstFormGroup: any;
secondFormGroup: any;



constructor(private _formBuilder: FormBuilder, private formService:FormsService) {}

  ngOnInit(): void {
    this.section='signup'
this.firstFormGroup = this._formBuilder.group({
  nome: ['', Validators.required],
  cognome: ['', Validators.required],
  eta: ['', [Validators.required,Validators.min(18)]]

});
this.secondFormGroup = this._formBuilder.group({
  email: ['', Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)],
  password: ['', Validators.required],
  ripetiPassword: ['', Validators.required]
});
this.isLinear = false;
  }


  signUp(){

  }
  getRandomCliente(){
this.formService.getRandomCliente().subscribe((cliente:any)=>{
  console.log(cliente)
})
  }
}
