import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Http, Response, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import 'rxjs/add/operator/catch';
@Injectable()
export class RestService {
	
	private token: string;
	private baseUrl = "http://localhost:9000";
	private loginUrl = this.baseUrl + "/login";
  private registerUrl = this.baseUrl + "/register";
  private options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) }); 
  constructor(private AuthHttp : AuthHttp, private http: Http, private toasty: ToastyService) { }
  
  login(username: string, password: string){
  	return this.http.post(this.loginUrl, JSON.stringify({ username: username, password: password}), this.options).map(res => res);
  }
  register(username: string, email: string, name: string, surname: string, password: string) {
    let data = JSON.stringify({username: username, email: email, name: name, surname: surname, password: password});
      return this.http.post(this.registerUrl, data, this.options).map(res => res);
  }
}