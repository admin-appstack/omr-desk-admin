import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="dashboard-card">
      <div class="dashboard-header">
        <div>
          <p class="eyebrow">Welcome back</p>
          <h1>{{ user?.name || 'Administrator' }}</h1>
          <p class="subtitle">Manage scanning workflows, users, and admin settings from the dashboard.</p>
        </div>

        <button type="button" class="sign-out" (click)="signOut()">Sign out</button>
      </div>

      <div class="dashboard-details">
        <p><strong>Email</strong></p>
        <p>{{ user?.email }}</p>
        <p><strong>Authentication</strong></p>
        <p>{{ user?.provider | titlecase }}</p>
      </div>
    </section>
  `,
  styles: [
    `
      .dashboard-card {
        max-width: 720px;
        margin: 2.5rem auto;
        padding: 2rem;
        border-radius: 22px;
        background: white;
        box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);
      }

      .dashboard-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 1rem;
        margin-bottom: 2rem;
      }

      .eyebrow {
        margin: 0 0 0.5rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: #4f46e5;
        font-size: 0.8rem;
      }

      h1 {
        margin: 0;
        font-size: clamp(2rem, 2.5vw, 2.75rem);
        line-height: 1.05;
      }

      .subtitle {
        margin: 0.75rem 0 0;
        color: #475569;
      }

      .sign-out {
        border: none;
        background: #1d4ed8;
        color: white;
        padding: 0.9rem 1.25rem;
        border-radius: 999px;
        cursor: pointer;
        font-weight: 600;
      }

      .dashboard-details p {
        margin: 0.6rem 0;
        color: #334155;
      }

      .dashboard-details p strong {
        display: block;
        margin-bottom: 0.4rem;
        color: #0f172a;
      }
    `
  ]
})
export class DashboardPage {
  constructor(private readonly authService: AuthService) {}

  get user() {
    return this.authService.currentUser;
  }

  signOut(): void {
    this.authService.signOut();
  }
}
