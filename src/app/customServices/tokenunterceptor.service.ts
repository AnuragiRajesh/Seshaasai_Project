import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequest, HttpEvent, HttpHandler, HttpInterceptor } from '@angular/common/http';

// export function adminAccessToken()  {
//   var cookieValue ="Access Token not Found";
//   var cookiesArray = document.cookie.split(';');
//   for(var i = 0; i < cookiesArray.length; i++) {
//       var cookie = cookiesArray[i].trim();
//       if(cookie.indexOf('accessToken=') === 0) {
//            cookieValue = cookie.substring('accessToken='.length, cookie.length);
//          break
//       }
//   }
//   return cookieValue
// }
@Injectable({
  providedIn: 'root'
})
export class TokenunterceptorService implements HttpInterceptor {
  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("accessToken")
    let tokenheadfer = req.clone({
      setHeaders: {
        Authorization: "bearer " + token
      }
    });
    return next.handle(tokenheadfer)
  }
}
