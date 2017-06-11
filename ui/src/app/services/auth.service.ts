import { Injectable } from '@angular/core';

import { tokenNotExpired } from 'angular2-jwt';
import { SessionStorageService } from 'ngx-webstorage';


@Injectable()
export class AuthService {

  constructor(private SessionStorageService: SessionStorageService) {}

  loggedIn() {
	  return tokenNotExpired();
  }

  isAdmin(){
  	if(this.SessionStorageService.retrieve("user") != null && this.SessionStorageService.retrieve("user").isAdmin && this.loggedIn())
		return true;
	else
		return false;
  }
}
