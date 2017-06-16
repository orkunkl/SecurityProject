import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router';
import { CartService } from '../cart/cart.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private CartService: CartService, private auth: AuthService, private router: Router) {}

  ngOnInit() {}
  
  logout(){
      console.log("logging out");
      this.auth.logout();
      this.router.navigate(['']);
  }
}
