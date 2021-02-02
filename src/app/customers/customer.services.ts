import { Injectable } from "@angular/core";
import { Customer } from "./customer.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  private customersUrl: string = "http://localhost:3000/customers";

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customersUrl);
  }
  getCustomerDetail(id: number): Observable<Customer> {
    return this.http.get<Customer>(this.customersUrl + '/' + id);
  }
  createCustomer(payload: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.customersUrl, payload);
  }
  updateCustomer(payload: Customer): Observable<Customer> {
    return this.http.patch<Customer>(this.customersUrl + '/' + payload.id, payload);
  }
  deleteCustomer(id: number) {
    return this.http.delete(this.customersUrl + '/' + id);
  }
}