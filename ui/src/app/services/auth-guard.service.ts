import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private AuthService: AuthService, private router: Router) { }
  canActivate(): boolean {
        if (this.AuthService.loggedIn()){
        	return true
        }
        this.router.navigate(['/login'])
        return false
      }

}
