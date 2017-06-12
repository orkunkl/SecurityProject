import { Component, OnInit, Input} from '@angular/core';
import { RestService } from '../services/rest.service'
import { Item } from './item'
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input('item') item: Item

  constructor(private RestService: RestService) { }

  ngOnInit() {
  }

  imageUrl(url: String): string {
  	return this.RestService.imageUrl + "/" + this.item.imagesrc
  }
}
