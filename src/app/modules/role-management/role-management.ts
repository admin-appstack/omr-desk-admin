import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { CreateRoleDialog } from './components/create-role-dialog/create-role-dialog';

@Component({
  selector: 'app-role-management',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatTableModule, MatTooltipModule, MatDialogModule, MatMenuModule, MatDividerModule],
  templateUrl: './role-management.html',
  styleUrl: './role-management.scss',
})
export class RoleManagement {
  constructor(private dialog: MatDialog) {}

  displayedColumns = ['id', 'roleName', 'usersCount', 'permissions', 'status', 'actions'];

  statCards = [
    { label: 'Total Roles',        value: '8',      icon: 'admin_panel_settings', theme: 'total',   tag: '2 system defaults', tagClass: 'info' },
    { label: 'Custom Roles',       value: '6',      icon: 'tune',                 theme: 'custom',  tag: '+1 this month',     tagClass: 'up' },
    { label: 'Active Permissions', value: '45',     icon: 'key',                  theme: 'perms',   tag: 'Across 12 modules', tagClass: 'info' },
    { label: 'Unassigned Roles',   value: '1',      icon: 'warning',              theme: 'warning', tag: 'Review needed',     tagClass: 'warn' },
  ];

  roles = [
    { id: 'ROL-001', name: 'Super Admin', description: 'Full access to all system modules and settings.', users: 3, perms: 'All Access', status: 'Active' },
    { id: 'ROL-002', name: 'Admin', description: 'Access to most modules, except system configurations.', users: 12, perms: '38 Permissions', status: 'Active' },
    { id: 'ROL-003', name: 'Editor', description: 'Can create and edit content, but cannot publish.', users: 45, perms: '24 Permissions', status: 'Active' },
    { id: 'ROL-004', name: 'Viewer', description: 'Read-only access to specific analytics and reports.', users: 128, perms: '12 Permissions', status: 'Active' },
    { id: 'ROL-005', name: 'Guest', description: 'Limited temporary access.', users: 0, perms: '2 Permissions', status: 'Inactive' },
  ];

  openCreateRoleModal() {
    this.dialog.open(CreateRoleDialog, {
      width: '800px',
      maxHeight: '90vh',
      disableClose: true,
      panelClass: 'custom-dialog-container'
    });
  }

  editRole(role: any) {
    this.dialog.open(CreateRoleDialog, {
      width: '800px',
      maxHeight: '90vh',
      disableClose: true,
      panelClass: 'custom-dialog-container',
      data: role
    });
  }
}
