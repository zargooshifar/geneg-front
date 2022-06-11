import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NB_AUTH_TOKEN_INTERCEPTOR_FILTER, NbAuthJWTInterceptor, NbAuthModule, NbAuthService} from '@nebular/auth';
import {NbRoleProvider} from '@nebular/security';
import {AnalyticsService} from '../services/analytics.service';
import {StateService} from '../services/state.service';
import {SeoService} from '../services/seo.service';
import {LayoutService} from '../services/layout.service';
import {throwIfAlreadyLoaded} from './module-import-guard';
import {AcobAuthOAuth2JWTToken} from './auth-stategy/AcobAuthOAuth2Token';
import {AcobOAuth2AuthStrategy} from './auth-stategy/AcobOAuth2AuthStrategy';
import {HTTP_INTERCEPTORS, HttpRequest} from '@angular/common/http';
import {UserService} from './data/user/user.service';
import {UserData} from './data/user/user';
import {ProductsData} from './data/products/product';
import {ProductsService} from './data/products/products.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ErrorInterceptor} from "../services/error.interceptor";
import {CompleterService, LocalDataFactory, RemoteDataFactory} from "@akveo/ng2-completer";
import {BACKEND} from "../const";


const DATA_SERVICES = [
  {provide: UserData, useClass: UserService},
  {provide: ProductsData, useClass: ProductsService},
  {provide: CompleterService},
  {provide: LocalDataFactory},
  {provide: RemoteDataFactory}
];

export class RoleProvider extends NbRoleProvider {
  constructor(private authService: NbAuthService) {
    super();
  }

  getSubRoles(role) {
    switch (role) {
      case 'guest':
        return ['guest'];
      case 'user':
        return ['guest', 'user'];
      case 'operator':
        return ['guest', 'user', 'operator'];
      case 'admin':
        return ['guest', 'user', 'operator', 'admin'];
      default:
         return ['none'];
    }
  }

  getRole(): Observable<string | string[]> {
    return this.authService.onTokenChange().pipe(
      map(token => {
        const role = token['accessTokenPayload']['role'];
        return this.getSubRoles(role);
      }),
    );
  }
}

export function filterInterceptorRequest(req: HttpRequest<any>) {
  return ['auth/', '/auth/token']
    .some(url => req.url.includes(url));
}

export const NB_CORE_PROVIDERS = [
  ...DATA_SERVICES,
  AcobOAuth2AuthStrategy,
  ...NbAuthModule.forRoot({

    strategies: [
      AcobOAuth2AuthStrategy.setup({
        name: 'username',
        baseEndpoint: BACKEND + 'api/',
        redirect: {
          success: '/',
        },
        token:
          {
            class: AcobAuthOAuth2JWTToken,
            requireValidToken: true,
            endpoint: 'auth/token',

          },
        refresh: {
          endpoint: 'auth/refresh',
          requireValidToken: true,
        },
        checkusername: {
          endpoint: 'auth/checkuername',
        },
        verifypin: {
          endpoint: 'auth/verifypin',
        },
        completeregister: {
          endpoint: 'auth/completeregister',
        },
        forgetpin: {
          endpoint: 'auth/forgetpin',
        },
        resetpassword: {
          endpoint: 'auth/resetpassword',
        },
        logout: {
          endpoint: 'auth/logout',
        },
        defaultErrors: ['نام کاربری یا کلمه عبور وارد شده اشتباه است.'],
        defaultMessages: ['کمی صبر کنید...'],
      }),
    ],
    forms: {
      login: {
        strategy: 'username',
      },
      logout: {
        strategy: 'username'
      }
    },
  }).providers,
  // NbSecurityModule.forRoot({
  //   accessControl: {
  //     guest: {
  //       view: '*',
  //     },
  //     user: {
  //       parent: 'guest',
  //       create: '*',
  //       edit: '*',
  //       remove: '*',
  //     },
  //   },
  // }).providers,

  {
    provide: NbRoleProvider, useClass: RoleProvider, deps: [NbAuthService],
  },
  AnalyticsService,
  LayoutService,
  SeoService,
  StateService,
];

@NgModule({
  imports: [
    CommonModule,

  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
        {provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
        {provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: filterInterceptorRequest},
      ],
    };
  }
}
