import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Module
import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
// NGX Module
import {NgxStripeModule} from "ngx-stripe";
// Components
import { AppComponent } from './app.component';
// CONST
import {PRIVATE_STRIPE_KEY} from "./private_stripe_key";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxStripeModule.forRoot(PRIVATE_STRIPE_KEY),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
