import { Component, OnInit, NgZone} from '@angular/core';
import { Item } from '../item/item'
import { ItemComponent } from '../item/item.component'
import { RestService } from '../services/rest.service'
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css']
})
export class ItemlistComponent implements OnInit {
  
  itemlist: Item[];
  page: number;
  constructor(private RestService: RestService, private toastyService: ToastyService, private toastyConfig: ToastyConfig, private zone: NgZone) { }

  ngOnInit() {
  	this.page = 1;
  	this.RestService.retrieveItems(this.page)
  	  .subscribe(
  	  	items => { this.itemlist = items },
  	  	err => {
        let toastOptions:ToastOptions = {
                title: "Error",
                msg: err,
                showClose: true,
                timeout: 5000,
                theme: 'default',
              };
        this.toastyService.error(toastOptions);
      	});
  }
  imageUrl(item: Item, url: String): string {
    return this.RestService.imageUrl + "/" + item.imagesrc
  }

}
