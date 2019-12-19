import { JwtManager } from './jwt-manager.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  apiUrl: string;
  constructor(private auth: JwtManager) {
    this.apiUrl = environment.apiUrl;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: this.auth.getJwt() || ''
      }
       , url: (request.url.indexOf('/api') === 0 ? this.apiUrl : '') + request.url
    });

    return next.handle(request);
  }
}
