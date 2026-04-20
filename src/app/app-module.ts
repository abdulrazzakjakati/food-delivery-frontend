import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app'; 
import { HeaderModule } from './header/header-module';
import { RestaurantListingModule } from './restaurant-listing/restaurant-listing-module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; 
import { FoodCatalogueModule } from './food-catalogue/food-catalogue-module';
import { OrderSummaryModule } from './order-summary/order-summary-module';


@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    RestaurantListingModule,
    FoodCatalogueModule,
    OrderSummaryModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [App]
})
export class AppModule { }
