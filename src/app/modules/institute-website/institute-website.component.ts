import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
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

  constructor(private dialog: MatDialog) {}

  onTemplateSelected(id: number) {
    this.selectedTemplate.set(id);
  }
}
