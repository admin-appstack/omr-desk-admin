import { Injectable, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../common/services/http.service';
import { firstValueFrom } from 'rxjs';
import { ENDPOINTS } from './api.collection';

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

  constructor(
    private readonly router: Router,
    private readonly httpService: HttpService
  ) {}

  async login(credentials: LoginCredentials): Promise<void> {
    if (!credentials.email || !credentials.password) {
      throw new Error('Email and password are required.');
    }

    const response = await firstValueFrom(
      this.httpService.post(ENDPOINTS.LOGIN, credentials)
    );

    this.saveSession({
      name: response.user.name,
      email: response.user.email,
      provider: 'password'
    });
  }

  async register(payload: RegisterPayload): Promise<void> {
    if (!payload.name || !payload.email || !payload.password) {
      throw new Error('All fields are required.');
    }

    const response = await firstValueFrom(
      this.httpService.post(ENDPOINTS.REGISTER, payload)
    );

    this.saveSession({
      name: response.user.name,
      email: response.user.email,
      provider: 'password'
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
