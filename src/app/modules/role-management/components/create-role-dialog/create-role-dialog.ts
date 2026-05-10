import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-create-role-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatTabsModule
  ],
  templateUrl: './create-role-dialog.html',
  styleUrl: './create-role-dialog.scss',
})
export class CreateRoleDialog {
  roleName = '';
  roleDescription = '';

  permissions: any[] = [
    {
      module: 'Dashboard',
      features: [
        { name: 'Overview', view: true, download: false, create: false, update: false, delete: false, noDownload: true, noCreate: true, noUpdate: true, noDelete: true },
        { name: 'Total Students', view: false, download: false, create: false, update: false, delete: false, noDownload: true, noCreate: true, noUpdate: true, noDelete: true },
        { name: 'Active Tests', view: false, download: false, create: false, update: false, delete: false, noDownload: true, noCreate: true, noUpdate: true, noDelete: true },
        { name: 'OMR Scanned', view: false, download: false, create: false, update: false, delete: false, noDownload: true, noCreate: true, noUpdate: true, noDelete: true },
        { name: 'Total Revenue', view: false, download: false, create: false, update: false, delete: false, noDownload: true, noCreate: true, noUpdate: true, noDelete: true },
        { name: 'Active Processing', view: false, download: false, create: false, update: false, delete: false, noDownload: true, noCreate: true, noUpdate: true, noDelete: true },
        { name: 'Recent Activity', view: false, download: false, create: false, update: false, delete: false, noDownload: true, noCreate: true, noUpdate: true, noDelete: true },
        { name: 'Quick Actions', view: false, download: false, create: false, update: false, delete: false, noDownload: true, noCreate: true, noUpdate: true, noDelete: true }
      ]
    },
    {
      module: 'Institute Website',
      features: [
        { name: 'Information', view: true, download: false, create: false, update: false, delete: false, noDownload: true, noCreate: true, noDelete: true },
        { name: 'Website Status', view: false, download: false, create: false, update: false, delete: false, noView: true, noDownload: true, noCreate: true, noDelete: true }
      ]
    },
    {
      module: 'Question Bank',
      features: [
        { name: 'Questions', view: true, download: false, create: false, update: false, delete: false },
        { name: 'Review Question', view: false, download: false, create: false, update: false, delete: false },
        { name: 'Categories', view: false, download: false, create: false, update: false, delete: false },
        { name: 'Tags', view: false, download: false, create: false, update: false, delete: false }
      ]
    },
    {
      module: 'Test Builder',
      features: [
        { name: 'Tests', view: true, download: false, create: false, update: false, delete: false },
        { name: 'Test Review', view: false, download: false, create: false, update: false, delete: false, noView: true, noDownload: true, noCreate: true, noDelete: true }
      ]
    },
    {
      module: 'OMR Scanning',
      features: [
        { name: 'Scans', view: true, download: false, create: false, update: false, delete: false },
        { name: 'Templates', view: false, download: false, create: false, update: false, delete: false }
      ]
    },
    {
      module: 'Result & Analytics',
      features: [
        { name: 'Overview', view: true, download: false, create: false, update: false, delete: false, noDownload: true, noCreate: true, noUpdate: true, noDelete: true },
        { name: 'Reports', view: false, download: false, create: false, update: false, delete: false, noView: true, noCreate: true, noUpdate: true, noDelete: true }
      ]
    },
    {
      module: 'Payments',
      features: [
        { name: 'Transactions', view: false, download: false, create: false, update: false, delete: false, noDownload: true, noCreate: true, noUpdate: true, noDelete: true },
        { name: 'Invoices', view: false, download: false, create: false, update: false, delete: false, noDownload: true, noCreate: true, noUpdate: true, noDelete: true },
        { name: 'Subscriptions', view: false, download: false, create: false, update: false, delete: false, noDownload: true, noCreate: true }
      ]
    },
    {
      module: 'User & Role Mgt',
      features: [
        { name: 'Users', view: false, download: false, create: false, update: false, delete: false },
        { name: 'Roles', view: false, download: false, create: false, update: false, delete: false, noDownload: true },
        { name: 'Export', view: false, download: false, create: false, update: false, delete: false, noView: true, noCreate: true, noUpdate: true, noDelete: true }
      ]
    },
    {
      module: 'Student Management',
      features: [
        { name: 'Students', view: true, download: false, create: false, update: false, delete: false },
        { name: 'Batches', view: false, download: false, create: false, update: false, delete: false },
        { name: 'Enrollments', view: false, download: false, create: false, update: false, delete: false }
      ]
    },
    {
      module: 'Settings',
      features: [
        { name: 'System Configs', view: false, download: false, create: false, update: false, delete: false, noDownload: true, noCreate: true, noDelete: true }
      ]
    },
    {
      module: 'Notifications',
      features: [
        { name: 'System Alerts', view: true, download: false, create: false, update: false, delete: false, noDownload: true, noCreate: true, noUpdate: true, noDelete: true },
        { name: 'Student Notifications', view: false, download: false, create: false, update: false, delete: false, noDownload: true, noCreate: true, noUpdate: true, noDelete: true },
        { name: 'Payment Alerts', view: false, download: false, create: false, update: false, delete: false, noDownload: true, noCreate: true, noUpdate: true, noDelete: true },
        { name: 'Scan Alerts', view: false, download: false, create: false, update: false, delete: false, noDownload: true, noCreate: true, noUpdate: true, noDelete: true },
        { name: 'Security Alerts', view: false, download: false, create: false, update: false, delete: false, noDownload: true, noCreate: true, noUpdate: true, noDelete: true },
        { name: 'Push Notifications', view: false, download: false, create: false, update: false, delete: false }
      ]
    }
  ];

  constructor(public dialogRef: MatDialogRef<CreateRoleDialog>) {}

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    // In a real app, send data to service
    this.dialogRef.close({
      name: this.roleName,
      description: this.roleDescription,
      permissions: this.permissions
    });
  }

  toggleModule(moduleObj: any, checked: boolean) {
    moduleObj.features.forEach((f: any) => {
      if (!f.noView) f.view = checked;
      if (!f.noDownload) f.download = checked;
      if (!f.noCreate) f.create = checked;
      if (!f.noUpdate) f.update = checked;
      if (!f.noDelete) f.delete = checked;
    });
  }

  isModuleIndeterminate(moduleObj: any): boolean {
    let selected = 0;
    let total = 0;
    moduleObj.features.forEach((f: any) => {
      if (!f.noView) { total++; if(f.view) selected++; }
      if (!f.noDownload) { total++; if(f.download) selected++; }
      if (!f.noCreate) { total++; if(f.create) selected++; }
      if (!f.noUpdate) { total++; if(f.update) selected++; }
      if (!f.noDelete) { total++; if(f.delete) selected++; }
    });
    return selected > 0 && selected < total;
  }

  isModuleAllSelected(moduleObj: any): boolean {
    return moduleObj.features.every((f: any) => 
      (f.noView || f.view) && 
      (f.noDownload || f.download) && 
      (f.noCreate || f.create) && 
      (f.noUpdate || f.update) && 
      (f.noDelete || f.delete)
    );
  }
}
