import { Component, OnInit } from '@angular/core';
import { FoodCataloguePage } from '../shared/models/FoodCataloguePage';
import { FoodItem } from '../shared/models/FoodItem';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodItemService } from './services/food-item.service';
import { FoodOrderPage } from '../shared/models/FoodOrderPage';

@Component({
  selector: 'app-food-catalogue',
  templateUrl: './food-catalogue.component.html',
  styleUrls: ['./food-catalogue.component.css'],
})
export class FoodCatalogueComponent implements OnInit{
  restaurantId: number;
  foodItemResponse: FoodCataloguePage;
  foodItemCart: FoodItem[] = [];
  orderSummary: FoodCataloguePage;
  order: FoodOrderPage;

  constructor(
    private route: ActivatedRoute,
    private foodItemService: FoodItemService,
    private router: Router
  ) {

  }

  ngOnInit() {
      this.route.paramMap.subscribe(params => {
        let id = params.get('id');
        if (id) {
          this.restaurantId = +id;
          this.getFoodItemsByRestaurant(this.restaurantId);
        }
      });

  }

  getFoodItemsByRestaurant(restaurant:number){
    this.foodItemService.getFoodItemsByRestaurantId(restaurant).subscribe(
      data => {
        if (data) {
          this.foodItemResponse = data;
        }
      }
    )
  }

  increment(food:any){
    food.quantity++;
    const index = this.foodItemCart.findIndex((item) => item.id === food.id);
    if(index === -1){
      this.foodItemCart.push(food);
    }else{
      this.foodItemCart[index] = food;
    }
  }

  decrement(food:any){
    if(food.quantity > 0){
      food.quantity--;
      const index = this.foodItemCart.findIndex((item) => item.id === food.id);
      if(this.foodItemCart[index].quantity == 0){
        this.foodItemCart.splice(index,1);
      }else{
        this.foodItemCart[index] = food;
      }
    }
  }

  onCheckout(){

    this.order = {
      foodItemDTOList: this.foodItemCart,
      restaurantId: this.foodItemResponse.restaurant.id
        ? this.foodItemResponse.restaurant.id
        : 0,
    };
    this.router.navigate(['/order-summary'], {
      queryParams: { data: JSON.stringify(this.order) },
    });
  }
}
