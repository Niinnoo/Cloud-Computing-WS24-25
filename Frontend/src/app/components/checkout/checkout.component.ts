import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatBadge } from '@angular/material/badge';
import { MatToolbar } from '@angular/material/toolbar';
import { CartService } from '../../services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-checkout',
  imports: [
      MatFormFieldModule,
      MatSelectModule,
      MatOptionModule,
      MatInputModule,
      MatButtonModule,
      MatIcon,
      MatBadge,
      MatToolbar
    ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  constructor(private router: Router, private cartService: CartService) {}

  getTotalQuantity(): number {
    return this.cartService.getTotalQuantity();
  }

  onRightIcon1Click() {
    this.router.navigate(['cart']);
  }

  onRightIcon2Click() {
    this.router.navigate(['admin']);
  }
  
  payAsGuest() {
    this.router.navigate(['payment']);
  }

  goBackToHome() {
    this.router.navigate(['']);
  }
}