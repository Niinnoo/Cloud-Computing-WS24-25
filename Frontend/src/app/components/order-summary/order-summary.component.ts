import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { OrderService } from '../../services/order/order.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-summary',
  imports: [MatButtonModule],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent implements OnInit {
  orderId: string = '';

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit() {
    this.createOrder();
  }

  createOrder() {
    const orderData: Order = {
      order: {
        customer_firstname: "Test",
        customer_lastname: "User",
        customer_email: "test@mail.com",
        total_price: 29.99
      },
      order_items: [{
        product_id: 1,
        quantity: 1,
        unit_price: 29.99,
        total_price: 29.99
      }]
    };

    this.orderService.createOrder(orderData).subscribe(
      (response: any) => {
        console.log('Order created successfully', response);
        this.orderId = response.order.id;
      },
      error => {
        console.error('Error creating order', error);
      }
    );
  }

  goToSummary() {
    this.router.navigate(['order-tracking']);
  }
}