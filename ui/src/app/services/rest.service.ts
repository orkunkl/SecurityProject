import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import { Logger } from "angular2-logger/core"; // ADD THIS
import 'rxjs/add/operator/catch';
@Injectable()
export class RestService {
	
	private token: string;
	private baseUrl = "http://localhost:9000";
	private loginUrl = this.baseUrl + "/login";
  private registerUrl = this.baseUrl + "/register";
  
  constructor(private AuthHttp : AuthHttp, private http: Http, private logger: Logger, private toasty: ToastyService) {  }
  	
  login(username: string, password: string){
  	return this.http.post(this.loginUrl, JSON.stringify({ username: username, password: password}))
      
      /*        data => { 
          if(data.status == "Successful"){
            this.logger.info('login successful')
            return true;
          }
          else {
            let toastOptions:ToastOptions = {
                title: "Error",
                msg: "Authentication error",
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
            this.toasty.error(toastOptions);
            return false;},
        err => console.error(err),
        () => console.log('done')*/

      /*.map(res => res.json()
        if(res.json().status == "Successful"){
          this.logger.info('login successful')
          return true;
        }
        else {
          this.logger.info('login failed')
          return false;
        }
      }
    ).catch(this.handleError)*/
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

