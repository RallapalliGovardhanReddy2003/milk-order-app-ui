import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService, ModalData } from '../../core/services/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  modalData: ModalData | null = null;

  constructor(private modal: ModalService) {
    this.modal.modalState$.subscribe((data) => {
      this.modalData = data;
    });
  }

  close() {
    this.modal.close();
  }
}
