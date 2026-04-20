import { FoodItem } from "./FoodItems";
import { Restaurant } from "./Restuarant";

export interface FoodCataloguePage {
    foodItemsList: FoodItem[];
    restaurant: Restaurant;
}
