// import { Component, OnInit } from '@angular/core';
// import { CartService } from './services/cart.service';

// @Component({
//   selector: 'app-tabs',
//   templateUrl: './tabs.page.html',
//   styleUrls: ['./tabs.page.scss'],
// })
// export class TabsPage implements OnInit {
//   cartItemCount: number = 0;

//   constructor(private cartService: CartService) { }

//   ngOnInit() {
//     // Initialize the cart item count
//     this.updateCartItemCount();
//   }

//   ionViewWillEnter() {
//     // Call updateCartItemCount when the view is about to enter to update the cart item count
//     this.updateCartItemCount();
//   }

//   private updateCartItemCount() {
//     // Get the total count of items in the cart
//     this.cartItemCount = this.cartService.getCartItemCount();
//   }
// }
import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  cartItemCount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCartItemCount().subscribe(count => {
      this.cartItemCount = count;
    });
  }
}