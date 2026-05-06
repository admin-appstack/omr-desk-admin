import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'register-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-100 to-slate-100 px-4">
      <mat-card class="w-full max-w-md shadow-2xl">
        <mat-card-header class="mb-4">
          <mat-card-title class="text-3xl font-bold text-slate-900">Register</mat-card-title>
          <mat-card-subtitle class="text-slate-600 mt-2">
            Create your administrator account for the OMR dashboard.
          </mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Name</mat-label>
              <input matInput type="text" formControlName="name" placeholder="Your full name" />
              <mat-error *ngIf="form.get('name')?.hasError('minlength')">
                Name must be at least 2 characters.
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" placeholder="you@example.com" />
              <mat-error *ngIf="form.get('email')?.hasError('email')">
                Please enter a valid email.
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Password</mat-label>
              <input matInput type="password" formControlName="password" placeholder="••••••••" />
              <mat-error *ngIf="form.get('password')?.hasError('minlength')">
                Password must be at least 6 characters.
              </mat-error>
            </mat-form-field>

            <button
              mat-raised-button
              color="primary"
              type="submit"
              [disabled]="form.invalid || loading()"
              class="w-full"
            >
              {{ loading() ? 'Creating account...' : 'Create account' }}
            </button>

            <div *ngIf="error()" class="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded">
              {{ error() }}
            </div>
          </form>
        </mat-card-content>

        <mat-card-footer class="mt-6 pt-6 border-t border-slate-200">
          <a routerLink="/login" class="text-blue-600 hover:underline text-sm font-medium">
            Already have an account?
          </a>
        </mat-card-footer>
      </mat-card>
    </div>
  `,
  styles: [`
    ::ng-deep {
      .mat-mdc-card {
        border-radius: 1.5rem;
      }
    }
  `]
})
export class RegisterPage {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  error = signal('');
  loading = signal(false);

  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  onSubmit(): void {
    if (this.form.invalid) {
      this.error.set('All fields are required and password must be at least 6 characters.');
      return;
    }

    this.error.set('');
    this.loading.set(true);

    this.authService.register(this.form.value as { name: string; email: string; password: string })
      .then(() => this.router.navigate(['/dashboard']))
      .catch((err) => this.error.set(err.message))
      .finally(() => this.loading.set(false));
  }
}

