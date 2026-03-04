import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';   // ✅ ADD THIS
import { DashboardService } from '../../core/services/dashboard.service';
import { PopupService } from '../../core/services/popup.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule   // ✅ REQUIRED FOR routerLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  summary: any = {
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0
  };

  constructor(
    private dashboardService: DashboardService,
    private popup: PopupService
  ) {}

  ngOnInit(): void {
    this.loadSummary();
  }

  loadSummary() {
    this.dashboardService.getSummary().subscribe({
      next: (data: any) => {
        this.summary = data;

        if (
          data.totalUsers === 0 &&
          data.totalProducts === 0 &&
          data.totalOrders === 0
        ) {
          this.popup.open("No Data Available 📊", "info");
        } else {
          this.popup.open("Dashboard Loaded Successfully ✅", "success");
        }
      },
      error: () => {
        this.popup.open("Failed to Load Dashboard ❌", "error");
      }
    });
  }
}
