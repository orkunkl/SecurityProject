import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminloginComponent } from './adminlogin/adminlogin.component';

const aboutRoutes: Routes = [
   { path: '', redirectTo:'login', pathMatch:'full'},
   { path: 'login', component: AdminloginComponent }
];

export const aboutRouting: ModuleWithProviders = RouterModule.forChild(aboutRoutes);