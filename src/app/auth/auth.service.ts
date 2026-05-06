import { Injectable, computed, signal } from '@angular/core';
import { Router } from '@angular/router';

export type SocialProvider = 'google' | 'facebook' | 'instagram';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginCredentials {
  name: string;
}

export interface AuthUser {
  name: string;
  email: string;
  provider: SocialProvider | 'password';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authTokenKey = 'omr-admin-auth-token';
  private readonly authUserKey = 'omr-admin-user';
  private readonly _isAuthenticated = signal(this.hasToken());
  readonly isAuthenticated = computed(() => this._isAuthenticated());

  constructor(private readonly router: Router) {}

  login(credentials: LoginCredentials): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!credentials.email || !credentials.password) {
          reject(new Error('Email and password are required.'));
          return;
        }

        this.saveSession({
          name: 'OMR User',
          email: credentials.email,
          provider: 'password'
        });
        resolve();
      }, 700);
    });
  }

  register(payload: RegisterPayload): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!payload.name || !payload.email || !payload.password) {
          reject(new Error('All fields are required.'));
          return;
        }

        this.saveSession({
          name: payload.name,
          email: payload.email,
          provider: 'password'
        });
        resolve();
      }, 900);
    });
  }

  loginWithProvider(provider: SocialProvider): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.saveSession({
          name: provider === 'instagram' ? 'Instagram User' : `${provider[0].toUpperCase()}${provider.slice(1)} User`,
          email: `${provider}@example.com`,
          provider
        });
        resolve();
      }, 800);
    });
  }

  forgotPassword(email: string): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email) {
          reject(new Error('Please enter your email address.'));
          return;
        }
        resolve();
      }, 700);
    });
  }

  signOut(): void {
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.authUserKey);
    this._isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  get currentUser(): AuthUser | null {
    const stored = localStorage.getItem(this.authUserKey);
    return stored ? JSON.parse(stored) as AuthUser : null;
  }

  private saveSession(user: AuthUser): void {
    localStorage.setItem(this.authTokenKey, `${user.provider}-token-${Date.now()}`);
    localStorage.setItem(this.authUserKey, JSON.stringify(user));
    this._isAuthenticated.set(true);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.authTokenKey);
  }
}
