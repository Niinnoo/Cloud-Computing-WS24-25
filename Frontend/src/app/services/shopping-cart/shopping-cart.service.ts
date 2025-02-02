import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../../models/cart-item.model';
import { Product } from '../../models/product.model';
import { ProductService } from '../product/product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor(private productService: ProductService) {}

  addToCart(productId: number) {
    this.productService.getProductById(productId).subscribe((product: Product) => {
      const currentItems = this.cartItems.getValue();
      const existingItem = currentItems.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
        this.cartItems.next([...currentItems]);
      } else {
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1
        };
        this.cartItems.next([...currentItems, newItem]);
      }
    });
  }

  removeFromCart(item: CartItem) {
    const currentItems = this.cartItems.getValue();
    const updatedItems = currentItems.filter(cartItem => cartItem.id !== item.id);
    this.cartItems.next(updatedItems);
  }

  updateQuantity(item: CartItem, increase: boolean) {
    const currentItems = this.cartItems.getValue();
    const existingItem = currentItems.find(i => i.id === item.id);

    if (existingItem) {
      existingItem.quantity = increase ? existingItem.quantity + 1 : existingItem.quantity - 1;

      if (existingItem.quantity === 0) {
        this.removeFromCart(item);
      } else {
        this.cartItems.next([...currentItems]);
      }
    }
  }

  getTotalQuantity() {
    return this.cartItems.getValue().reduce((sum, item) => sum + item.quantity, 0);
  }

  getTotalCost() {
    return this.cartItems.getValue()
      .reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}