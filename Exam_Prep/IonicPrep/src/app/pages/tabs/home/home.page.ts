import { Component, OnInit } from '@angular/core';

import { Subscription } from '../Model/subscriptionModel';
import { FakeSubscriptionDataService } from '../../services/FakeSubscriptionDataService';
import { SubscriptionCartOrganiserService } from '../../services/SubscriptionCartOrganiserService';
import { InfiniteScrollCustomEvent } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  products : Subscription[] | undefined;
  items = [];
  constructor(private fakeDataProvider : FakeSubscriptionDataService, private cartSubscriptionService : SubscriptionCartOrganiserService) {
    this.products = fakeDataProvider.getOfferedSubscriptions();
  }
  ngOnInit() {
    
}

addSubscriptionToCart(product : Subscription) {
  this.cartSubscriptionService.addProdFromCart(product);
}

}
