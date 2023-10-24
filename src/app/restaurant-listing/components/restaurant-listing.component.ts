import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/shared/models/Restaurant';
import { RestaurantListingService } from '../services/restaurant-listing.service';

@Component({
  selector: 'app-restaurant-listing',
  templateUrl: './restaurant-listing.component.html',
  styleUrls: ['./restaurant-listing.component.css']
})
export class RestaurantListingComponent {

  public restaunrantList : Restaurant[];
  public randomImageURL: string[] = [];
  constructor(private router:Router, private restaurantService:RestaurantListingService) {
    this.getAllRestaurants();
  }



  getAllRestaurants() {
    this.restaurantService.getAllRestaurants().subscribe(
      data => {
        this.restaunrantList = data;
        this.restaunrantList.forEach((restaurant) => {
          this.randomImageURL.push('./assets/restaurant-pics/' + this.getRandomeImage());
        });
      }
    );
  }

  getRamdomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);

  }

  getRandomeImage() {
    const imageCount = 8;
    const randomIndex = this.getRamdomNumber(1, imageCount);
    return randomIndex+'.jpg';
  }

  onButtonClick(id: number) {
    this.router.navigate(['food-catalogue', id]);
  } 
  ngOnInit() {

  }
}


