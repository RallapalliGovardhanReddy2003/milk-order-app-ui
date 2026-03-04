import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../core/services/order.service';
import { PopupService } from '../../core/services/popup.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  orders: any[] = [];
  selectedOrder: any = this.getEmptyOrder();
  editingId: number | null = null;
  isModalOpen = false;

  constructor(
    private orderService: OrderService,
    private popup: PopupService
  ) {
    this.getAllOrders();
  }
  ngOnInit(): void {
    this.getAllOrders();
  }

  // =====================
  // LOAD ORDERS
  // =====================
  getAllOrders(): void {
    this.orderService.getAll().subscribe({
      next: (data: any[]) => {
        this.orders = data;
        this.popup.open("Orders Loaded Successfully ✅", "info");
      },
      error: () => {
        this.popup.open("Failed to Load Orders ❌", "error");
      }
    });
  }

  // =====================
  // OPEN ADD MODAL
  // =====================
  openAddModal(): void {
    this.selectedOrder = this.getEmptyOrder();
    this.editingId = null;
    this.isModalOpen = true;
  }

  // =====================
  // CREATE ORDER
  // =====================
  create(): void {
    this.orderService.create(this.selectedOrder).subscribe({
      next: () => {
        this.popup.open("Order Created Successfully ✅", "success");
        this.getAllOrders();
        this.closeModal();
      },
      error: () => {
        this.popup.open("Failed to Create Order ❌", "error");
      }
    });
  }

  // =====================
  // EDIT ORDER
  // =====================
  edit(order: any): void {
    this.selectedOrder = { ...order };
    this.editingId = order.id;
    this.isModalOpen = true;
  }

  // =====================
  // UPDATE ORDER
  // =====================
  update(): void {
    if (this.editingId === null) return;

    this.orderService.update(this.editingId, this.selectedOrder)
      .subscribe({
        next: () => {
          this.popup.open("Order Updated Successfully ✏️", "success");
          this.getAllOrders();
          this.closeModal();
        },
        error: () => {
          this.popup.open("Failed to Update Order ❌", "error");
        }
      });
  }

  // =====================
  // DELETE ORDER
  // =====================
  delete(id: number): void {
    this.orderService.delete(id)
      .subscribe({
        next: () => {
          this.popup.open("Order Deleted Successfully 🗑️", "success");
          this.getAllOrders();
        },
        error: () => {
          this.popup.open("Failed to Delete Order ❌", "error");
        }
      });
  }

  // =====================
  // CLOSE MODAL
  // =====================
  closeModal(): void {
    this.selectedOrder = this.getEmptyOrder();
    this.editingId = null;
    this.isModalOpen = false;
  }

  private getEmptyOrder() {
    return {
      customerName: '',
      productName: '',
      quantity: 0,
      totalPrice: 0,
      deliveryAddress: ''
    };
  }
}
