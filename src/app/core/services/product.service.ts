import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Address {
city: string;
state: string;
}

export interface Product {
id?: number;
productName: string;
productImage: string;   // 🔥 MUST match backend
price: number;
quantity: number;
description: string;    // 🔥 ADD THIS
deliveryAddress: Address;
}

@Injectable({ providedIn: 'root' })
export class ProductService {

private baseUrl = 'http://localhost:8070/products';

constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(`${this.baseUrl}/getallproducts`);
  }

  create(product: any) {
    return this.http.post(`${this.baseUrl}/saveproduct`, product);
  }

  update(id: number, product: any) {
    return this.http.put(`${this.baseUrl}/updating/${id}`, product);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/deleting/${id}`);
  }
}
