import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../core/environments';
import { AuthGuard } from '../core/auth.guard';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  private auth:string ='/auth'
  private faker:string = '/faker'
  private citta:string = '/citta'
  public register:string='/register'
  private cliente:string='/cliente'
  private log:string='/login'
  public isAuthenticated:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public token:string =''
  public refreshToken:string =''


  constructor(private http:HttpClient,private authGuard:AuthGuard) { }

getRandomCliente(){
  return this.http.get(enviroment.API_URL+this.auth+this.faker)
}
getAllCities(){
  return this.http.get(enviroment.API_URL+this.citta)
}
authenticateUser(bool:boolean){
  this.authGuard.authenticateUser(bool)
  this.isAuthenticated.next(bool);
  }
signUp(esercizio:{},file:any){
  const formData: FormData = new FormData();


  const json = JSON.stringify(esercizio);
  const blob = new Blob([json], {
    type: 'application/json'
  });
  formData.append('clienteDTO', blob);
      formData.append('file', file, file.name);


  return this.http.post(enviroment.API_URL + this.auth+'/cliente' +this.register, formData);
}

setToken(token:string){
  this.token=token
}
setRefreshToken(refreshToken:string){
  this.refreshToken=refreshToken
}
login(cliente:any){
  return this.http.post(enviroment.API_URL+this.auth+'/clienteLogin',cliente)
}
verifyClienteToken(token:string){
  return this.http.get(enviroment.API_URL+this.auth+'/cliente/'+token)
}
verifyClienteRefreshToken(refreshToken:string){
  return this.http.get(enviroment.API_URL+this.auth+'/refreshClienteToken/'+refreshToken)
}
}
