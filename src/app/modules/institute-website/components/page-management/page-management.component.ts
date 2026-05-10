import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditPageDialog } from '../edit-page-dialog/edit-page-dialog';
import { PageSettingsDialog } from '../page-settings-dialog/page-settings-dialog';

@Component({
  selector: 'app-page-management',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './page-management.component.html',
  styleUrls: ['./page-management.component.scss']
})
export class PageManagementComponent {
  pages = [
    { name: 'Home Page', icon: 'home' },
    { name: 'About Us', icon: 'info' },
    { name: 'Courses', icon: 'school' },
    { name: 'Contact Us', icon: 'contact_page' },
    { name: 'Test Series', icon: 'assignment' },
    { name: 'Recent Results', icon: 'emoji_events' },
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
