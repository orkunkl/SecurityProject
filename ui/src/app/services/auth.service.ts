import { Injectable } from '@angular/core';

import { tokenNotExpired } from 'angular2-jwt';
import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {

  constructor(private SessionStorageService: SessionStorageService, private router: Router) {}

  loggedIn() {
    if(tokenNotExpired() && this.SessionStorageService.retrieve("user") != null)
	    return true
    else 
      return false 
  }

  isAdmin(){
  	if(this.SessionStorageService.retrieve("user") != null && this.SessionStorageService.retrieve("user").isAdmin && this.loggedIn())
		  return true;
	  else
		  return false;
  }
  logout(){
    console.log(this.SessionStorageService.retrieve("user"))
    console.log(this.SessionStorageService.retrieve("token"))
    this.SessionStorageService.clear("user")
    this.SessionStorageService.clear("token")
    this.router.navigate(['']);
  }
}
