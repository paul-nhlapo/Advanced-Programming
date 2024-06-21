import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ReportingComponent } from './reporting/reporting.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'product-listing', component: ProductListingComponent, canActivate: [AuthGuard] },
  { path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard]},
  { path: 'reporting', component: ReportingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
