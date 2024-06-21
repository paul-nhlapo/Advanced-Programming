import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { HttpClientModule } from '@angular/common/http';
import { AddProductComponent } from './add-product/add-product.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReportingComponent } from './reporting/reporting.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductListingComponent,
    AddProductComponent,
    RegisterComponent,
    LoginComponent,
    ReportingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
