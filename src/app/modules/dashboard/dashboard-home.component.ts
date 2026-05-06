import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'dashboard-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss'
})
export class DashboardHomeComponent {
  stats = [
    { label: 'Total Students', value: '1,284', icon: 'people', color: '#133e87' },
    { label: 'Active Tests', value: '12', icon: 'assignment', color: '#e85b24' },
    { label: 'OMR Scanned', value: '45,820', icon: 'qr_code_scanner', color: '#059669' },
    { label: 'Total Revenue', value: '₹84,200', icon: 'payments', color: '#7c3aed' },
  ];

  quickActions = [
    { label: 'Create New Test', icon: 'add_circle', description: 'Setup a new online or OMR based exam' },
    { label: 'Scan OMR Sheets', icon: 'camera_alt', description: 'Upload images or use camera to scan' },
    { label: 'Generate Results', icon: 'analytics', description: 'Calculate ranks and publish analytics' },
    { label: 'Website Builder', icon: 'web', description: 'Manage your institute public portal' },
  ];
}
