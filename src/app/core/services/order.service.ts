import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class OrderService {

private baseUrl = 'http://localhost:8070/orders';

constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(`${this.baseUrl}/getallorders`);
  }

  create(order: any) {
    return this.http.post(`${this.baseUrl}/create`, order);
  }

  update(id: number, order: any) {
    return this.http.put(`${this.baseUrl}/updateorder/${id}`, order);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
