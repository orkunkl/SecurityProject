import { Component, OnInit, Input} from '@angular/core';
import { RestService } from '../services/rest.service'
import { Item } from './item'
import { ActivatedRoute } from '@angular/router'
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  item: Item
  productID: number

  constructor(private RestService: RestService, private route: ActivatedRoute, private toastyService: ToastyService) { }

  ngOnInit() {
    this.productID = this.route.snapshot.params['id'];
    this.RestService.retrieveItem(this.productID)
      .subscribe(
        item => { this.item = item },
        err => {
          let toastOptions:ToastOptions = {
                  title: "Error",
                  msg: err,
                  showClose: true,
                  timeout: 5000,
                  theme: 'default',
                };
          this.toastyService.error(toastOptions);
        })
  }

  imageUrl(url: String): string {
  	return this.RestService.imageUrl + "/" + this.item.imagesrc
  }
}
