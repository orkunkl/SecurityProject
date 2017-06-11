import { Component, OnInit } from '@angular/core';
import { Item } from './item'
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  
  item: Item

  constructor() { }

  ngOnInit() {
  }

}
