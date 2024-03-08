import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../core/environments';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  private auth:string ='/auth'
  private faker:string = '/faker'
  private citta:string = '/citta'

  constructor(private http:HttpClient) { }

getRandomCliente(){
  return this.http.get(enviroment.API_URL+this.auth+this.faker)
}
getAllCities(){
  return this.http.get(enviroment.API_URL+this.citta)
}
}
