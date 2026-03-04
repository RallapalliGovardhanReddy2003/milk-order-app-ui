import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, LoginRequest, AuthResponse } from '../../core/services/auth.service';

@Component({
selector: 'app-login',
standalone: true,
imports: [CommonModule, FormsModule],
templateUrl: './login.component.html'
})
export class LoginComponent {

username: string = '';
password: string = '';

// ✅ ADD THESE TWO
message: string = '';
isError: boolean = false;

constructor(
    private authService: AuthService,
    private router: Router
  ) {}

 login() {

  const credentials = {
    username: this.username,
    password: this.password
  };

  this.authService.login(credentials)
    .subscribe({
      next: (res: any) => {

        console.log("LOGIN RESPONSE:", res);

        // 🔥 STORE ACCESS TOKEN CORRECTLY
        localStorage.setItem('token', res.accessToken);

        localStorage.setItem('refreshToken', res.refreshToken);
        localStorage.setItem('role', res.role);
        localStorage.setItem('username', res.username);
        alert("Login Successful ✅");
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        alert("Invalid Username or Password ❌");
      }
    });
}

}
