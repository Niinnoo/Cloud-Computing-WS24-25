import { Component, Input, Output, EventEmitter } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from '../../services/shopping-cart/shopping-cart.service';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-toolbar',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatToolbarModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  @Input() title: string = 'Online Shop';
  @Input() leftIcon: string = 'menu';
  @Input() rightIcon1: string = 'shopping_cart';
  @Input() rightIcon2: string = 'admin_panel_settings';
  @Output() rightIcon1Click = new EventEmitter();
  @Output() rightIcon2Click = new EventEmitter();

  constructor(
      private cartService: CartService,
      private router: Router)
      {}
  
    getTotalQuantity(): number {
      return this.cartService.getTotalQuantity();
    }
  
    onRightIcon1Click() {
      this.rightIcon1Click.emit();
      this.router.navigate(['cart']);
    }
  
    onRightIcon2Click() {
      this.rightIcon2Click.emit();
      this.router.navigate(['admin']);
    }

    navigateToHome() {
      this.router.navigate(['']);
    }

}
