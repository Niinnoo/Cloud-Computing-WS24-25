import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/shopping-cart/shopping-cart.service';
import { CartItem } from '../../models/cart-item.model';
import { CustomerService} from '../../services/customer/customer.service';
import { CustomerData } from '../../models/customer.model';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarComponent } from "../toolbar/toolbar.component";

@Component({
  selector: 'app-processing',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    MatIconModule,
    ToolbarComponent
],
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.css']
})
export class ProcessingComponent implements OnInit {
  customerData: CustomerData | null = null;
  cartItems: CartItem[] = [];

  constructor(private router: Router, private cartService: CartService, private customerService: CustomerService) {}

  ngOnInit() {
    this.customerData = this.customerService.getCustomerData();
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  getTotalCost() {
    return this.cartService.getTotalCost();
  }

  cancelOrder() {
    this.router.navigate(['payment']);
  }

  buyCart() {
    this.router.navigate(['payment/paypal']);
  }
}
