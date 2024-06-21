import { Injectable } from '@angular/core';


export interface MenuItem {
  image: any;
  name: string;
  id: number;
  description: string;
  price: number;
}

export interface CartItem {
  menu: MenuItem;
  orderAddress: string;
  orderDate: Date;
  quantity: number;
  hasDelivery: boolean;
  deliveryPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  itemCount = 0;

  constructor() { }

  getCartItemCount(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getAddress(): string {
    let address = 'Units on Park 3325';
    return address;
  }

  getAllItems(): CartItem[] {
    return this.cartItems;
  }

  calculateTotalCost(): number {
    let totalCost = 0;
    for (const item of this.getAllItems()) {
      totalCost += item.menu.price * item.quantity;
    }
    return totalCost;
  }

  calculateDeliveryCost(): number {
    let deliveryCost = 0;
    for (const item of this.getAllItems()) {
      deliveryCost += item.menu.price * item.quantity + 35;
    }
    return deliveryCost;
  }

  addItemToCart(item: CartItem): void {
    const existingItem = this.getItemById(item);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push(item);
    }
    this.itemCount++;
  }

  getItemById(item: CartItem) {
    return this.cartItems.find(x => x.menu.id === item.menu.id);
  }

  removeItem(item: CartItem): void {
    const index = this.cartItems.findIndex(x => x.menu.id === item.menu.id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.itemCount -= 1;
    }
  }

  updateCartItems(items: CartItem[]): void {
    localStorage.setItem('cart', JSON.stringify(items));
    this.cartItems = items;
  }

  clearCart(): void {
    this.updateCartItems([]);
  }


}
