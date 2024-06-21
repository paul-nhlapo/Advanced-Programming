import { Subscription } from "./subscriptionModel";

export class CartSubScription {
    subscription : Subscription;
    quantity : number = 1;
    totalCost : number = 0;

    constructor(subscr : Subscription, quant: number) {
        this.subscription = subscr;
        this.quantity = quant;
        this.totalCost = quant * subscr.price;
    }

    increment() {
        this.quantity +=1
    }
}