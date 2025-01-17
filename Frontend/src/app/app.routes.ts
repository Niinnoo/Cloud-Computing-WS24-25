import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import {AdminPanelComponent} from './components/admin-panel/admin-panel.component';

export const routes: Routes = [
  {path: '', component: ProductListComponent},
  {path: 'cart', component: ShoppingCartComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'admin', component: AdminPanelComponent},
];
