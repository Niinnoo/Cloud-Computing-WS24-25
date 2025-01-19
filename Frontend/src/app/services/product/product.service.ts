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

  addProduct(product: Product): void {
    this.http
      .post<Product>(`${this.apiURL}product`, product)
      .pipe(
        tap((newProduct) => {
          const currentProducts = this.productsSubject.getValue();
          this.productsSubject.next([...currentProducts, newProduct]);
        }),
        catchError((error) => {
          console.error('Error while adding product', error);
          throw error;
        })
      )
      .subscribe();
  }

  updateProduct(product: Product): void {
    this.http
      .put<Product>(`${this.apiURL}product/${product.id}`, product)
      .pipe(
        tap((updatedProduct) => {
          const currentProducts = this.productsSubject.getValue();
          const updatedProducts = currentProducts.map((p) =>
            p.id === updatedProduct.id ? updatedProduct : p
          );
          this.productsSubject.next(updatedProducts);
        }),
        catchError((error) => {
          console.error('Error while updating product', error);
          throw error;
        })
      )
      .subscribe();
  }

  deleteProduct(productId: number): void {
    this.http
      .delete<void>(`${this.apiURL}products/${productId}`)
      .pipe(
        tap(() => {
          const currentProducts = this.productsSubject.getValue();
          const updatedProducts = currentProducts.filter((p) => p.id !== productId);
          this.productsSubject.next(updatedProducts);
        }),
        catchError((error) => {
          console.error('Error while deleting product', error);
          throw error;
        })
      )
      .subscribe();
  }
}
