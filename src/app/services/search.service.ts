import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../core/environments';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private esercizio:string='/esercizio'
private citta:string='/citta'
private cliente:string='/cliente'
private acquisto:string ='/acquisto'
  constructor(private http:HttpClient) { }
  getAllCities(){
    return this.http.get(enviroment.API_URL+this.citta)
  }
  getEsercizioByCittàAndNomeContaining(citta:number,nome:string){
    return this.http.get(enviroment.API_URL+this.cliente+this.esercizio+'/'+citta+'/'+nome)
  }
  saveAcquist(acquisto:{}){
    return this.http.post(enviroment.API_URL+this.acquisto,acquisto)
  }
}
