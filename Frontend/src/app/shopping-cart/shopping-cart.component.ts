import { CartService, CartItem } from '../shopping-cart-service.service';
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

  constructor(
    private snackBar: MatSnackBar,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.dataSource.data = items;
    });
  }

  getTotalCost() {
    return this.cartService.getTotalCost();
  }

  addQuantity(item: CartItem) {
    this.cartService.updateQuantity(item, true);
  }

  removeQuantity(item: CartItem) {
    this.cartService.updateQuantity(item, false);
  }

  removeFromCart(item: CartItem) {
    this.cartService.removeFromCart(item);
    this.snackBar.open('Item removed from cart', 'Close', { duration: 2000 });
  }

  onBackClick() {
    this.toggleView.emit();
  }
}
