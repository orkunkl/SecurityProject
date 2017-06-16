import { Item } from '../item/item'

export class tuple {
	public item: Item
	public quantity: number
	constructor(item: Item, quantity: number) {
		this.item = item
		this.quantity = quantity
	}
}