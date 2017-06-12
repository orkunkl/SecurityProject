import { Component, OnInit } from '@angular/core';
import { Item } from '../item/item'
import { RestService } from '../services/rest.service'
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css']
})
export class ItemlistComponent implements OnInit {
  
  itemlist: Array<Item>;
  page: number;
  constructor(private RestService: RestService, private toastyService: ToastyService, private toastyConfig: ToastyConfig) { }

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

}
