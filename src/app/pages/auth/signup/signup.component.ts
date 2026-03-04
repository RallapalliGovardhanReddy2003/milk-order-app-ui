import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService, SignupRequest } from '../../../core/services/auth.service';
import { PopupService } from '../../../core/services/popup.service';
import { ModalService } from '../../../core/services/modal.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  user: SignupRequest = {
    username: '',
    email: '',
    mobile: '',
    password: '',
    address: '',
    role: 'USER'
  };

  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private popup: PopupService,
    private modal: ModalService
  ) {}

  signup() {

    // ✅ Basic validation
    if (!this.user.username ||
        !this.user.email ||
        !this.user.mobile ||
        !this.user.password ||
        !this.user.address ||
        !this.user.role) {

      this.popup.open("All fields are required ⚠", "error");
      return;
    }

    this.isLoading = true;

    this.authService.signup(this.user).subscribe({

      next: () => {

        this.isLoading = false;

        // 🔔 Quick success popup
        this.popup.open("Signup Successful ✅", "success");

        // 🪟 Detailed modal message
        this.modal.open(
          "Account Created 🎉",
          "Your account has been successfully registered. Please login to continue."
        );

        // Redirect to login after short delay
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },

      error: (err) => {

        this.isLoading = false;
        console.error("Signup Error:", err);

        // 🔔 Error popup
        this.popup.open("Signup Failed ❌", "error");

        // 🪟 Error modal
        this.modal.open(
          "Registration Error",
          "Something went wrong while creating your account. Please try again."
        );
      }
    });
  }

}
