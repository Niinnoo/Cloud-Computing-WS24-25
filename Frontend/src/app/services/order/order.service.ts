import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderResponse, Order } from '../../models/order.model';
import {BackendUrlService} from '../backend-url/backend-url.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl: string;

  constructor(private http: HttpClient, private backendURL: BackendUrlService) {
    this.apiUrl = backendURL.getBackendUrl();
  }

  getOrder(orderId: string): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${this.apiUrl}order/${orderId}`);
  }

  createOrder(orderData: Order): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(`${this.apiUrl}order`, orderData);
  }
}