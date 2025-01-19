import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        MatInputModule,
        MatButtonModule
      ],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  title: string = '';
  firstName: string = '';
  lastName: string = '';
  mail: string = '';
  billingAddress: string = '';
  street: string = '';
  houseNumber: string = '';
  addressAddition: string = '';
  postalCode: string = '';
  city: string = '';

  constructor(private router: Router) {}

  goBackToHome() {
    this.router.navigate(['']);
  }

  onSubmit() {
    if (this.title && this.firstName && this.lastName && this.mail && this.billingAddress && this.street && this.houseNumber && this.postalCode && this.city) {
      console.log('Form submitted');
    }
    this.router.navigate(['payment/processing']);
  }
}