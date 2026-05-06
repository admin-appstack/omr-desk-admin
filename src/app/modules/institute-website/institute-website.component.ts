import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TemplateGridComponent } from './components/template-grid/template-grid.component';
import { WebsiteSettingsComponent } from './components/website-settings/website-settings.component';
import { PageManagementComponent } from './components/page-management/page-management.component';

@Component({
  selector: 'app-institute-website',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    TemplateGridComponent,
    WebsiteSettingsComponent,
    PageManagementComponent
  ],
  templateUrl: './institute-website.component.html',
  styleUrls: ['./institute-website.component.scss']
})
export class InstituteWebsiteComponent {
  selectedTemplate = signal(1);
  activeStep = 0;
  isLive = true;

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  onTemplateSelected(id: number) {
    this.selectedTemplate.set(id);
  }

  toggleLive() {
    this.isLive = !this.isLive;
    const message = this.isLive
      ? '🟢 Website is now LIVE and publicly accessible.'
      : '🔴 Website has been taken OFFLINE. Visitors will see a maintenance page.';
    this.snackBar.open(message, 'Dismiss', {
      duration: 4000,
      panelClass: this.isLive ? 'snack-live' : 'snack-offline',
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
