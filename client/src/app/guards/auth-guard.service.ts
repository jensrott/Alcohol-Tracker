import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private storage: Storage,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {
    // this.storage.get('jwtToken').then(key => {
    //   if (key) {
    //     return true
    //   }
    //   this.router.navigateByUrl('/login');
    //   return false;
    // })
    if (this.authenticationService.isAuthenticated()) {
      return true
    }
    this.router.navigateByUrl('/login');
    return false;

  }
}
