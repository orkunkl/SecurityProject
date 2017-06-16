import { Injectable } from '@angular/core';

import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {

  constructor(private SessionStorageService: SessionStorageService, private router: Router) {}

  loggedIn() {
    if(this.SessionStorageService.retrieve("token") != null && this.SessionStorageService.retrieve("user") != null)
	    return true
    else 
      return false 
  }

  isAdmin(){
  	if(this.loggedIn() && this.SessionStorageService.retrieve("user").isAdmin)
		  return true;
	  else
		  return false;
  }
  logout(){
    this.SessionStorageService.clear("user")
    this.SessionStorageService.clear("token")
    this.router.navigate(['']);
  }
}
