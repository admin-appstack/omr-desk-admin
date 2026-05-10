import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatSelectModule
  ],
  templateUrl: './user-dialog.html',
  styleUrl: './user-dialog.scss',
})
export class UserDialog {
  userName = '';
  userEmail = '';
  userRole = '';
  userStatus = 'Active';

  constructor(
    public dialogRef: MatDialogRef<UserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.userName = data.name || '';
      this.userEmail = data.email || '';
      this.userRole = data.role || '';
      this.userStatus = data.status || 'Active';
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close({
      name: this.userName,
      email: this.userEmail,
      role: this.userRole,
      status: this.userStatus
    });
  }
}
