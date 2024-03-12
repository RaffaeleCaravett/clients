import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-acquisto',
  templateUrl: './acquisto.component.html',
  styleUrls: ['./acquisto.component.scss']
})
export class AcquistoComponent implements OnInit{

  acquistoForm!:FormGroup
  tipiPagamento:any[]=['Carta','Contanti']
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<AcquistoComponent>,private toastr:ToastrService,private searchService:SearchService) { }

  ngOnInit(): void {
this.acquistoForm = new FormGroup({
  tipoPagamento: new FormControl('',Validators.required)
})
 }

 generateSell(){
  if(this.data[1].length>0&&this.acquistoForm.valid){
    let totale:number=0
    let products:any[]=[]
    for(let p of this.data[1]){
  totale+=p.prezzo
  products.push(p.id)
}
    this.searchService.saveAcquist(
      {
totale:totale,
anno:new Date().getFullYear(),
mese:new Date().getMonth(),
giorno:new Date().getDay(),
tipo_pagamento:this.acquistoForm.controls['tipoPagamento'].value,
prodotto_id:products,
esercizio_id:this.data[2].id,
cliente_id:this.data[0]
      }
    ).subscribe({
      next:(acquisto:any)=>{if(acquisto){
        this.dialogRef.close("generated")
      }},
      error:(err:any)=>{this.toastr.show(err.error.message||"Qualcosa è andato storto nell'elaborazione della richiesta.")},
      complete:()=>{}
    })
  }else{
  this.toastr.show("Seleziona il tipo di pagamento.")
  }

 }
}
