
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

// Route Configuration
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
];


export const routing: ModuleWithProviders = RouterModule.forRoot(routes);