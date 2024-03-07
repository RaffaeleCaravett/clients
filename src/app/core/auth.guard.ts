import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router,private toastr:ToastrService) {}


  isAuthenticated:boolean = false;


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    if (this.isAuthenticated) {
      return true;
    } else {
this.router.navigate(['/forms'])
this.toastr.show('Devi prima effettuare l\'accesso per poter andare li')
return false;
 }
  }
  authenticateUser(bool?:boolean){
  if(bool){
     this.isAuthenticated=bool
  }else{
    this.isAuthenticated=false
  }
}
}
