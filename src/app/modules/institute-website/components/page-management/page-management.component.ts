import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { EditPageDialog } from '../edit-page-dialog/edit-page-dialog';
import { PageSettingsDialog } from '../page-settings-dialog/page-settings-dialog';

@Component({
  selector: 'app-page-management',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatIconModule, MatButtonModule, MatDialogModule, MatSlideToggleModule],
  templateUrl: './page-management.component.html',
  styleUrls: ['./page-management.component.scss']
})
export class PageManagementComponent {
  pages = [
    { name: 'Home Page', icon: 'home', isPublished: true },
    { name: 'About Us', icon: 'info', isPublished: true },
    { name: 'Courses', icon: 'school', isPublished: true },
    { name: 'Contact Us', icon: 'contact_page', isPublished: true },
    { name: 'Test Series', icon: 'assignment', isPublished: false },
    { name: 'Recent Results', icon: 'emoji_events', isPublished: false },
  ];

  constructor(private dialog: MatDialog) {}

  openEditDialog(page: any) {
    this.dialog.open(EditPageDialog, {
      width: '800px',
      height: '600px',
      disableClose: true,
      panelClass: 'custom-dialog-container',
      data: page
    });
  }

  openSettingsDialog(page: any) {
    this.dialog.open(PageSettingsDialog, {
      width: '600px',
      disableClose: true,
      panelClass: 'custom-dialog-container',
      data: page
    });
  }
}
