import { Component, OnInit } from '@angular/core';
import { OrderDTO } from './models/OrderDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from './service/order.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css'],
})
export class OrderSummaryComponent implements OnInit{
  orderSummary?: OrderDTO;
  obj: any;
  total?: any;
  showDialog: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const data = this.route.snapshot.queryParams['data'];
    this.obj = JSON.parse(data);
    this.obj.userId = 1;
    this.obj.orderSummary = this.obj;
    this.total = this.calculateTotal(this.obj.foodItemList);
  }

  calculateTotal(foodItemList: any) {
    let total = 0;
    for (const element of foodItemList) {
     total +=  (element.price * element.quantity);
    }
    return total;
  }

  saveOrder() {
    this.orderService.saveOrder(this.orderSummary).subscribe(
      {
        next: (response) =>{this.showDialog = true;},
        error: (error) => console.log("Failed to save data:", error),
        complete: () => {this.showDialog = false;}
      }
    );
  }
  closeDialog(){
    this.showDialog = false;
    this.router.navigate(['/']);
  }
}
