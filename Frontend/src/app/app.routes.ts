import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

export const routes: Routes = [
    {path: '', component: ProductListComponent},
    {path: 'cart', component: ShoppingCartComponent},
    {path: 'checkout', component: CheckoutComponent},
];
