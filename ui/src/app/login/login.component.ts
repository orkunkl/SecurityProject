import { Component, OnInit } from '@angular/core';
import { registerForm } from '../models/registerForm.interface'
import { loginForm } from '../models/loginForm.interface'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { RestService } from '../services/rest.service'
import { SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { Router } from '@angular/router';
import { ItemlistComponent } from '../itemlist/itemlist.component'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public registerForm: FormGroup;
  public submitted: boolean;
  constructor(private _fb: FormBuilder, private RestService: RestService,  private toastyService:ToastyService,
               private toastyConfig: ToastyConfig, private sessionStorage: SessionStorageService, private router: Router) { }

  ngOnInit() {
  	this.loginForm = this._fb.group({
            username: ['', [<any>Validators.required, <any>Validators.minLength(10)]],
            password: ['', [<any>Validators.required, <any>Validators.minLength(10)]]
        });
  	this.registerForm = this._fb.group({
            username: ['', [<any>Validators.required, <any>Validators.minLength(10)]],
            email: ['', [<any>Validators.required, <any>Validators.minLength(10)]],
            name: ['', [<any>Validators.required, <any>Validators.minLength(10)]],
            surname: ['', [<any>Validators.required, <any>Validators.minLength(10)]],
            password: ['', [<any>Validators.required, <any>Validators.minLength(10)]]
        });
  }
  login(loginForm: loginForm, isValid: boolean) {
    this.RestService.login(loginForm.username, loginForm.password).subscribe(
      data => {
          if(data.json().status == "Successful"){
            console.log('login successful')
            this.sessionStorage.store("token", data.headers.get("Authorization"))
            if(data.json().isAdmin == "true")
                this.sessionStorage.store("user", data.headers.get("Authorization"))
            this.router.navigate(['/']);

            return true;
          }
          else {
            let toastOptions:ToastOptions = {
                title: "Error",
                msg: "Authentication error",
                showClose: true,
                timeout: 5000,
                theme: 'default',
              };
            this.toastyService.error(toastOptions);
            return false;
          }
      },
      err => {
        let toastOptions:ToastOptions = {
                title: "Error",
                msg: err,
                showClose: true,
                timeout: 5000,
                theme: 'default',
              };
        this.toastyService.error(toastOptions);
      });
    }
    register(form: registerForm, isValid: boolean) {
      this.RestService.register(form.username, form.email, form.name, form.surname, form.password).subscribe(
        data => {
          if(data.json().status == "Successful"){
            console.log('register successful')
            this.sessionStorage.store("token", data.headers.get("Authorization"))
            this.sessionStorage.store("user", data.json().user)
            return true;
          }
          else {
            let toastOptions:ToastOptions = {
                title: "Error",
                msg: data.json().status,
                showClose: true,
                timeout: 5000,
                theme: 'default',
              };
            this.toastyService.error(toastOptions);
            return false;
          }
        },
        err => {
        let toastOptions:ToastOptions = {
                title: "Error",
                msg: err,
                showClose: true,
                timeout: 5000,
                theme: 'default',
              };
        this.toastyService.error(toastOptions);
      });
    }
    logout(){
      
    }
 }
