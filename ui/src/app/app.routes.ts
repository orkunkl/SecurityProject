
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ItemlistComponent } from './itemlist/itemlist.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { ItemComponent } from './item/item.component'
import { CartComponent } from './cart/cart.component';
import { AuthGuardService } from './services/auth-guard.service'

// Route Configuration
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: ItemlistComponent },
  { path: 'admin', component: AdminpanelComponent },
  { path: 'item', component: ItemComponent },
  { path: 'cart', component: CartComponent, pathMatch: 'full', canActivate: [AuthGuardService]}
];


export const routing: ModuleWithProviders = RouterModule.forRoot(routes);