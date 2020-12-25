import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import {Routes, RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {customerReducer} from './store/customer.reducer';

const routes: Routes = [
  {path: '', component: CustomerComponent}
];

@NgModule({
  declarations: [CustomerComponent, CustomerListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('customers', customerReducer)
  ]
})
export class CustomersModule { }
