import { FoodItem } from './FoodItem';

export interface FoodOrderPage {
  foodItemDTOList: FoodItem[];
  restaurantId: number;
}
