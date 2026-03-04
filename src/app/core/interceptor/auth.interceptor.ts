import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { PopupService } from '../services/popup.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

const popup = inject(PopupService);   // ✅ inject service in functional interceptor

const token = localStorage.getItem('token');

// Skip login & signup APIs
if (
    req.url.includes('/auth/login') ||
    req.url.includes('/auth/signup')
  ) {
    return next(req);
  }

  // Clone request with token
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  return next(authReq).pipe(
    catchError((error) => {

      if (error.status === 401) {
        popup.open("Unauthorized! Please login again.", "error");
      }

      if (error.status === 403) {
        popup.open("Access Denied!", "error");
      }

      if (error.status === 500) {
        popup.open("Server Error! Try again later.", "error");
      }

      return throwError(() => error);
    })
  );
};
