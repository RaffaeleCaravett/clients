import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{
  searchBusinessesForm!:FormGroup
  business:any
cities:any[]=[]
businesses:any[]=[]
carrello:any[]=[]
order:any[]=[]
total:number=0
  constructor(private activatedRoute:ActivatedRoute,private searchService:SearchService,private toastr:ToastrService){
}
  ngOnInit(): void {
    this.searchBusinessesForm= new FormGroup({
      citta:new FormControl('',Validators.required),
      nome:new FormControl('',Validators.required)
    })
    this.activatedRoute.params.subscribe(params => {
      console.log(params['id'])
      })
      this.searchService.getAllCities().subscribe((cities:any)=>{
        if(cities){
          this.cities=cities
        }
      })
  }

  search(){
if(this.searchBusinessesForm.valid){
this.searchService.getEsercizioByCittàAndNomeContaining(
  this.searchBusinessesForm.controls['citta'].value,
    this.searchBusinessesForm.controls['nome'].value
    ).subscribe((esercizi:any)=>{
  this.businesses=esercizi
  this.total=0
})
}else if(!this.searchBusinessesForm.controls['nome'].value||this.searchBusinessesForm.controls['nome'].value==''){
  this.businesses=[]
  this.total=0
}else{
this.toastr.show('Inserisci la città prima')
}
  }

addItemToOrder(itemId:number){
this.business.prodottos.forEach((p:any)=> {
  if(p.id==itemId){
  this.order.push(p)
  }
});
let totale=0
this.order.forEach((p:any)=>{
  totale+=p.prezzo
})
this.total=totale
}
removeItemFromOrder(itemId:number){
if(this.order){
  let newOrder:any[]=[]
  let numb:number=0
  this.order.forEach((p:any)=>{
    if(p.id!=itemId){
    newOrder.push(p)
    }else if(p.id==itemId){
      if(numb==0){
numb+=1
      }else{
newOrder.push(p)
      }
    }
  })
  this.order=newOrder
  let totale=0
  this.order.forEach((p:any)=>{
    totale+=p.prezzo
  })
  this.total=totale
}
}
}
