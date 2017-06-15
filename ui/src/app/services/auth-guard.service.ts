import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
// Import our authentication service
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private AuthService: AuthService, private router: Router) { }
  canActivate(): boolean {
        // I'm assuming that your guard1.canActivate and guard2.canActivate return boolean
        console.log(this.AuthService.loggedIn())
        if (!this.AuthService.loggedIn()){
        	return true
        }
        this.router.navigate(['/login'])
        return false
      }

}
