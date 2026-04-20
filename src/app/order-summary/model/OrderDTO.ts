import { FoodItem } from "../../shared/model/FoodItems";
import { Restaurant } from "../../shared/model/Restuarant";

export interface OrderDTO {
    userId?: number;
    foodItemsList?: FoodItem[];
    restaurant: Restaurant;
}