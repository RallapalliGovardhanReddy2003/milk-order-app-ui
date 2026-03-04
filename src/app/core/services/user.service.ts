import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {

private baseUrl = 'http://localhost:8070/users';

constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(`${this.baseUrl}/getallusers`);
  }

  update(id: number, user: any) {
    return this.http.put(`${this.baseUrl}/updating/${id}`, user);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/deleting/${id}`);
  }

  getProfile() {
    return this.http.get(`${this.baseUrl}/profile`);
  }

  updateProfile(user: any) {
    return this.http.put(`${this.baseUrl}/profile`, user);
  }
}
