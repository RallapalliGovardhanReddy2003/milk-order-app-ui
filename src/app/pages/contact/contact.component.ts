import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PopupService } from '../../core/services/popup.service';

@Component({
selector: 'app-contact',
standalone: true,
imports: [CommonModule, FormsModule],
templateUrl: './contact.component.html',
styleUrls: ['./contact.component.css']
})
export class ContactComponent {

contact = {
name: '',
email: '',
message: ''
};

constructor(private popup: PopupService) {}

  submit() {
    this.popup.open("Message Sent Successfully ✅", "success");
    this.contact = { name: '', email: '', message: '' };
  }
}
