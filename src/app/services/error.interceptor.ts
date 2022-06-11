import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
import {NbAuthService} from "@nebular/auth";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private handler: HttpBackend, private toastr: NbToastrService, private auth: NbAuthService) {
  }

  http: HttpClient;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      // if ([401, 403].indexOf(err.status) !== -1) {
      //   // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      //   // window.alert('لطفا دوباره وارد سایت شوید');
      //   location.reload(true);
      //
      // }
      const message = err.error.error || err.error.message || err.statusText;
      this.toastr.danger(message, 'خطایی رخ داد!', {position: NbGlobalPhysicalPosition.TOP_RIGHT});
      this.http = new HttpClient(this.handler);
      if (err.statusCode === 401) {
              this.toastr.danger(message, 'خطایی رخ داد! relogin?!', {position: NbGlobalPhysicalPosition.TOP_RIGHT});
              this.auth.logout("username");
      }
      // return new Observable<HttpEvent<any>>();
      return throwError(err);
    }));
  }
}
