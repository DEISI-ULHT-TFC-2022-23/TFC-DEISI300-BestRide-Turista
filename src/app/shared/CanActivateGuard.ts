
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginApiService } from '../login/login-api.service';

@Injectable()
export class CanActivateGuard implements CanActivate{
  constructor(private loginApi: LoginApiService, private router: Router) {}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    if (this.loginApi.isAuthenticated()){
      return true;
    }else{
      this.router.navigate(['/login']);
    }
  }
}
