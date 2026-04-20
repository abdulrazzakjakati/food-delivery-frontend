import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDTO } from '../model/OrderDTO';
import { OrderSerivce } from '../service/order.serivce';

@Component({
  selector: 'app-order-summary',
  standalone: false,
  templateUrl: './order-summary.html',
  styleUrl: './order-summary.css',
})
export class OrderSummary {

  orderSummary: OrderDTO;
  obj: any;
  total: any;
  showDialog: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderSerivce,
    private router: Router,
    private cdr: ChangeDetectorRef // Add this
  ) { }

  ngOnInit() {
    const data = this.route.snapshot.queryParams['data']; 
    this.obj = JSON.parse(data);
    this.obj.userId = 1;
    this.orderSummary = this.obj;

    this.total = this.orderSummary.foodItemsList?.reduce((accumalator, currentValue) => {
        return accumalator + (currentValue.quantity * currentValue.price);
    }, 0);
 
    this.cdr.detectChanges(); // Force change detection
  }

  saveOrder() { 
    console.log('Order Summary to be saved:', this.orderSummary);
    this.orderService.saveOrder(this.orderSummary).subscribe({
      next: (response) => {
        console.log('Order saved successfully', response);
        this.showDialog = true;
        this.cdr.detectChanges(); // Force change detection
      },
      error: (error) => {
        console.error('Error saving order', error);
        this.cdr.detectChanges(); // Force change detection
      }
    });
  }

  closeDialog() {
    this.showDialog = false;
    this.router.navigate(['/']); //replace '/home' with actual route for home page
  } 

}
