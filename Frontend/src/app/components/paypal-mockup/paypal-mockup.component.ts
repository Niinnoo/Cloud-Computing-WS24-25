import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paypal-mockup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paypal-mockup.component.html',
  styleUrls: ['./paypal-mockup.component.css']
})
export class PaypalMockupComponent implements OnInit {
  paymentSuccess = false;

  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.paymentSuccess = true;
      setTimeout(() => {
        this.router.navigate(['order-summary']);
      }, 2000); // navigate to order summary after 2 seconds
    }, 2000); // simulate 2 second payment processing
  }
}