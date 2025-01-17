import { Injectable } from '@angular/core';
import {Product} from '../../models/product.model';
import {BehaviorSubject, catchError, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiURL = 'http://localhost:8080/webshop/';
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) { }

  getProducts(){
    return this.productsSubject.asObservable();
  }

  fetchProducts(): void {
    this.http.get<Product[]>(`${this.apiURL}inventory`)
      .pipe(
        tap((products) => this.productsSubject.next(products)),
        catchError((error) => {
          console.error('error while fetching products', error);
          throw error;
        })
      )
      .subscribe();
  }
}
