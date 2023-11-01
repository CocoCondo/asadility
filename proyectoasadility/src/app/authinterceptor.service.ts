import { Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthinterceptorService implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req;
    const idToken = localStorage.getItem("id_token");
    if (idToken) {
      request = req.clone({
          headers: req.headers.set("Authorization",
              "Bearer " + idToken)
      });
    }
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 || err.status === 403) {
          this.router.navigateByUrl('/');
        }
        return throwError(() => err);;
      })
    );
  }
}
