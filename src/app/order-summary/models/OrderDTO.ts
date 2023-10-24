import { FoodItem } from "src/app/shared/models/FoodItem";

export interface OrderDTO {
  foodItemsList?: FoodItem[];
  userId?: number;
  retaurantId?: number;
}
