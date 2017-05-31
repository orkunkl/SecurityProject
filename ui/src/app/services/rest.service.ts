import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import { Logger } from "angular2-logger/core"; // ADD THIS

@Injectable()
export class RestService {
	
	private token: string;
	private baseUrl = "http://localhost:9000";
	private loginUrl = this.baseUrl + "/login";
  private registerUrl = this.baseUrl + "/register";
  
  constructor(private http : AuthHttp, private logger: Logger) {  }
  	
  login(username: string, password: string){
  	this.http.post(this.loginUrl, JSON.stringify({ username: username, password: password}))
      .map(res => {
        if(res.json().status == "Successful"){
          this.logger.info('login successful')
          return true;
        }
        else {
          this.logger.info('login failed')
          return false;
        }
      }
    ).catch(this.handleError)
  }
  register(username: string, email: string, name: string, surname: string, password: string) {
    let data = JSON.stringify({username: username, email: email, name: name, surname: surname, password: password})
      this.http.post(this.registerUrl, data)
        .map(res => {
          if(res.json().status == "Successful"){
            this.logger.info('register successful')
            return true;
          }
          else {
            this.logger.info('register failed')
            return false;
          }
        })
        .catch(this.handleError)
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
  	private loginExtractData(res: Response): boolean {
  		let body = res.json();
  		if(JSON.parse(body.data).status == "Successful")
  			return true;
  		else
  			return false;
  	}
  	private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
   	 let errMsg: string;
    	if (error instanceof Response) {
      		const body = error.json() || '';
      		const err = body.error || JSON.stringify(body);
      		errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    	} else {
     	 	errMsg = error.message ? error.message : error.toString();
    	}
    	console.error(errMsg);
    	return Observable.throw(errMsg);
  }
}

