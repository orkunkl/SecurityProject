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
  
  constructor(private AuthHttp : AuthHttp, private http: Http, private toasty: ToastyService) {  }
  	
  login(username: string, password: string){
    let options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
  	return this.http.post(this.loginUrl, JSON.stringify({ username: username, password: password}), options).map(res => res);
     
  }
  register(username: string, email: string, name: string, surname: string, password: string) {
    let data = JSON.stringify({username: username, email: email, name: name, surname: surname, password: password})
      return this.http.post(this.registerUrl, data)
        .map(data => data.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
       
  }
/*
        .subscribe(res => 
          {
            if(res.status == "Successful")
              return true;
            else {
              let toastOptions:ToastOptions = {
                title: "Error",
                msg: "The message",
                showClose: true,
                timeout: 5000,
                theme: 'default',
                onAdd: (toast:ToastData) => {
                    console.log('Toast ' + toast.id + ' has been added!');
                },
                onRemove: function(toast:ToastData) {
                    console.log('Toast ' + toast.id + ' has been removed!');
                }
              };
              this.toastyService.error(toastOptions);
              return false;
            }
          }
        )*/
}

