import { Component, OnInit, Input} from '@angular/core';
import { RestService } from '../services/rest.service'
import { Item } from './item'
import { ActivatedRoute } from '@angular/router'
import { ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import { SessionStorageService } from 'ngx-webstorage';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CartService } from '../cart/cart.service'
import { AddItemForm } from './AddItemForm'
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  item: Item
  productID: number
  newform: FormGroup

  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder, private CartService: CartService, private sessionStorage: SessionStorageService, private RestService: RestService, 
              private route: ActivatedRoute, private toastyService: ToastyService) { }
  ngOnInit() {
    this.item = this.sessionStorage.retrieve("item")
    this.sessionStorage.clear("item")
    this.newform = this.fb.group({
      quantity: ["", Validators.required]
    })

  }

  imageUrl(): string {
  	return this.RestService.imageUrl + "/" + this.item.imagesrc
  }

  public submit(model: any, event: Event){
    event.preventDefault();

    if(!this.authService.loggedIn()){
        let toastOptions:ToastOptions = {
                title: "You have to be logged in for adding item to cart",
                showClose: true,
                timeout: 5000,
                theme: 'default',
              };
       this.toastyService.error(toastOptions);
       this.router.navigate(['/login']);
    }
    else {
      this.CartService.addItemToCart(this.item, this.newform.value.quantity)
      let toastOptions:ToastOptions = {
                  title: "Item added to cart",
                  showClose: true,
                  timeout: 5000,
                  theme: 'default',
                };
       this.toastyService.info(toastOptions);
    }
  }

}  
