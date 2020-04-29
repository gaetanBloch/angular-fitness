import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class UiService {
  loadingStateChanged = new Subject<boolean>();

  constructor(private snackbar: MatSnackBar) {
  }

  showSnackbar(message: string, action: string, duration: number) {
    this.snackbar.open(message, action, {duration});
  }
}
