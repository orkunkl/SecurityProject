import { Component, OnInit } from '@angular/core';
import { registerForm } from '../models/registerForm.interface'
import { loginForm } from '../models/loginForm.interface'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { RestService } from '../services/rest.service'
import { Logger } from "angular2-logger/core"; // ADD THIS
import { SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public registerForm: FormGroup;
  public submitted: boolean;
  constructor(private logger: Logger, private _fb: FormBuilder, private RestService: RestService,  private toastyService:ToastyService,
               private toastyConfig: ToastyConfig, private sessionStorage: SessionStorageService) { }

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
            this.logger.info('login successful')
            this.sessionStorage.store("token", data.headers.get("Authorization"))
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
 }
/*if(data.json().status == "Successful"){
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
            return false;
          }*/