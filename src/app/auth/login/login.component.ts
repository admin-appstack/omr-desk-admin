import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthService, SocialProvider } from '../service/auth.service';
import { SnackBarService } from '../../common/services/snackbar.service';

@Component({
  selector: 'login-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  loading = signal(false);
  showPassword = signal(false);

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly snackBarService: SnackBarService
  ) {}

  togglePassword(): void {
    this.showPassword.update(v => !v);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.snackBarService.showWarning('Please fill in valid credentials.');
      return;
    }

    this.loading.set(true);

    this.authService.login(this.form.value as { email: string; password: string })
      .then(() => {
        this.snackBarService.showSuccess('Logged in successfully!');
        this.router.navigate(['/dashboard/home']);
      })
      .catch((err) => {
        this.snackBarService.showError(err.message || 'Login failed.');
      })
      .finally(() => this.loading.set(false));
  }

  loginWith(provider: SocialProvider): void {
    this.loading.set(true);

    this.authService.loginWithProvider(provider)
      .then(() => {
        this.snackBarService.showSuccess('Logged in successfully!');
        this.router.navigate(['/dashboard/home']);
      })
      .catch((err) => {
        this.snackBarService.showError(err.message || 'Login failed.');
      })
      .finally(() => this.loading.set(false));
  }
}

