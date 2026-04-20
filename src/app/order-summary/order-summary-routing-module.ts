import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';  
import { OrderSummary } from './component/order-summary';

const routes: Routes = [
  {path: 'order-summary', component: OrderSummary}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderSummaryRoutingModule { }
