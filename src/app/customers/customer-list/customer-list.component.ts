import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {Customer} from "../customer.model";
import { loadingCustomer, loadingCustomers, deleteCustomer } from '../store/customer.actions';
import * as fromCustomers  from '../store/customer.reducer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  items$: Observable<Customer[]>;
  constructor(private store: Store<any>) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadingCustomers());
    /*this.store.subscribe(state => {
      this.items = state.customers.items;
    });*/
    this.items$ = this.store.pipe(select(fromCustomers.getCustomers));
  }

  editCustomer(customer: Customer) {
    this.store.dispatch(loadingCustomer({payload: customer.id}));
  }
  removeCustomer(customer: Customer) {
    this.store.dispatch(deleteCustomer({payload: customer.id}));
  }

}
