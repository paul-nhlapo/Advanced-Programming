import { Component, OnInit } from '@angular/core';

import { CartSubScription } from '../Model/cartSubscription';
import { Subscription } from '../Model/subscriptionModel';
import { SubscriptionCartOrganiserService } from '../../services/SubscriptionCartOrganiserService';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  subscriptionsInCart : CartSubScription [] = [];
  totalCostOfSubcriptionsInCart :number = 0;
  isModalOpen = false;
  constructor(private cartManager : SubscriptionCartOrganiserService) {
    this.loadSubscriptions();
    cartManager.cartProductsNumberDS.subscribe(num => {
        this.loadSubscriptions();
    });
  }
  
  ngOnInit(): void {
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  loadSubscriptions() {
    this.subscriptionsInCart = this.cartManager.getSubscriptionsInCart();
    this.totalCostOfSubcriptionsInCart = this.cartManager.getTotalCostOfSubcriptionsInCart();
  }

  increaseProdCount (sub : Subscription) {
    for (var idx = 0; idx < this.subscriptionsInCart.length; idx++) {
      if (this.subscriptionsInCart[idx].subscription.id == sub.id) {
        this.cartManager.addProdFromCart(this.subscriptionsInCart[idx].subscription);
      }
    }
  }

  reduceProdCount (sub : Subscription) {
    for (var idx = 0; idx < this.subscriptionsInCart.length; idx++) {
      if (this.subscriptionsInCart[idx].subscription.id == sub.id) {
         this.cartManager.removeProdFromCart(this.subscriptionsInCart[idx].subscription);
      }
    }
  }

}