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
  instituteId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authTokenKey = 'omr-admin-auth-token';
  private readonly authUserKey = 'omr-admin-user';
  private readonly instituteIdKey = 'omr-admin-institute-id';
  private readonly _isAuthenticated = signal(this.isValidSession());
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

    if (response?.user?.role === 'SUPER_ADMIN') {
      throw new Error('Access denied. Super Admin cannot login to this portal.');
    }

    const firstName = response?.user?.firstName || '';
    const lastName = response?.user?.lastName || '';
    const name = `${firstName} ${lastName}`.trim() || response?.user?.name || 'Admin User';

    this.saveSession({
      name: name,
      email: response.user.email,
      provider: 'password',
      instituteId: response.user.instituteId,
    }, response.accessToken);
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
      provider: 'password',
      instituteId: response.user.instituteId,
    }, response.accessToken);
  }

  loginWithProvider(provider: SocialProvider): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.saveSession({
          name: provider === 'instagram' ? 'Instagram User' : `${provider[0].toUpperCase()}${provider.slice(1)} User`,
          email: `${provider}@example.com`,
          provider
        }, `${provider}-token-${Date.now()}`);
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
    this.clearSession();
    this.router.navigate(['/login']);
  }

  clearSession(): void {
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.authUserKey);
    localStorage.removeItem(this.instituteIdKey);
    this._isAuthenticated.set(false);
  }

  isValidSession(): boolean {
    const token = localStorage.getItem(this.authTokenKey);
    if (!token || token.split('.').length !== 3) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        return false;
      }
      return !!payload.instituteId;
    } catch {
      return false;
    }
  }

  get instituteId(): string | null {
    return localStorage.getItem(this.instituteIdKey);
  }

  get currentUser(): AuthUser | null {
    const stored = localStorage.getItem(this.authUserKey);
    return stored ? JSON.parse(stored) as AuthUser : null;
  }

  private saveSession(user: AuthUser, token: string): void {
    localStorage.setItem(this.authTokenKey, token);
    localStorage.setItem(this.authUserKey, JSON.stringify(user));

    const instituteId = user.instituteId ?? this.readInstituteIdFromToken(token);
    if (instituteId) {
      localStorage.setItem(this.instituteIdKey, instituteId);
    } else {
      localStorage.removeItem(this.instituteIdKey);
    }

    this._isAuthenticated.set(this.isValidSession());
  }

  private readInstituteIdFromToken(token: string): string | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.instituteId ?? null;
    } catch {
      return null;
    }
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.authTokenKey);
  }
}
