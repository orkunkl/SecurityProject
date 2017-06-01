import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { routing } from './app.routes';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http, RequestOptions } from '@angular/http';
import { ToastyModule } from 'ng2-toasty';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RestService } from './services/rest.service';
import { Ng2Webstorage, SessionStorageService } from 'ngx-webstorage';

export function authHttpServiceFactory(http: Http, options: RequestOptions, sessionService: SessionStorageService) {
  return new AuthHttp(
    new AuthConfig({
      tokenName: 'token',
      tokenGetter: (() => sessionService.retrieve('token')),
      globalHeaders: [{'Content-Type':'application/json'}],
  }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    Ng2Webstorage,
    FormsModule,
    HttpModule,
    routing,
    ToastyModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    RestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
