import { Component, OnInit } from '@angular/core';
import { registerForm } from '../models/registerForm.interface'
import { loginForm } from '../models/loginForm.interface'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { RestService } from '../services/rest.service'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/subscribe';
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
  constructor(private _fb: FormBuilder, private RestService: RestService,  private toastyService:ToastyService, private toastyConfig: ToastyConfig) { }

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
    this.RestService.login(loginForm.username, loginForm.password)
      .subscribe(
        data => {
          if(data == true){
              
          }
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
          }
        },
        error => {
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
        }
      );
  }
}
