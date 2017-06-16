import { Item } from '../item/item'
import { tuple } from './tuple'

export class Cart {
	public items: Array<tuple> //number for quantity
	public constructor(){
		this.items = new Array<tuple>()
	}
}