import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-page-settings-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule],
  templateUrl: './page-settings-dialog.html',
  styleUrl: './page-settings-dialog.scss',
})
export class PageSettingsDialog {
  pageName = '';
  pageSlug = '';
  seoTitle = '';
  seoDesc = '';
  isPublished = true;

  constructor(
    public dialogRef: MatDialogRef<PageSettingsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.pageName = data.name || '';
      this.pageSlug = '/' + this.pageName.toLowerCase().replace(/\s+/g, '-');
      this.seoTitle = `${this.pageName} | Institute Name`;
    }
  }

  close(): void { this.dialogRef.close(); }
  save(): void { this.dialogRef.close(true); }
}
