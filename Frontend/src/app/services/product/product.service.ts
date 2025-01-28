import { Injectable } from '@angular/core';
import {Product} from '../../models/product.model';
import {BehaviorSubject, catchError, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {BackendUrlService} from '../backend-url/backend-url.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiURL: string;
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient, private backendURL: BackendUrlService) {
    this.apiURL = backendURL.getBackendUrl();
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
      .patch<Product>(`${this.apiURL}product/${product.id}`, product)
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
      .delete<void>(`${this.apiURL}product/${productId}`)
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
