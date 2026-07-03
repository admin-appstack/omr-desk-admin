import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SnackBarService } from '../services/snackbar.service';

function getInstituteIdFromToken(token: string): string | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.instituteId ?? null;
  } catch {
    return null;
  }
}

export function httpResponseInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const snackBarService = inject(SnackBarService);
  const token = localStorage.getItem('omr-admin-auth-token');
  const headers: Record<string, string> = {};

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;

    const instituteId =
      localStorage.getItem('omr-admin-institute-id') ?? getInstituteIdFromToken(token);
    if (instituteId) {
      headers['x-institute-id'] = instituteId;
    }
  }

  const authReq = Object.keys(headers).length
    ? request.clone({ setHeaders: headers })
    : request;

  return next(authReq).pipe(
    map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // If the backend wraps responses in `{ success: boolean, data: any }`
        if (event.body && typeof event.body === 'object' && 'success' in event.body) {
          if (event.body.success === false) {
            const msg = event.body.message || 'Action failed.';
            snackBarService.showError(msg);
            throw new Error(msg);
          }
        }
      }
      return event;
    }),
    catchError((error: HttpErrorResponse | Error) => {
      // If already a plain Error (handled above as success:false), rethrow without double-showing snackbar
      if (!(error instanceof HttpErrorResponse)) {
        return throwError(() => error);
      }

      let message = '';
      if (error?.error?.message) {
        message = error.error.message;
      } else if (error?.error?.msg) {
        message = error.error.msg;
      }

      if (message === '') {
        if (error.error instanceof ErrorEvent) {
          message = `Error: ${error.error.message}`;
        } else if (error.status === 0 || error.status === 400) {
          message = 'Something went wrong. Please try again later.';
        } else if (error.status === 401 || error.status === 403) {
          message = 'Forbidden! You do not have permission.';
        } else if (error.status === 404) {
          message = 'Service not found';
        } else if (error.status === 500 || error.status === 503) {
          message = 'Service Unavailable or Server Error. Please try again later.';
        } else {
          message = `${error.status}: Something went wrong.`;
        }
      }

      snackBarService.showError(message);
      return throwError(() => new Error(message));
    })
  );
}
