import { Component, OnInit, signal } from '@angular/core';
import { Restaurant } from '../../shared/model/Restuarant';
import { Router } from '@angular/router';
import { RestaurantService } from '../service/restuarant.service';

@Component({
  selector: 'app-restaurant-listing',
  standalone: false,
  templateUrl: './restaurant-listing.html',
  styleUrl: './restaurant-listing.css',
})
export class RestaurantListing implements OnInit {
  // ✅ Signal (not regular array)
  restaurants = signal<Restaurant[]>([]);

  constructor(
    private router: Router,
    private restaurantService: RestaurantService,
  ) {}

  ngOnInit() {
    this.getAllRestaurants();
  }

  getAllRestaurants() {
    this.restaurantService.getAllRestaurants().subscribe({
      next: (data) => this.restaurants.set(data),
      error: () => this.restaurants.set([]), // Show empty state on error
    });
  }
  getRandomeNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomImage(): string {
    const imageCount = 8; // Assuming there are 10 images named 1.jpg to 10.jpg
    const randomNum = this.getRandomeNumber(1, imageCount);
    return `${randomNum}.jpg`;
  }

  onButtonClick(id: number) {
    this.router.navigate(['/food-catalogue', id]);
  }
}
