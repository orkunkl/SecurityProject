import { Component, OnInit, Input} from '@angular/core';
import { RestService } from '../services/rest.service'
import { Item } from './item'
import { ActivatedRoute } from '@angular/router'
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  item: Item
  productID: number

  constructor(private sessionStorage: SessionStorageService, private RestService: RestService, private route: ActivatedRoute, private toastyService: ToastyService) { }

  ngOnInit() {
    this.item = this.sessionStorage.retrieve("item")
    this.sessionStorage.clear("item")

  }

  imageUrl(url: String): string {
  	return this.RestService.imageUrl + "/" + this.item.imagesrc
  }
}
