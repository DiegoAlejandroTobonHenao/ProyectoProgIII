import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from 'src/app/services/security.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationRequiredGuard implements CanActivate {
  constructor(private secService: SecurityService, private router: Router){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if (this.secService.isActiveSession()){
        return true;
      }else {
        this.router.navigate(['/home']);
        return false;
      }
  }
  
}
