import { Customer } from '../customer.model';
import {createReducer, Action, on, createFeatureSelector, createSelector} from "@ngrx/store";
import * as customerActions from "./customer.actions";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";


interface CustomerState extends EntityState<Customer> {
  loading: Boolean;
  loaded: Boolean;
  error: String;
  selectedCustomerId: number | null;
}
export const customerAdapter: EntityAdapter<Customer> = createEntityAdapter<Customer>();
const defaultCustomers: CustomerState = {
  ids: [],
  entities: {},
  loading: false,
  loaded: false,
  error: '',
  selectedCustomerId: null,
};

const initialState= customerAdapter.getInitialState(defaultCustomers);

const reducer = createReducer(
  initialState,
  on(customerActions.loadSuccessCustomers, (state, { payload }) => {
    return customerAdapter.addMany(payload, {
      ...state,
      loading: false,
      loaded: true
    });
  }),
  on(customerActions.loadErrorCustomers, (state, { payload }) => {
    return {
      ...state,
      loading: false,
      loaded: false,
      error: payload
    }
  }),
  on(customerActions.loadSuccessCustomer, (state, { payload }) => {
    return customerAdapter.addOne(payload, {
      ...state,
      selectedCustomerId: payload.id,
    });
  }),
  on(customerActions.loadErrorCustomer, (state, { payload }) => {
    return {
      ...state,
      error: payload
    }
  }),
  on(customerActions.createSuccessCustomer, (state, { payload }) => {
    return customerAdapter.addOne(payload, state);
  }),
  on(customerActions.createErrorCustomer, (state, { payload }) => {
    return {
      ...state,
      error: payload
    }
  }),
  on(customerActions.editSuccessCustomer, (state, { payload }) => {
    return customerAdapter.updateOne(payload, state);
  }),
  on(customerActions.editErrorCustomer, (state, { payload }) => {
    return {
      ...state,
      error: payload
    }
  }),
  on(customerActions.deleteSuccessCustomer, (state, { payload }) => {
    return customerAdapter.removeOne(payload, state);
  }),
  on(customerActions.deleteErrorCustomer, (state, { payload }) => {
    return {
      ...state,
      error: payload
    }
  }),
)

export function customerReducer(state: CustomerState | undefined, action: Action) {
  return reducer(state, action);
}

const getCustomersFeature = createFeatureSelector('customers');
export const getCustomers = createSelector(getCustomersFeature, customerAdapter.getSelectors().selectAll);
export const getLoading = createSelector(getCustomersFeature, (state: CustomerState) => {
  return state.loading;
})
export const getCustomer = createSelector(getCustomersFeature, (state: CustomerState) => {
  return state.entities[state.selectedCustomerId]
})
/*
customers: {
  items,
  loading,
  loaded
}
*/