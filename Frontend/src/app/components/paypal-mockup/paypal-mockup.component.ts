import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paypal-mockup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paypal-mockup.component.html',
  styleUrls: ['./paypal-mockup.component.css']
})
export class PaypalMockupComponent implements OnInit {
  paymentSuccess = false;

  ngOnInit() {
    setTimeout(() => {
      this.paymentSuccess = true;
    }, 3000); // Zeigt die Nachricht nach 3 Sekunden an
  }
}