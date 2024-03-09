import { Component, OnInit, ViewChild } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
loginForm!:FormGroup
constructor(private _formBuilder: FormBuilder, private formService:FormsService,private toastr:ToastrService,private router:Router) {}

  ngOnInit(): void {
    this.loginForm=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]),
      password: new FormControl('', [Validators.required,Validators.minLength(6)]),
    })
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
    this.submitted=true
if(this.firstFormGroup.valid&&this.secondFormGroup.valid&&this.secondFormGroup.controls['password'].value==this.secondFormGroup.controls['ripetiPassword'].value&&this.selectedImage){
    this.formService.signUp(
      {
        nome:this.firstFormGroup.controls['nome'].value,
        email:this.secondFormGroup.controls['email'].value,
        password:this.secondFormGroup.controls['password'].value,
        citta_id:this.firstFormGroup.controls['citta'].value,
        cognome:this.firstFormGroup.controls['cognome'].value,
        eta:this.firstFormGroup.controls['eta'].value,
      },this.fileImage
    ).subscribe({
      next: (esercizio:any)=>{
        if(esercizio){
    this.toastr.show("Cliente salvato")
    this.firstFormGroup.reset()
    this.section='login'
    this.fileImage=null
    this.selectedImage=null
            }
          },
          error:(err:any)=>{
            this.toastr.show(err.error.message||"Qualcosa è andato storto nel salvataggio della scheda")
          },
          complete:()=>{}
        })
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
  login(){
this.submitted=true
    if(this.loginForm.valid){
this.formService.login(
  {
  email:this.loginForm.controls['email'].value,
  password:this.loginForm.controls['password'].value
  }
  ).subscribe({
    next:(data:any)=>{
    console.log(data)
    if(data){
      this.formService.verifyClienteToken(data.tokens.accessToken).subscribe((user:any)=>{
        if(user){
          localStorage.setItem('cliente',JSON.stringify(user))
          localStorage.setItem('accessToken',data.tokens.accessToken)
          localStorage.setItem('refreshToken',data.tokens.refreshToken)
          this.formService.authenticateUser(true)
          this.formService.setToken(data.tokens.accessToken)
          this.formService.setRefreshToken(data.tokens.refreshToken)
          this.router.navigate(['/search'])
        }
      })
    }
  },
  error:(err:any)=>{
this.toastr.show(err.error.message||"Qualcosa è andato storto nel login")
  },
  complete: ()=>{}
})
}
  }
}
