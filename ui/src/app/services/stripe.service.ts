import { Injectable } from '@angular/core';
import { RestService } from './rest.service'

@Injectable()
export class StripeService {
  private token: string

  constructor(private restService: RestService) {
    this.restService.retrieveStripeToken()
      .subscribe(token => {console.log(token); this.token = token})
     console.log(this.token)
  }

  openCheckout(amount: number) {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_M2pj1Cx4GKswrAzjoCXLxnPW',
      locale: 'auto',
      token: function (token: any) {
        return this.token
      }
    });

    handler.open({
      name: 'Payment',
      description: '',
      amount: amount
    });

  }
}
