import { Routes } from '@angular/router';
import { DashboardPage } from './dashboard-page';
import { ForgotPasswordPage } from './auth/forgot-password-page';
import { LoginPage } from './auth/login-page';
import { RegisterPage } from './auth/register-page';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: 'forgot-password', component: ForgotPasswordPage },
  { path: 'dashboard', component: DashboardPage },
  { path: '**', redirectTo: 'login' }
];
