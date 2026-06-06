import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/service/auth.service';

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
    MatTooltipModule,
    MatDividerModule
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent {
  isSidebarCollapsed = signal(false);

  mainNav = [
    { icon: 'fa-thin fa-table-columns',       label: 'Dashboard',         route: '/dashboard/home',      badge: null  },
    { icon: 'fa-thin fa-globe',        label: 'Institute Website',  route: '/dashboard/website',   badge: null },
    { icon: 'fa-thin fa-chalkboard-user',           label: 'Classes',           route: '/dashboard/classes',   badge: null },
    { icon: 'fa-thin fa-graduation-cap',          label: 'Students',          route: '/dashboard/students',  badge: null },
    { icon: 'fa-thin fa-clipboard-check', label: 'Exams',        route: '/dashboard/exams',     badge: null },
    { icon: 'fa-thin fa-book-open-reader',   label: 'Question Bank',      route: '/dashboard/questions', badge: null  },
    { icon: 'fa-thin fa-file-signature',      label: 'Test Builder',       route: '/dashboard/tests',     badge: null  },
    { icon: 'fa-thin fa-qrcode', label: 'OMR Scanning',       route: '/dashboard/scanning',  badge: null  },
  ];

  managementNav = [
    { icon: 'fa-thin fa-chart-column',       label: 'Result & Analytics', route: '/dashboard/results',  badge: null },
    { icon: 'fa-thin fa-user-shield', label: 'Role Management', route: '/dashboard/roles', badge: null },
    { icon: 'fa-thin fa-users',          label: 'User Management',    route: '/dashboard/users',    badge: null },
    { icon: 'fa-thin fa-id-card', label: 'Subscription',       route: '/dashboard/subscriptions', badge: null },
    { icon: 'fa-thin fa-gear',        label: 'Settings',           route: '/dashboard/settings', badge: null },
  ];

  /** Keep old navItems for backward compat if needed */
  get navItems() { return [...this.mainNav, ...this.managementNav]; }

  constructor(private readonly authService: AuthService, private readonly router: Router) { }

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
