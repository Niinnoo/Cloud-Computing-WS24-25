import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-processing',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule
  ],
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.css']
})
export class ProcessingComponent {

  constructor(private router: Router) {}

  chancelOrder() {
    this.router.navigate(['payment']);
  }

  buyCart() {
    this.router.navigate(['payment/paypal']);
  }
}