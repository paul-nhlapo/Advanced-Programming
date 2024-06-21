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
  subscriptionsInCart: CartSubScription[] = []; // Array to store subscriptions in the cart
  totalCostOfSubcriptionsInCart: number = 0; // Total cost of subscriptions in the cart
  isModalOpen = false; // Flag to indicate if the modal is open or not

  constructor(private cartManager: SubscriptionCartOrganiserService) {
    this.loadSubscriptions(); // Load subscriptions when the component is initialized

    // Subscribe to changes in the cart products number and reload subscriptions when it changes
    cartManager.cartProductsNumberDS.subscribe(num => {
      this.loadSubscriptions();
    });
  }

  ngOnInit(): void {
    // Initialization logic goes here
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen; // Set the flag to indicate if the modal is open or not
  }

  loadSubscriptions() {
    this.subscriptionsInCart = this.cartManager.getSubscriptionsInCart(); // Load subscriptions from the cart
    this.totalCostOfSubcriptionsInCart = this.cartManager.getTotalCostOfSubcriptionsInCart(); // Calculate the total cost of subscriptions in the cart
  }

  increaseProdCount(sub: Subscription) {
    for (var idx = 0; idx < this.subscriptionsInCart.length; idx++) {
      if (this.subscriptionsInCart[idx].subscription.id == sub.id) {
        this.cartManager.addProdFromCart(this.subscriptionsInCart[idx].subscription); // Increase the count of the selected subscription in the cart
      }
    }
  }

  reduceProdCount(sub: Subscription) {
    for (var idx = 0; idx < this.subscriptionsInCart.length; idx++) {
      if (this.subscriptionsInCart[idx].subscription.id == sub.id) {
        this.cartManager.removeProdFromCart(this.subscriptionsInCart[idx].subscription); // Decrease the count of the selected subscription in the cart
      }
    }
  }
}
