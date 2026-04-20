import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // Add ChangeDetectorRef
import { ActivatedRoute, Router } from '@angular/router';
import { FoodItemService } from '../service/fooditem.service';
import { FoodCataloguePage } from '../../shared/model/FoodCataloguePage';
import { FoodItem } from '../../shared/model/FoodItems';

@Component({
  selector: 'app-food-catalogue',
  standalone: false,
  templateUrl: './food-catalogue.html',
  styleUrl: './food-catalogue.css',
})
export class FoodCatalogue implements OnInit {
  restaurantId: number = 0;
  foodItemResponse: FoodCataloguePage;
  foodItemCart: FoodItem[] = [];
  orderSummary: FoodCataloguePage;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private foodItemSerivce: FoodItemService,
    private router: Router,
    private cdr: ChangeDetectorRef // Add this
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.restaurantId = +params['id'];
      this.getFoodItemsByRestaurant(this.restaurantId);
    });
  }

  getFoodItemsByRestaurant(restaurantId: number): void {
    this.isLoading = true;
    this.foodItemSerivce.getFoodItemsByRestaurant(restaurantId).subscribe({
      next: (data) => {
        this.foodItemResponse = data;
        this.isLoading = false;
        console.log('Food items retrieved:', data);
        this.cdr.detectChanges(); // Force change detection
      },
      error: (error) => {
        console.error('Error fetching food items:', error);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
  incrementQuantity(food: any) {
    food.quantity++;
    // get index of food item in cart
    const index = this.foodItemCart.findIndex(item => item.id === food.id);
    if (index === -1) {
      // If record does not exist, add it to the array
      this.foodItemCart.push(food);
    } else {
      // If record exists, update it in the array
      this.foodItemCart[index] = food;
    }
  }
  
  decrementQuantity(food: any) {
    if (food.quantity > 0) {
      food.quantity--;

      const index = this.foodItemCart.findIndex(item => item.id === food.id);
      if (food.quantity === 0 && index !== -1) {
        // If quantity is 0, remove it from the array
        this.foodItemCart.splice(index, 1);
      } else if (index !== -1) {
        // If record exists, update it in the array
        this.foodItemCart[index] = food;
      }

    }
  }


  onCheckOut() {
    this.foodItemCart;
    this.orderSummary = {
      foodItemsList: this.foodItemCart,
      restaurant: this.foodItemResponse.restaurant
    }
    this.router.navigate(['/order-summary'], { queryParams: { data: JSON.stringify(this.orderSummary) } });
  }
}
