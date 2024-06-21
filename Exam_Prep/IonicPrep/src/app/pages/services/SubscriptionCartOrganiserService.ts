import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Subscription } from "../tabs/Model/subscriptionModel";
import { CartSubScription } from "../tabs/Model/cartSubscription";


@Injectable({
    providedIn: 'root'
})
export class SubscriptionCartOrganiserService {
    static tmpSubscriptionsCartName : string = "ls-cart-subscriptions";
    cartProductsNumberDS = new Subject<number>();
    cartItemsOrderName : string = "Subs Order @ ";

    notifyOnNewItemInCart() {
        this.cartProductsNumberDS.next(this.getNumberOfItemsInCart());
    }

    getLocalStorageSubscriptions(): Subscription[] {
        let storedSubString = localStorage.getItem(SubscriptionCartOrganiserService.tmpSubscriptionsCartName)
        let cartSubscriptions = [];
        if (storedSubString) {
          cartSubscriptions = JSON.parse(storedSubString)
        }
        return cartSubscriptions;
    }
    getNumberOfItemsInCart() : number {
        return this.getLocalStorageSubscriptions().length
    }

    getSubscriptionsInCart() : CartSubScription[] {
        let localStorageSubs = this.getLocalStorageSubscriptions();
        let cartSubscriptions : CartSubScription[] = [];

        let subCounts = new Map<Number, Number>(); //temporary storage
        localStorageSubs.forEach(sub => {
            if (!subCounts.has(sub.id)) {
                let count = localStorageSubs.filter(currSub => currSub.id == sub.id).length;
                subCounts.set(sub.id, count)
                let cartSub = new CartSubScription(sub, count);
                cartSubscriptions.push(cartSub);
            }
        });
        return cartSubscriptions;
    }

    getTotalCostOfSubcriptionsInCart() : number {
        let totalCost = 0;
        
        let cartSubs = this.getSubscriptionsInCart();
        cartSubs.forEach(cartSub => {
            totalCost += (cartSub.subscription.price * cartSub.quantity);
        });

        return totalCost;
    }

    getCartOrderName() {
        return this.cartItemsOrderName + Date.now();
    }

    addSubscriptionToCart(product : Subscription) {
        let storedSubString = localStorage.getItem(SubscriptionCartOrganiserService.tmpSubscriptionsCartName)
    
        let cartSubscriptions = [];
        if (storedSubString) {
          cartSubscriptions = JSON.parse(storedSubString)
        }
        cartSubscriptions.push(product);
        localStorage.setItem(SubscriptionCartOrganiserService.tmpSubscriptionsCartName, JSON.stringify(cartSubscriptions))
    
        this.notifyOnNewItemInCart();
      }
    

    removeProdFromCart(subscr : Subscription) {
        let storedSubString = localStorage.getItem(SubscriptionCartOrganiserService.tmpSubscriptionsCartName)
    
        let cartSubscriptions = [];
        if (storedSubString) {
          cartSubscriptions = JSON.parse(storedSubString)
        }
        for (var idx = 0; idx < cartSubscriptions.length; idx++) {
            if (cartSubscriptions[idx].id == subscr.id) {
                cartSubscriptions.splice(idx, 1);
                break;
            }
        }

        localStorage.setItem(SubscriptionCartOrganiserService.tmpSubscriptionsCartName, JSON.stringify(cartSubscriptions))

        this.notifyOnNewItemInCart();
    }

    addProdFromCart(subscr : Subscription) {
        this.addSubscriptionToCart(subscr);
        this.notifyOnNewItemInCart();   
    }

    clearCart () {
        localStorage.removeItem(SubscriptionCartOrganiserService.tmpSubscriptionsCartName);
        this.notifyOnNewItemInCart();
    }
}