import {createAction, props} from "@ngrx/store";
import { Customer } from '../customer.model';
import { Update } from '@ngrx/entity';

export enum CustomerActions {
  LOAD_CUSTOMERS = '[Customers] Loading',
  LOAD_CUSTOMERS_SUCCESS = '[Customers] Loadin_success',
  LOAD_CUSTOMERS_ERROR = '[Customers] Loadin_error',

  LOAD_CUSTOMER = '[Customer] Loading',
  LOAD_CUSTOMER_SUCCESS = '[Customer] Loadin_success',
  LOAD_CUSTOMER_ERROR = '[Customer] Loadin_error',

  CREATE = '[Customers] Create',
  CREATE_SUCCESS = '[Customers] Create_success',
  CREATE_ERROR = '[Customers] Create_error',

  EDIT = '[Customers] Edit',
  EDIT_SUCCESS = '[Customers] Edit_success',
  EDIT_ERROR = '[Customers] Edir_error',

  DELETE = '[Customers] Delete',
  DELETE_SUCCESS = '[Customers] Delete_success',
  DELETE_ERROR = '[Customers] Delete_error',


}

export const loadingCustomers = createAction(CustomerActions.LOAD_CUSTOMERS);
export const loadSuccessCustomers = createAction(CustomerActions.LOAD_CUSTOMERS_SUCCESS, props<{payload: Customer[]}>());
export const loadErrorCustomers = createAction(CustomerActions.LOAD_CUSTOMERS_ERROR, props<{payload: String}>());

export const loadingCustomer = createAction(CustomerActions.LOAD_CUSTOMER, props<{payload: number}>());
export const loadSuccessCustomer = createAction(CustomerActions.LOAD_CUSTOMER_SUCCESS, props<{payload: Customer}>());
export const loadErrorCustomer = createAction(CustomerActions.LOAD_CUSTOMER_ERROR, props<{payload: String}>());

export const createCustomer = createAction(CustomerActions.CREATE, props<{payload: Customer}>());
export const createSuccessCustomer = createAction(CustomerActions.CREATE_SUCCESS, props<{payload: Customer}>());
export const createErrorCustomer = createAction(CustomerActions.CREATE_ERROR, props<{payload: String}>());

export const editCustomer = createAction(CustomerActions.EDIT, props<{payload: Customer}>());
export const editSuccessCustomer = createAction(CustomerActions.EDIT_SUCCESS, props<{payload: Update<Customer>}>());
export const editErrorCustomer = createAction(CustomerActions.EDIT_ERROR, props<{payload: String}>());

export const deleteCustomer = createAction(CustomerActions.DELETE, props<{payload: number}>());
export const deleteSuccessCustomer = createAction(CustomerActions.DELETE_SUCCESS, props<{payload: number}>());
export const deleteErrorCustomer = createAction(CustomerActions.DELETE_ERROR, props<{payload: String}>());