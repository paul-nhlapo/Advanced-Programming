import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children:[
      // Child route for 'home' page
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      // Child route for 'cart' page
      {
        path: 'cart',
        loadChildren: () => import('./cart/cart.module').then(m => m.CartPageModule)
      }
    ]
  },
  // Default route redirects to 'tabs/home'
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
