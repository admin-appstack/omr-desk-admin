import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthService, SocialProvider } from '../auth.service';

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

  error = signal('');
  loading = signal(false);
  showPassword = signal(false);

  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  togglePassword(): void {
    this.showPassword.update(v => !v);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.error.set('Please fill in valid credentials.');
      return;
    }

    this.error.set('');
    this.loading.set(true);

    this.authService.login(this.form.value as { email: string; password: string })
      .then(() => {
        this.router.navigate(['/dashboard/home']);
      })
      .catch((err) => {
        this.error.set(err.message);
      })
      .finally(() => this.loading.set(false));
  }

  loginWith(provider: SocialProvider): void {
    this.error.set('');
    this.loading.set(true);

    this.authService.loginWithProvider(provider)
      .then(() => this.router.navigate(['/dashboard/home']))
      .finally(() => this.loading.set(false));
  }
}
