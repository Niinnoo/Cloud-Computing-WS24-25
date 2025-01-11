import { Component, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    CommonModule
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  displayedColumns: string[] = ['name', 'price', 'quantity', 'total', 'actions'];
  dataSource = new MatTableDataSource<CartItem>([]);
  cartItems: CartItem[] = [];

  @Output() toggleView = new EventEmitter<void>();

  constructor(private snackBar: MatSnackBar) {}

  getTotalCost() {
    return this.cartItems.map(t => t.price * t.quantity).reduce((acc, value) => acc + value, 0);
  }

  onBackClick() {
    this.toggleView.emit();
  }
  
  addToCart(item: CartItem) {
    const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ ...item, quantity: 1 });
    }
    this.dataSource.data = this.cartItems;
    this.snackBar.open('Item added to cart', 'Close', { duration: 2000 });
  }

  removeFromCart(item: CartItem) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
    this.dataSource.data = this.cartItems;
    this.snackBar.open('Item removed from cart', 'Close', { duration: 2000 });
  }
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}
