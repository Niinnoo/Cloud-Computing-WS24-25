import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [
      MatFormFieldModule,
      MatSelectModule,
      MatOptionModule,
      MatInputModule,
      MatButtonModule
    ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  constructor(private router: Router) {}

  goBackToHome() {
    this.router.navigate(['']);
  }
  
  payAsGuest() {
    this.router.navigate(['payment']);
  }
}