import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
selector: 'app-signup',
standalone: true,
imports: [CommonModule, FormsModule],
templateUrl: './signup.component.html'
})
export class SignupComponent {

user = {
username: '',
email: '',
mobile: '',
password: '',
address: '',
role: 'USER' as 'USER' | 'ADMIN'
};

message = '';
isError = false;

constructor(private authService: AuthService) {}

  signup() {
    this.authService.signup(this.user).subscribe({
      next: () => {
        alert('Registration Successful ✅ Please Login Now');
        this.isError = false;
      },
      error: () => {
        alert('Registration Failed ❌ Please Try Again');
        this.isError = true;
      }
    });
  }
}
