import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { PopupService } from '../../core/services/popup.service';

@Component({
selector: 'app-users',
standalone: true,
imports: [CommonModule, FormsModule],
templateUrl: './users.component.html',
styleUrls: ['./users.component.css']
})
export class UsersComponent {

users: any[] = [];
selectedUser: any = {};
editingId: number | null = null;

constructor(
    private userService: UserService,
    private popup: PopupService   // ✅ Inject popup
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  // ✅ LOAD USERS
  getAllUsers(): void {
    this.userService.getAll().subscribe({
      next: (data: any[]) => {
        this.users = data;
        this.popup.open("Users Loaded Successfully ✅", "info");
      },
      error: () => {
        this.popup.open("Failed to Load Users ❌", "error");
      }
    });
  }

  // ✅ EDIT
  edit(user: any): void {
    this.selectedUser = { ...user };
    this.editingId = user.id;
  }

  // ✅ UPDATE
  update(): void {
    if (this.editingId !== null) {
      this.userService.update(this.editingId, this.selectedUser)
        .subscribe({
          next: () => {
            this.popup.open("User Updated Successfully ✏️", "success");
            this.getAllUsers();
            this.cancel();
          },
          error: () => {
            this.popup.open("Failed to Update User ❌", "error");
          }
        });
    }
  }

  // ✅ DELETE
  delete(id: number): void {
    this.userService.delete(id)
      .subscribe({
        next: () => {
          this.popup.open("User Deleted Successfully 🗑️", "success");
          this.getAllUsers();
        },
        error: () => {
          this.popup.open("Failed to Delete User ❌", "error");
        }
      });
  }

  // ✅ CANCEL
  cancel(): void {
    this.selectedUser = {};
    this.editingId = null;
  }
}
