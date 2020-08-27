// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
// import { AuthenticationService } from '../services/authentication.service';
// import { Observable } from 'rxjs';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';

// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/catch';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//     constructor(
//         private authService: AuthenticationService,
//         private router: Router
//     ) { }
//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         request = request.clone({
//             setHeaders: {
//                 Authorization: `Bearer ${this.authService.getToken()}`
//             }
//         });
//         return next.handle(request).do((event: HttpEvent<any>) => {
//             if (event instanceof HttpResponse) {
//                 // do stuff with response if you want
//             }
//         }, (err: any) => {
//             if (err instanceof HttpErrorResponse) {
//                 switch (err.status) {
//                     case 400:
//                         return false;
//                     case 401:
//                         return this.router.navigate(['register']);
//                     case 404:
//                         return this.router.navigate(['404']);
//                 }
//             }
//         });
//     }
// }