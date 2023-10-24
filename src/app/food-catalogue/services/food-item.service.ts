import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { API_URL_FC } from 'src/app/constants/url';

@Injectable({
  providedIn: 'root'
})
export class FoodItemService {
  private apiUrl = API_URL_FC+'/fetchRestaurantAndFoodItemsById';

  constructor(private http:HttpClient) { }

  getFoodItemsByRestaurantId(id:number):Observable<any>{
    if(!id){
      return this.http
        .get<any>(this.apiUrl + '/' + 1)
        .pipe(catchError(this.handleError));
    }else{
      return this.http
        .get<any>(this.apiUrl + '/' + id)
        .pipe(catchError(this.handleError));
    }

  }

  private handleError(error: any) {
    console.log(error);
    return throwError(() => error.message || error );
  }
}
