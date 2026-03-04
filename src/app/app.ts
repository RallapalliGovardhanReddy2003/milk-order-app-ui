import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';
import { PopupComponent } from './shared/popup/popup.component';
import { ModalComponent } from './shared/modal/modal.component';
import { PopupService } from './core/services/popup.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    PopupComponent,
    ModalComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  constructor(
    private authService: AuthService,
    private router: Router,
    public popup: PopupService
  ) {}

  logout() {
    this.authService.logout();
    this.popup.open("Logged out successfully!", "info");
    this.router.navigate(['/']);
  }
}
