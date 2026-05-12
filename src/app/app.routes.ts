import { Routes } from '@angular/router';
import { ForgotPasswordPage } from './auth/forgot-password-page';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardLayoutComponent } from './modules/dashboard/dashboard-layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordPage },
  { 
    path: 'dashboard', 
    component: DashboardLayoutComponent,
    children: [
      { path: '', redirectTo: '/dashboard/home', pathMatch: 'full' },
      { path: 'home', loadComponent: () => import('./modules/dashboard/dashboard-home.component').then(m => m.DashboardHomeComponent) },
      { path: 'exams', loadComponent: () => import('./modules/exams/exams.component').then(m => m.ExamsComponent) },
      { path: 'exams/:id/settings', loadComponent: () => import('./modules/exams/components/exam-settings/exam-settings').then(m => m.ExamSettings) },
      { path: 'classes', loadComponent: () => import('./modules/classes/classes').then(m => m.ClassesComponent) },
      { path: 'scanning', loadComponent: () => import('./modules/omr-scanning/omr-scanning.component').then(m => m.OmrScanningComponent) },
      { path: 'questions', loadComponent: () => import('./modules/question-bank/question-bank.component').then(m => m.QuestionBankComponent) },
      { path: 'tests', loadComponent: () => import('./modules/test-builder/test-builder.component').then(m => m.TestBuilderComponent) },
      { path: 'results', loadComponent: () => import('./modules/result-analytics/result-analytics.component').then(m => m.ResultAnalyticsComponent) },
      { path: 'website', loadComponent: () => import('./modules/institute-website/institute-website.component').then(m => m.InstituteWebsiteComponent) },
      { path: 'subscriptions', loadComponent: () => import('./modules/subscription-management/subscription-management.component').then(m => m.SubscriptionManagementComponent) },
      { path: 'settings', loadComponent: () => import('./modules/settings/settings.component').then(m => m.SettingsComponent) },
      { path: 'users', loadComponent: () => import('./modules/user-management/user-management').then(m => m.UserManagement) },
      { path: 'roles', loadComponent: () => import('./modules/role-management/role-management').then(m => m.RoleManagement) },
      { path: 'students', loadComponent: () => import('./modules/student-management/student-management').then(m => m.StudentManagement) },
    ]
  },
  { path: '**', redirectTo: 'login' }
];
