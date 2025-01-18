import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component';
import { ProcessingComponent } from './processing/processing.component';
import { PaypalMockupComponent } from './paypal-mockup/paypal-mockup.component';

export const routes: Routes = [
    {path: '', component: ProductListComponent},
    {path: 'cart', component: ShoppingCartComponent},
    {path: 'checkout', component: CheckoutComponent},
    {path: 'payment', component: PaymentComponent},
    {path: 'payment/processing', component: ProcessingComponent},
    {path: 'payment/paypal', component: PaypalMockupComponent}
];
