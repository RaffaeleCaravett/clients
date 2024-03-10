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
})
}else{
this.toastr.show('Inserisci la città prima')
}
  }
}
