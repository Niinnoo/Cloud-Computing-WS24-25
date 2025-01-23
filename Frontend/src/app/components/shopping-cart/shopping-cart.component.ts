import { CartService } from '../../services/shopping-cart/shopping-cart.service';
import { CartItem} from '../../models/cart-item.model';
import { Component, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
  showCheckout: boolean = false;
  emptyCart: boolean = true;
  displayedColumns: string[] = ['name', 'price', 'quantity', 'total', 'actions'];
  dataSource = new MatTableDataSource<CartItem>([]);
  cartItems: CartItem[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.dataSource.data = items;
    });
    this.updateCartStatus();
  }

  updateCartStatus() {
    this.emptyCart = this.cartItems.length === 0;
  }

  getTotalCost() {
    return this.cartService.getTotalCost();
  }

  addQuantity(item: CartItem) {
    this.cartService.updateQuantity(item, true);
    this.updateCartStatus();
  }

  removeQuantity(item: CartItem) {
    this.cartService.updateQuantity(item, false);
    this.updateCartStatus();
  }

  removeFromCart(item: CartItem) {
    this.cartService.removeFromCart(item);
    this.snackBar.open('Item removed from cart', 'Close', { duration: 2000 });
    this.updateCartStatus();
  }

  onBackClick() {
    this.router.navigate(['']);
  }

  onCheckoutClick() {
    this.router.navigate(['checkout']);
  }

  protected readonly parseFloat = parseFloat;
}
