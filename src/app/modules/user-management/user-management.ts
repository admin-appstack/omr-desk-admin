import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatTableModule, MatTooltipModule],
  templateUrl: './user-management.html',
  styleUrl: './user-management.scss',
})
export class UserManagement {
  displayedColumns = ['id', 'user', 'role', 'lastActive', 'status', 'actions'];

  statCards = [
    { label: 'Total Users',     value: '1,248', icon: 'people',          theme: 'total',    tag: '+12 this week', tagClass: 'up' },
    { label: 'Active Users',    value: '1,102', icon: 'how_to_reg',      theme: 'active',   tag: '88% of total',   tagClass: 'info' },
    { label: 'Pending Invites', value: '45',    icon: 'mark_email_read', theme: 'pending',  tag: 'Needs action',   tagClass: 'warn' },
    { label: 'Admins',          value: '12',    icon: 'admin_panel_settings', theme: 'admin', tag: 'System level', tagClass: 'admin' },
  ];

  users = [
    { id: 'USR-1001', name: 'Alice Smith', email: 'alice.smith@example.com', avatar: 'AS', role: 'Super Admin', lastActive: 'Just now', status: 'Active' },
    { id: 'USR-1002', name: 'Bob Johnson', email: 'bob.j@example.com', avatar: 'BJ', role: 'Editor', lastActive: '2 hrs ago', status: 'Active' },
    { id: 'USR-1003', name: 'Carol Williams', email: 'carol.w@example.com', avatar: 'CW', role: 'Viewer', lastActive: '1 day ago', status: 'Pending' },
    { id: 'USR-1004', name: 'David Brown', email: 'david.b@example.com', avatar: 'DB', role: 'Editor', lastActive: '5 mins ago', status: 'Active' },
    { id: 'USR-1005', name: 'Eve Davis', email: 'eve.d@example.com', avatar: 'ED', role: 'Admin', lastActive: '1 week ago', status: 'Suspended' },
  ];
}
