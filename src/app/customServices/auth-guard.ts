import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbModal ,NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { ToastComponent } from 'src/app/pop-ups/toast/toast.component';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private jwt= new JwtHelperService()
  constructor(private authService: DataService, private router: Router,  private modalService: NgbModal,) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
      const token = localStorage.getItem("accessToken")
      console.log(this.jwt.isTokenExpired(token),"expired")
      // if(token && !this.jwt.isTokenExpired(token)){
      if(true){
        return true
        
      } 
      else if(token && this.jwt.isTokenExpired(token)){
        alert("please login again")
        return this.router.navigate(['/login']);
      }
      
      
      else{
       return this.router.navigate(['/login']);
      }
      
  }
}
