import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService, LoginRequest, LoginResponse } from '../../../core/services/auth.service';
import { ModalService } from '../../../core/services/modal.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // ✅ Must match backend AuthRequest
  credentials: LoginRequest = {
    loginId: '',
    password: ''
  };

  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private modal: ModalService
  ) {}

  // ==========================
  // ✅ LOGIN METHOD
  // ==========================
  login(): void {

    if (!this.credentials.loginId || !this.credentials.password) {
      this.modal.open(
        "Validation Error ⚠",
        "Login ID and Password are required."
      );
      return;
    }

    this.isLoading = true;

    this.authService.login(this.credentials).subscribe({

      next: (res: LoginResponse) => {

        this.isLoading = false;

        // ✅ Save tokens using service methods
        this.authService.saveToken(res.accessToken);
        this.authService.saveRefreshToken(res.refreshToken);

        // ✅ Save user info
        localStorage.setItem('username', res.username);
        localStorage.setItem('role', res.role);

        this.modal.open(
          "Login Successful ✅",
          "Welcome " + res.username
        );

        const returnUrl =
          this.route.snapshot.queryParams['returnUrl'] || '/dashboard';

        this.router.navigateByUrl(returnUrl);
      },

      error: (err) => {

        this.isLoading = false;

        console.error("Login Error:", err);

        this.modal.open(
          "Login Failed ❌",
          err?.error || "Invalid credentials"
        );
      }
    });
  }
}
