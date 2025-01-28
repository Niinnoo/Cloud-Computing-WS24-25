import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../services/order/order.service';
import { ProductService } from '../../services/product/product.service';
import { OrderResponse } from '../../models/order.model';

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
  productDetails: any[] = [];

  constructor(private orderService: OrderService, private productService: ProductService) {}

  trackOrder() {
    if (!this.orderId) return;
    this.trackingError = false;
    
    this.orderService.getOrder(this.orderId).subscribe({
      next: (response) => {
        this.orderData = response;
        this.showSearch = false;
        this.trackingError = false;
      
        this.productDetails = [];
        const orderItems = response.order_items;
        orderItems.forEach((item: any) => {
          this.productService.getProductById(item.product_id).subscribe({
            next: (product) => {
              this.productDetails.push(product);
            },
            error: (error) => {
              console.error('Error fetching product details:', error);
            }
          });
        });
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