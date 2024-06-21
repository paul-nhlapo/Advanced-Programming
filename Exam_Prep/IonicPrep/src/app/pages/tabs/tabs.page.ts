import { Component, OnInit } from '@angular/core';
import { SubscriptionCartOrganiserService } from '../services/SubscriptionCartOrganiserService';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  numCartItems : number = 0;
  constructor(private cartManager : SubscriptionCartOrganiserService) {
    this.numCartItems = cartManager.getNumberOfItemsInCart();
    
    cartManager.cartProductsNumberDS.subscribe(num => {
      this.numCartItems = num;
    });
   }

  ngOnInit() {
  }

}
