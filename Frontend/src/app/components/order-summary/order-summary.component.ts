import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order-summary',
  imports: [],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent implements OnInit {
  orderId: string = '123456'; // static order id for testing

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.sendEmail();
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
}
