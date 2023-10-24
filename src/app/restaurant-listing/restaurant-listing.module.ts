import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantListingRoutingModule } from './restaurant-listing-routing.module';
import { RestaurantListingComponent } from './components/restaurant-listing.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [RestaurantListingComponent],
  imports: [CommonModule, RestaurantListingRoutingModule, HttpClientModule],
  exports: [RestaurantListingComponent],
})
export class RestaurantListingModule {}
