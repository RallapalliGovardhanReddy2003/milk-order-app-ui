import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// ===============================
// 🔥 LOGIN REQUEST (Matches Backend)
// ===============================
export interface LoginRequest {
  loginId: string;   // username OR email OR mobile
  password: string;
}

// ===============================
// 🔥 LOGIN RESPONSE
// ===============================
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  username: string;
  role: string;
}

// ===============================
// 🔥 SIGNUP REQUEST
// ===============================
export interface SignupRequest {
  username: string;
  email: string;
  password: string;
  role: string;
  mobile: string;
  address: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8070/auth';

  constructor(private http: HttpClient) {}

  // ===============================
  // ✅ LOGIN
  // ===============================
  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.baseUrl}/login`,
      data
    );
  }

  // ===============================
  // ✅ SIGNUP
  // ===============================
  signup(data: SignupRequest): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/signup`,
      data
    );
  }

  // ===============================
  // ✅ TOKEN MANAGEMENT
  // ===============================
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  saveRefreshToken(refreshToken: string) {
    localStorage.setItem('refreshToken', refreshToken);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
