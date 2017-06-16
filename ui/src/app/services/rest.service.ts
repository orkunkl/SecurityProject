import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import 'rxjs/add/operator/catch';
import { Item } from '../item/item'
import { SessionStorageService } from 'ngx-webstorage'

@Injectable()
export class RestService {
	
	private token: string;
	private baseUrl = "https://localhost:9443";
	private loginUrl = this.baseUrl + "/login";
  private registerUrl = this.baseUrl + "/register";
  private logoutUrl = this.baseUrl + "/logout";
  private itemUrl = this.baseUrl + "/item";
  private itemsUrl = this.baseUrl + "/items";
  private adminLoginUrl = this.baseUrl + "/admin/login";
  public imageUrl = this.baseUrl + "/assets" + "/images";
  private tokenUrl = this.baseUrl + "/token";

  private options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) }); 

  constructor(private sessionStorage: SessionStorageService, private http: Http, private toasty: ToastyService) { }
  
  login(username: string, password: string): Observable<Response> {
  	return this.http.post(this.loginUrl, JSON.stringify({ username: username, password: password }), this.options).map(res => res);
  }
  adminLogin(username: string, password: string): Observable<Response> {
    return this.http.post(this.adminLoginUrl, JSON.stringify({ username: username, password: password }), this.options).map(res => res);
  }
  register(username: string, email: string, name: string, surname: string, password: string): Observable<Response> {
    let data = JSON.stringify({username: username, email: email, name: name, surname: surname, password: password});
    return this.http.post(this.registerUrl, data, this.options).map(res => res);
  }
  logout(){
    this.http.get(this.logoutUrl).map(res => res);
  }
  retrieveItem(id: number): Observable<Item>{
    return this.http.get(this.itemUrl + "/" + id)
      .map(res => {
        if(res.status == 400)
          return {};
        else return res.json();
      });
  }
  retrieveStripeToken(): Observable<string>{
    console.log("retrieveStripeToken")
    console.log(this.sessionStorage.retrieve("token"))
    let header = new RequestOptions({ headers: new Headers({ 'Authorization': this.sessionStorage.retrieve("token")}) }); 
    return this.http.post(this.tokenUrl, JSON.stringify({ Authorization : this.sessionStorage.retrieve("token")}), header)
      .map(res => {console.log(res); return res.json().token})
  }
  retrieveItems(page: number): Observable<Item[]> {
    return this.http.get(this.itemsUrl + '/' + page)
      .map(res => {
        if(res.status != 200)
          return [];
        else {
          return res.json().items;
        }
        });
  }
}