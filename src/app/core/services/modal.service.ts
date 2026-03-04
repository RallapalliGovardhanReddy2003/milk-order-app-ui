import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ModalData {
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalSubject = new BehaviorSubject<ModalData | null>(null);
  modalState$ = this.modalSubject.asObservable();

  open(title: string, content: string) {
    this.modalSubject.next({ title, content });
  }

  close() {
    this.modalSubject.next(null);
  }
}
