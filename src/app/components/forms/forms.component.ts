import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
cities:any[]=[]
selectedImage:any
fileImage:any
submitted:boolean=false
constructor(private _formBuilder: FormBuilder, private formService:FormsService,private toastr:ToastrService) {}

  ngOnInit(): void {
    this.formService.getAllCities().subscribe((cities:any)=>{
      this.cities=cities
    })
    this.section='signup'
this.firstFormGroup = this._formBuilder.group({
  nome: ['', Validators.required],
  cognome: ['', Validators.required],
  eta: ['', [Validators.required,Validators.min(18)]],
  citta: ['', Validators.required]
});
this.secondFormGroup = this._formBuilder.group({
  email: ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
  password: ['', Validators.required],
  ripetiPassword: ['', Validators.required],
  immagineProfilo: ['', Validators.required]
});
this.isLinear = false;
  }


  signUp(){
if(this.firstFormGroup.valid&&this.secondFormGroup.valid){

}else if(this.firstFormGroup.invalid&&this.secondFormGroup.invalid){
  this.toastr.show("Manca qualche dato richiesto")
}else if(this.secondFormGroup.controls['password'].value!=this.secondFormGroup.controls['ripetiPassword'].value){
this.toastr.show("Le password non coincidono")
}else{
  this.toastr.show("Assicurati di inserire tutti i dati richiesti")
}
  }
  getRandomCliente(){
this.formService.getRandomCliente().subscribe((cliente:any)=>{
  if(cliente){
    this.firstFormGroup = this._formBuilder.group({
      nome: [cliente.nome, Validators.required],
      cognome: [cliente.cognome, Validators.required],
      eta: [cliente.eta, [Validators.required,Validators.min(18)]],
      citta: [cliente.citta.id, Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      email: [cliente.email, [Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
      password: [cliente.password, Validators.required],
      ripetiPassword: [cliente.password, Validators.required],
      immagineProfilo: ['', Validators.required]
    });
  }

})
  }
  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0] && event.target.files[0].size > 1048576) {
       this.toastr.show("Dimensioni del file troppo grandi, massimo 1 MB")
    }else{
       this.fileImage = event.target.files[0];
this.secondFormGroup.controls['immagineProfilo'].setValue('Ciao')
        const reader = new FileReader();
        reader.onload = e => this.selectedImage = reader.result;

        reader.readAsDataURL(this.fileImage);
    }

    }
  }
}
