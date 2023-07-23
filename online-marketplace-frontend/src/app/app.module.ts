import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { UserAuthComponent } from './components/user-auth/user-auth.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthService } from './services/auth.service';
import { ProductService } from './services/product.service';
import { OrderService } from './services/order.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductListingComponent,
    ProductDetailComponent,
    UserAuthComponent,
    CartComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    isDevMode() ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [AuthService, ProductService, OrderService],
  bootstrap: [AppComponent],
})
export class AppModule {}
