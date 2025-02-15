import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { OrderService } from '../../services/order/order.service';
import { Order } from '../../models/order.model';
import { CustomerData } from '../../models/customer.model';
import { CustomerService } from '../../services/customer/customer.service';
import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../services/shopping-cart/shopping-cart.service';
import { ToolbarComponent } from "../toolbar/toolbar.component";

@Component({
  selector: 'app-order-summary',
  imports: [MatButtonModule, ToolbarComponent],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent implements OnInit {
  orderId: string = '';
  customerData: CustomerData  = {
    title: "",
    firstName: "",
    lastName: "",
    mail: "",
    street: "",
    houseNumber: "",
    postalCode: "",
    city: "",
    country: ""
  };
  cartItems: CartItem[] = [];

  constructor(private orderService: OrderService, private router: Router, private customerService: CustomerService, private cartService: CartService) {}

  ngOnInit() {
    this.customerData = this.customerService.getCustomerData();
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
    this.createOrder();
  }

  createOrder() {
    const orderData : Order = { order: {
      customer_firstname: this.customerData?.firstName,
      customer_lastname: this.customerData.lastName,
      customer_email: this.customerData.mail,
      total_price: this.cartService.getTotalCost()
    },
      order_items : []
    }
    
    this.cartItems.forEach( (element) => { 
      console.log("filling order_items with: ", element)
      orderData.order_items.push({
        product_id : element.id,
        quantity : element.quantity,
        unit_price : element.price,
        total_price: (element.quantity*element.price)
      })
    })    

    console.log("This is the order now: ", orderData)
    this.orderService.createOrder(orderData).subscribe(
      (response: any) => {
        console.log('Order created successfully', response);
        this.orderId = response.order.id;
      },
      error => {
        console.error('Error creating order', error);
      }
    );
    this.cartService.clearCart();
  }

  goToSummary() {
    this.router.navigate(['order-tracking']);
  }
}