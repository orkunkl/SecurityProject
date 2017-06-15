import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service'
import { Cart } from './cart'
import { StripeService } from '../services/stripe.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart
  totalPrice: number
  constructor(private StripeService: StripeService, private CartService: CartService) { }

  ngOnInit() {
  	this.cart = this.CartService.cart
  	console.log(this.cart)
  	var sum = 0;
  	var items = this.cart.items
  	for(var i = 0; i < items.length ;i++) { 
   		sum += items[i][0].price * items[i][1]
	} 
	this.totalPrice = sum
  }
  openCheckout(){
  	this.StripeService.openCheckout(this.totalPrice*100)
  }
}
