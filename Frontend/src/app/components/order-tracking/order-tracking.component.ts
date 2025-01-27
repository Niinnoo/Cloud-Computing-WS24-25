import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface OrderResponse {
  order: {
    id: string;
    customer_firstname: string;
    customer_lastname: string;
    customer_email: string;
    status: string;
    total_price: number;
    order_date: string;
  };
  order_items: Array<{
    product_id: number;
    quantity: number;
    unit_price: number;
    total_price: number;
  }>;
}

@Component({
  selector: 'app-order-tracking',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule, 
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './order-tracking.component.html',
  styleUrl: './order-tracking.component.css'
})
export class OrderTrackingComponent {
  orderId: string = '';
  orderData: OrderResponse | null = null;
  showSearch: boolean = true;
  trackingError: boolean = false;

  constructor(private router: Router, private http: HttpClient) {}

  trackOrder() {
    if (!this.orderId) return;
    this.trackingError = false;
    
    this.http.get<OrderResponse>(`http://127.0.0.1:8080/webshop/order/${this.orderId}`)
      .subscribe({
        next: (response) => {
          this.orderData = response;
          this.showSearch = false;
          this.trackingError = false;
        },
        error: (error) => {
          console.error('Error fetching order:', error);
          this.trackingError = true;
        }
      });
  }

  onInputChange() {
    this.trackingError = false;
  }
}