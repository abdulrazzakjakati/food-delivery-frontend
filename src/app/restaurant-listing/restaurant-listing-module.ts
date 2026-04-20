import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantListingRoutingModule } from './restaurant-listing-routing-module';
import { RestaurantListing } from './components/restaurant-listing';


@NgModule({
  declarations: [
    RestaurantListing
  ],
  imports: [
    CommonModule,
    RestaurantListingRoutingModule
  ]
})
export class RestaurantListingModule { }
