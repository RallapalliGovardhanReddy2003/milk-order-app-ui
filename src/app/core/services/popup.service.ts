import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  message: string = '';
  type: 'success' | 'error' | 'info' = 'info';
  show: boolean = false;

  open(message: string, type: 'success' | 'error' | 'info' = 'info') {
    this.message = message;
    this.type = type;
    this.show = true;

    // Auto close after 3 seconds
    setTimeout(() => {
      this.close();
    }, 3000);
  }

  close() {
    this.show = false;
  }
}
