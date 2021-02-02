import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Customer } from '../customer.model';
import { editCustomer } from '../store/customer.actions';
import * as fromCustomers  from '../store/customer.reducer';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  customerForm: FormGroup;
  constructor(private store: Store<any>, private fb: FormBuilder) { 

  }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      name: ["", Validators.required],
      phone: ["", Validators.required],
      address: ["", Validators.required],
      membership: ["", Validators.required],
      id: null
    });
    const customer$: Observable<Customer> = this.store.select(fromCustomers.getCustomer);


    customer$.subscribe((customer: Customer) => {
      if (customer) {
        this.customerForm = this.fb.group({
          name: customer.name,
          phone: customer.phone,
          address: customer.address,
          membership: customer.membership,
          id: customer.id
        });
      }
    })

  }

  updateCustomer() {
    const newCustomer: Customer = {
      id: this.customerForm.get('id').value,
      name: this.customerForm.get('name').value,
      phone: this.customerForm.get('phone').value,
      address: this.customerForm.get('address').value,
      membership: this.customerForm.get('membership').value,
    }
    this.store.dispatch(editCustomer({payload: newCustomer}));
    this.customerForm.reset();
  }

}
