import { Injectable } from '@angular/core';
import { Cart } from './cart'
import { Item } from '../item/item'

@Injectable()
export class CartService {
  cart: Cart
  constructor() { 
  	this.cart = new Cart()
  }
  addItemToCart(item: Item, quantity: number){
  	this.cart.items.push([item, quantity])
  }
}
 