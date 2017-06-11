import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { RestService } from '../services/rest.service'
import { loginForm } from '../models/loginForm.interface'
import { SessionStorageService } from 'ngx-webstorage';
import { ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css'],
  
})
export class AdminpanelComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private _fb: FormBuilder, private RestService: RestService,  private toastyService:ToastyService, private sessionStorage: SessionStorageService, private router: Router) { }

  ngOnInit() {
	this.loginForm = this._fb.group({
        username: ['', [<any>Validators.required, <any>Validators.minLength(10)]],
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
                this.sessionStorage.store("user", data.json().user)
            else{
              let toastOptions:ToastOptions = {
                title: "Error",
                msg: "User is not an admin",
                showClose: true,
                timeout: 5000,
                theme: 'default',
              };
            this.toastyService.error(toastOptions);
            }

            this.router.navigate(['/']);

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
}
