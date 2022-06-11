import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Observable, of as observableOf} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {NB_WINDOW} from '@nebular/theme';
import {
  NbAuthIllegalTokenError,
  NbAuthRefreshableToken,
  NbAuthResult,
  NbAuthStrategy,
  NbAuthStrategyClass,
  NbAuthToken
} from '@nebular/auth';
import {AcobOAuthStategyOptions} from './AcobOAuthStategyOptions';

export enum AUTH_STATES {
  CHECK_USERNAME,
  LOGIN,
  REGISTER,
  RESET_PASSWORD,
  FORGET_PIN,
  VERIFY_REGISTER_PIN,
  VERIFY_FORGET_PIN,
}

@Injectable()
export class AcobOAuth2AuthStrategy extends NbAuthStrategy {


  static setup(options: AcobOAuthStategyOptions): [NbAuthStrategyClass, AcobOAuthStategyOptions] {

    return [AcobOAuth2AuthStrategy, options];
  }

  get responseType() {
    return this.getOption('authorize.responseType');
  }

  constructor(protected http: HttpClient,
              protected route: ActivatedRoute,
              @Inject(NB_WINDOW) protected window: any) {
    super();
  }

  authenticate(data?: any): Observable<NbAuthResult> {
    switch (data.state) {
      case AUTH_STATES.LOGIN:
        return this.passwordToken(data);
      case AUTH_STATES.CHECK_USERNAME:
        data['module'] = 'checkusername';
        return this.getResult(data);
      case AUTH_STATES.VERIFY_FORGET_PIN:
      case AUTH_STATES.VERIFY_REGISTER_PIN:
        data['module'] = 'verifypin';
        return this.getResult(data);
      case AUTH_STATES.FORGET_PIN:
        data['module'] = 'forgetpin';
        return this.getResult(data);
    }

  }


  refreshToken(token: NbAuthRefreshableToken): Observable<NbAuthResult> {
    const module = 'refresh';
    const url = this.getActionEndpoint(module);
    const requireValidToken = this.getOption(`${module}.requireValidToken`);

    // let headers = new HttpHeaders();
    // headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(url, this.buildRefreshRequestData(token))
      .pipe(
        map((res) => {
          return new NbAuthResult(
            true,
            res,
            null,
            [],
            null,
            this.createRefreshedToken(res, token, requireValidToken));
        }),
        catchError((res) => this.handleResponseError(res)),
      );
  }

  passwordToken(data): Observable<NbAuthResult> {
    const module = 'token';
    const url = this.getActionEndpoint(module);
    const requireValidToken = this.getOption(`${module}.requireValidToken`);


    return this.http.post(url, this.buildPasswordRequestData(data))
      .pipe(
        map((res) => {
          return new NbAuthResult(
            true,
            res,
            this.getOption('redirect.success'),
            [],
            this.getOption('defaultMessages'),
            this.createToken(res, requireValidToken));
        }),
        catchError((res) => this.handleResponseError(res)),
      );
  }

  protected authorizeRedirect() {
    this.window.location.href = this.buildRedirectUrl();
  }


  protected buildRefreshRequestData(token: NbAuthRefreshableToken): any {
    const params = {
      refresh: token.getRefreshToken(),
    };
    return (this.cleanParams(params));
  }

  protected buildPasswordRequestData(params): string {
    return (this.cleanParams(params));
  }


  protected cleanParams(params: any): any {
    Object.entries(params)
      .forEach(([key, val]) => (!val && delete params[key]) || (key === 'state' && delete params[key]) || (key === 'module' && delete params[key]));
    return params;
  }


  protected handleResponseError(res: any): Observable<NbAuthResult> {
    let errors = [];
    if (res instanceof HttpErrorResponse) {
      if (res.error.error_description) {
        errors.push(res.error.error_description);
      } else {
        errors = this.getOption('defaultErrors');
      }
    } else if (res instanceof NbAuthIllegalTokenError) {
      errors.push(res.message);
    } else {
      errors.push('Something went wrong.');
    }

    return observableOf(
      new NbAuthResult(
        false,
        res,
        this.getOption('redirect.failure'),
        errors,
        [],
      ));
  }

  protected buildRedirectUrl() {
    const params = {
      response_type: this.getOption('authorize.responseType'),
      redirect_uri: this.getOption('authorize.redirectUri'),
      scope: this.getOption('authorize.scope'),
      state: this.getOption('authorize.state'),

      ...this.getOption('authorize.params'),
    };

    const endpoint = this.getActionEndpoint('authorize');
    const query = (this.cleanParams(params));

    return `${endpoint}?${query}`;
  }

  protected parseHashAsQueryParams(hash: string): { [key: string]: string } {
    return hash ? hash.split('&').reduce((acc: any, part: string) => {
      const item = part.split('=');
      acc[item[0]] = decodeURIComponent(item[1]);
      return acc;
    }, {}) : {};
  }
  //
  // protected urlEncodeParameters(params: any): string {
  //   return Object.keys(params).map((k) => {
  //     return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`;
  //   }).join('&');
  // }

  protected createRefreshedToken(res, existingToken: NbAuthRefreshableToken, requireValidToken: boolean): NbAuthToken {
    type AuthRefreshToken = NbAuthRefreshableToken & NbAuthToken;

    const refreshedToken: AuthRefreshToken = this.createToken<AuthRefreshToken>(res, requireValidToken);
    if (!refreshedToken.getRefreshToken() && existingToken.getRefreshToken()) {
      refreshedToken.setRefreshToken(existingToken.getRefreshToken());
    }
    return refreshedToken;
  }

  register(data?: any): Observable<NbAuthResult> {
    const module = 'completeregister';
    const url = this.getActionEndpoint(module);
    const requireValidToken = this.getOption(`${module}.requireValidToken`);

    delete data['pin'];
    delete data['username'];
    return this.http.post(url, this.cleanParams(data))
      .pipe(
        map((res) => {
          return new NbAuthResult(
            true,
            res,
            this.getOption('redirect.success'),
            [],
            [],
            this.createToken(res, requireValidToken));
        }),
        catchError((res) => this.handleResponseError(res)),
      );
  }

  requestPassword(data?: any): Observable<NbAuthResult> {
    throw new Error('not implemented yet!');
  }

  resetPassword(data: any = {}): Observable<NbAuthResult> {
    data['module'] = 'resetpassword';
    return this.getResult(data);
  }

  logout(): Observable<NbAuthResult> {
    this.createToken('');
    return observableOf(new NbAuthResult(true, null, '/'));
    // const module = 'logout';
    // const url = this.getActionEndpoint(module);
    // return this.http.get(url).pipe( map((res) => new NbAuthResult(true)),
    //     catchError((res) => this.handleResponseError(res)),
    //   );
  }


  private getResult(data: any) {
    const module = data['module'];
    const url = this.getActionEndpoint(module);
    return this.http.post(url, (this.cleanParams(data)))
      .pipe(
        map((res) => {
          return new NbAuthResult(
            true,
            res,
            this.getOption('redirect.success'),
            [],
            []);
        }),
        catchError((res) => this.handleResponseError(res)),
      );
  }

}


