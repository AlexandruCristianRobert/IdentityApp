import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { ValidationMessagesComponent } from './components/errors/validation-messages/validation-messages.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { NotificationComponent } from './components/modals/notification/notification.component'
import {ModalModule} from 'ngx-bootstrap/modal';
import { CheckoutComponent } from './checkout/checkout.component';
import { BasketComponent } from './checkout/basket/basket.component';
import { SuccessComponent } from './checkout/success/success.component';
import { CancelComponent } from './checkout/cancel/cancel.component';



@NgModule({
  declarations: [
    NotFoundComponent,
    ValidationMessagesComponent,
    NotificationComponent,
    CheckoutComponent,
    BasketComponent,
    SuccessComponent,
    CancelComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot()
  ],
  exports: [
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    ValidationMessagesComponent
  ]
})
export class SharedModule { }
