import { Component, OnInit } from '@angular/core';
import { Item } from '../item/item'

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css']
})
export class ItemlistComponent implements OnInit {
  
  itemlist: Item[];

  constructor() { }

  ngOnInit() {
  }

}
