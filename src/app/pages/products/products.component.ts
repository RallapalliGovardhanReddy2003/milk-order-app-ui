import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { PopupService } from '../../core/services/popup.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products: any[] = [];

  isModalOpen = false;
  editingId: number | null = null;

  product: any = this.getEmptyProduct();

  constructor(
    private productService: ProductService,
    private popup: PopupService
  ) {
    this.getAllProducts();
  }

  // ===============================
  // LOAD PRODUCTS
  // ===============================
  getAllProducts(): void {
    this.productService.getAll().subscribe({
      next: (data) => this.products = data,
      error: () => this.popup.open("Failed to load products ❌", "error")
    });
  }

  // ===============================
  // OPEN ADD MODAL
  // ===============================
  openAddModal(): void {
    this.product = this.getEmptyProduct();
    this.editingId = null;
    this.isModalOpen = true;
  }

  // ===============================
  // SAVE PRODUCT
  // ===============================
  save(): void {

    this.productService.create(this.product).subscribe({
      next: () => {
        this.popup.open("Product Added Successfully ✅", "success");
        this.getAllProducts();
        this.closeModal();
      },
      error: () => this.popup.open("Failed to Add Product ❌", "error")
    });
  }

  // ===============================
  // EDIT PRODUCT
  // ===============================
  edit(p: any): void {

    this.editingId = p.id;

    this.product = {
      ...p,
      deliveryAddress: {
        doorNo: p.deliveryAddress?.doorNo || '',
        landmark: p.deliveryAddress?.landmark || '',
        street: p.deliveryAddress?.street || '',
        pincode: p.deliveryAddress?.pincode || ''
      }
    };

    this.isModalOpen = true;
  }

  // ===============================
  // UPDATE PRODUCT
  // ===============================
  update(): void {

    if (!this.editingId) return;

    this.productService.update(this.editingId, this.product)
      .subscribe({
        next: () => {
          this.popup.open("Product Updated Successfully ✏️", "success");
          this.getAllProducts();
          this.closeModal();
        },
        error: () => this.popup.open("Failed to Update ❌", "error")
      });
  }

  // ===============================
  // DELETE PRODUCT (Soft Delete)
  // ===============================
  delete(id: number): void {

    this.productService.delete(id).subscribe({
      next: () => {
        this.popup.open("Product Deleted Successfully 🗑️", "success");
        this.getAllProducts();
      },
      error: () => this.popup.open("Failed to Delete ❌", "error")
    });
  }

  // ===============================
  // CLOSE MODAL
  // ===============================
  closeModal(): void {
    this.isModalOpen = false;
    this.product = this.getEmptyProduct();
    this.editingId = null;
  }

  // ===============================
  // FORMAT FULL ADDRESS
  // ===============================
  formatAddress(address: any): string {

    if (!address) return '-';

    const parts = [];

    if (address.doorNo) parts.push(address.doorNo);
    if (address.landmark) parts.push(address.landmark);
    if (address.street) parts.push(address.street);

    let formatted = parts.join(', ');

    if (address.pincode) {
      formatted += ' - ' + address.pincode;
    }

    return formatted || '-';
  }

  // ===============================
  // EMPTY PRODUCT TEMPLATE
  // ===============================
  private getEmptyProduct() {
    return {
      productName: '',
      productImage: '',
      price: 0,
      quantity: 0,
      description: '',
      deliveryAddress: {
        doorNo: '',
        landmark: '',
        street: '',
        pincode: ''
      }
    };
  }

}
