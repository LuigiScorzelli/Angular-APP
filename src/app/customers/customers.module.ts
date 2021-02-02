import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import {Routes, RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {customerReducer} from './store/customer.reducer';
import {EffectsModule} from '@ngrx/effects';
import {CustomerEffect} from '../customers/store/customer.effects';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';

const routes: Routes = [
  {path: '', component: CustomerComponent}
];

@NgModule({
  declarations: [CustomerComponent, CustomerListComponent, CustomerAddComponent, CustomerEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([CustomerEffect]),
    RouterModule.forChild(routes),
    StoreModule.forFeature('customers', customerReducer)
  ]
})
export class CustomersModule { }
