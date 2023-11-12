import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './shared/components/errors/not-found/not-found.component';
import { ShopComponent } from './shop/shop.component';
import { AuthorizationGuard } from './shared/guards/authorization.guard';
import { CheckoutComponent } from './shared/checkout/checkout.component';
import { SuccessComponent } from './shared/checkout/success/success.component';
import { CancelComponent } from './shared/checkout/cancel/cancel.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthorizationGuard],
    children: [
      {
        path: 'checkout', component: CheckoutComponent,
      },
      {
        path: 'checkout/success', component: SuccessComponent,
      },
      {
        path: 'checkout/cancel', component: CancelComponent,
      }
    ]
  },
  {path:'shop', component: ShopComponent},
  {path: 'account', loadChildren: () => import("./account/account.module").then(module => module.AccountModule) },
  {path: 'not-found', component:NotFoundComponent},
  {path:"**", component: NotFoundComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
