import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service'
import { Cart } from './cart'
import { StripeService } from '../services/stripe.service'
import { tuple } from './tuple'
import { Item } from '../item/item'

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
      console.log(items[i])
   		sum += items[i].item.price * items[i].quantity
	  } 
	  this.totalPrice = sum
    console.log(sum)
  }
  openCheckout(){
  	this.StripeService.openCheckout(this.totalPrice*100)
  }
}
