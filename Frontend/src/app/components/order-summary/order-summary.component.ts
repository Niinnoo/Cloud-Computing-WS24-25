import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

interface Order {
  order: {
    customer_firstname: string;
    customer_lastname: string;
    customer_email: string;
    total_price: number;
  };
  order_items: {
    product_id: number;
    quantity: number;
    unit_price: number;
    total_price: number;
  }[];
}

@Component({
  selector: 'app-order-summary',
  imports: [MatButtonModule],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})

export class OrderSummaryComponent implements OnInit {
  orderId: string = '123456';

  constructor(private http: HttpClient, private router: Router) {}

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

    this.http.post('http://127.0.0.1:8080/webshop/order', orderData)
      .subscribe(
        (response: any) => {
          console.log('Order created successfully', response);
          this.orderId = response.order.id;
          this.sendEmail();
        },
        error => {
          console.error('Error creating order', error);
        }
      );
  }

  sendEmail() {
    const emailData = {
      subject: 'Test Subject',
      message: 'This is a test message.',
      recipient_list: ['test@mail.com']
    };

    this.http.post('http://127.0.0.1:8080/emailservice/send_email/', emailData)
      .subscribe(response => {
        console.log('Email sent successfully', response);
      }, error => {
        console.error('Error sending email', error);
      });
  }

  goToSummary() {
    this.router.navigate(['order-tracking']);
  }
}
