import { Component, OnInit } from '@angular/core';
import { OrderDTO } from './models/OrderDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from './service/order.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css'],
})
export class OrderSummaryComponent implements OnInit {
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
    console.log(this.obj);
    this.obj.userId = 1;
    this.total = this.calculateTotal(this.obj.foodItemDTOList);
  }

  calculateTotal(foodItemDTOList: any) {
    let total = 0;
    for (const element of foodItemDTOList) {
      total += element.price * element.quantity;
    }
    return total;
  }

  saveOrder() {
    let data = {
      userId: this.obj.userId,
      restaurantId: this.obj.restaurantId,
      foodItemDTOList: this.obj.foodItemDTOList,
    };

    this.orderService.saveOrder(data).subscribe({
      next: (response) => {
        console.log('Response received:', response);
        this.showDialog = true;
      },
      error: (error) => console.log('Failed to save data:', error),
      complete: () => {
        //this.showDialog = false;
      },
    });
  }
  closeDialog() {
    this.showDialog = false;
    this.router.navigate(['/']);
  }
}
