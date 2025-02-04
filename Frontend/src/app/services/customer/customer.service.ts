import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CustomerData } from '../../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customerDataSubject = new BehaviorSubject<CustomerData | null>(null);
  customerData$ = this.customerDataSubject.asObservable();

  setCustomerData(data: CustomerData) {
    this.customerDataSubject.next(data);
  }

  getCustomerData(): CustomerData | null {
    return this.customerDataSubject.getValue();
  }
}