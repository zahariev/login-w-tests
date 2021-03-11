import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class FakeServerInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.endsWith('/auth')) {
      return this.authenticate();
    }

    return next.handle(req);
  }

  authenticate(): Observable<HttpResponse<any>> {
    console.log('interceptor');

    return of(
      new HttpResponse({
        status: 200,
        body: 'jwt-token',
      })
    ).pipe(delay(1000));
  }
}

export const fakeServerProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeServerInterceptor,
  multi: true,
};
