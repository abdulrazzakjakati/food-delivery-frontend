import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderSummaryRoutingModule } from './order-summary-routing-module';
import { OrderSummary } from './component/order-summary';


@NgModule({
  declarations: [
    OrderSummary
  ],
  imports: [
    CommonModule,
    OrderSummaryRoutingModule
  ]
})
export class OrderSummaryModule { }
