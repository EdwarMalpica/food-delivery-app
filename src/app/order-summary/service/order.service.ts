import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ORDER } from 'src/app/constants/url';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = ORDER+'/order/saveOrder';

  constructor(private http:HttpClient ) {

  }
  httpOptions = {
    headers: new HttpHeaders( {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    })
  };

  saveOrder(data:any):Observable<any>{
    return this.http.post <any>(this.apiUrl,data,this.httpOptions);
  }

  private handleError(error: any) {
    console.log( 'An error ocurred', error );
    return throwError(() => error.message || error );
  }

}
