import { CustomerService } from '../customer.services';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";
import { Action } from "@ngrx/store";
import { CustomerActions } from "./customer.actions";

@Injectable()
export class CustomerEffect {
  constructor(private customerService: CustomerService, private actions$: Actions) {}

  /*
  1. Intercettiamo tutte le action di tipo LOADING
  2. Chiamata a getCustomers // API
  3. Se otteniamo i customers => dispatch di action di success
  4. Se otteniamo errore => dispatch action di error
  */
  loadCustomers$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(CustomerActions.LOAD_CUSTOMERS),
      mergeMap(() => {
        return this.customerService.getCustomers().pipe(
          map(customers => {
            return { type: CustomerActions.LOAD_CUSTOMERS_SUCCESS, payload: customers }
          }),
          catchError(() => of({ type: CustomerActions.LOAD_CUSTOMERS_ERROR, payload: 'Errore' }))
        )
      })
    )
  })

  loadCustomer$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(CustomerActions.LOAD_CUSTOMER),
      mergeMap((action: any) => {
        return this.customerService.getCustomerDetail(action.payload).pipe(
          map(customer => {
            return { type: CustomerActions.LOAD_CUSTOMER_SUCCESS, payload: customer }
          }),
          catchError(() => of({ type: CustomerActions.LOAD_CUSTOMER_ERROR, payload: 'Errore' }))
        )
      })
    )
  })

  createCustomer$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(CustomerActions.CREATE),
      mergeMap((action: any) => {
        return this.customerService.createCustomer(action.payload).pipe(
          map(customer => {
            return { type: CustomerActions.CREATE_SUCCESS, payload: customer }
          }),
          catchError(() => of({ type: CustomerActions.CREATE_ERROR, payload: 'Errore' }))
        )
      })
    )
  })

  updateCustomer$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(CustomerActions.EDIT),
      mergeMap((action: any) => {
        return this.customerService.updateCustomer(action.payload).pipe(
          map(customer => {
            return { type: CustomerActions.EDIT_SUCCESS, payload: {id: customer.id, changes: customer} }
          }),
          catchError(() => of({ type: CustomerActions.EDIT_ERROR, payload: 'Errore' }))
        )
      })
    )
  })

  deleteCustomer$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(CustomerActions.DELETE),
      mergeMap((action: any) => {
        return this.customerService.deleteCustomer(action.payload).pipe(
          map(() => {
            return { type: CustomerActions.DELETE_SUCCESS, payload: action.payload }
          }),
          catchError(() => of({ type: CustomerActions.DELETE_ERROR, payload: 'Errore' }))
        )
      })
    )
  })
}