import { Item } from '../item/item'
export class Cart {
	items: Array<[Item, number]> //number for quantity
	constructor(){
		this.items = []
	}
}