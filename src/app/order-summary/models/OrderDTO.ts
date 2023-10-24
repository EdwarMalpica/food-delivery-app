import { FoodItem } from "src/app/shared/models/FoodItem";

export interface OrderDTO {
  foodItemDTOList?: FoodItem[];
  userId?: number;
  retaurantId?: number;
}
