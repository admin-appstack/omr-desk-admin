import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent {
  isSidebarCollapsed = signal(false);
  
  navItems = [
    { icon: 'dashboard', label: 'Overview', route: '/dashboard/home' },
    { icon: 'language', label: 'Institute Website', route: '/dashboard/website' },
    { icon: 'library_books', label: 'Question Bank', route: '/dashboard/questions' },
    { icon: 'assignment', label: 'Test Builder', route: '/dashboard/tests' },
    { icon: 'qr_code_scanner', label: 'OMR Scanning', route: '/dashboard/scanning' },
    { icon: 'analytics', label: 'Result & Analytics', route: '/dashboard/results' },
    { icon: 'payments', label: 'Payments', route: '/dashboard/payments' },
    { icon: 'settings', label: 'Settings', route: '/dashboard/settings' },
  ];

  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  get user() {
    return this.authService.currentUser;
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed.update(v => !v);
  }

  signOut(): void {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }
}
