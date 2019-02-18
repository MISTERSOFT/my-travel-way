import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({ providedIn: 'root' })
export class NotifyService {
  constructor(private snackBar: MatSnackBar) { }

  info(message: string, actionText?: string, duration: number = 3000) {
    return this.snackBar.open(message, actionText, { duration });
  }
}
