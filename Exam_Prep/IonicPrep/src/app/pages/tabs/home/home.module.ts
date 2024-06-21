import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { FakeSubscriptionDataService } from '../../services/FakeSubscriptionDataService';
import { SubscriptionCartOrganiserService } from '../../services/SubscriptionCartOrganiserService';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  providers: [FakeSubscriptionDataService, SubscriptionCartOrganiserService],
  declarations: [HomePage]
})
export class HomePageModule {}
