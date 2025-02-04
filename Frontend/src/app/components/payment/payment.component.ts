import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomerData } from '../../models/customer.model';
import { CustomerService} from '../../services/customer/customer.service';


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
  street: string = '';
  houseNumber: string = '';
  addressAddition: string = '';
  postalCode: string = '';
  city: string = '';
  country: string = 'Germany';

  constructor(private router: Router, private customer: CustomerService ) {}

  goBackToHome() {
    this.router.navigate(['']);
  }

  onSubmit() {
    if (this.title && this.firstName && this.lastName && this.mail && this.street && this.houseNumber && this.postalCode && this.city) {
        const customerData: CustomerData = {
            title: this.title,
            firstName: this.firstName,
            lastName: this.lastName,
            mail: this.mail,
            street: this.street,
            houseNumber: this.houseNumber,
            addressAddition: this.addressAddition,
            postalCode: this.postalCode,
            city: this.city,
            country: this.country
        };

        this.customer.setCustomerData(customerData);
        this.router.navigate(['payment/processing']);
      }
  }
}
