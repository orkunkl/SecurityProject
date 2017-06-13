import { Injectable } from '@angular/core';

@Injectable()
export class StripeService {

  constructor() { }

  openCheckout(amount: number) {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_M2pj1Cx4GKswrAzjoCXLxnPW',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
      }
    });

    handler.open({
      name: 'Payment',
      description: '',
      amount: amount
    });

  }
}
