// notification.service.ts

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationComponent } from './notification/notification.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private dialog: MatDialog) {}

  openDialog(title: string, message: string): void {
    this.dialog.open(NotificationComponent, {
      width: '500px',
      data: { title, message },
    });
  }
}
