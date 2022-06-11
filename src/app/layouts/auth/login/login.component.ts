import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject} from '@angular/core';
import {getDeepFromObject, NB_AUTH_OPTIONS, NbAuthResult, NbAuthService} from '@nebular/auth';
import {ActivatedRoute, Router} from '@angular/router';
import {AUTH_STATES} from '../../../core/auth-stategy/AcobOAuth2AuthStrategy';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {


  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  rememberMe = false;


  state: AUTH_STATES = AUTH_STATES.CHECK_USERNAME;


  constructor(private authService: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) private options = {},
              private cd: ChangeDetectorRef,
              private router: Router,
              private route: ActivatedRoute) {
    this.strategy = this.getConfigValue('forms.login.strategy');
        this.showMessages = this.getConfigValue('forms.login.showMessages');
    route
      .params
      .subscribe(data => {
        // if (data['redirect'])
        //   options.redirect.success = data['redirect'];


      });
  }

  checkUserName(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    this.user.state = this.state;
    this.authService.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      if (result.isSuccess()) {
        if (result.getResponse()['exists']) {
          this.state = AUTH_STATES.LOGIN;
        } else {
          this.user['verification_id'] = result.getResponse()['verification_id'];
          this.state = AUTH_STATES.VERIFY_REGISTER_PIN;
        }
      } else {
        this.errors.push(result.getResponse()['mesasge']);
      }

      this.cd.detectChanges();
    });


  }

  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    this.user.state = this.state;
    this.authService.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.errors.push(result.getResponse()['error']['message']);
      }
      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
      this.cd.detectChanges();
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  register() {
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    this.user.state = this.state;
    this.authService.register(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;

      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.errors.push(result.getResponse()['error']['message']);
      }

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl("/dashboard");
        }, 500);
      }
      this.cd.detectChanges();
    });
  }

  forgetpin() {
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    this.user.state = AUTH_STATES.FORGET_PIN;
    this.authService.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      if (result.isSuccess()) {
        this.state = AUTH_STATES.VERIFY_FORGET_PIN;
        this.user['verification_id'] = result.getResponse()['verification_id'];

      } else {
        this.errors.push(result.getResponse()['error']['message']);
      }

      this.cd.detectChanges();
    });
  }

  verify() {
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    this.user.state = this.state;
    this.user.pin = parseInt(this.user.pin, 10);
    this.authService.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      if (result.isSuccess()) {
        if (result.getResponse()['success']) {
          if (this.state === AUTH_STATES.VERIFY_REGISTER_PIN)
            this.state = AUTH_STATES.REGISTER;
          if (this.state === AUTH_STATES.VERIFY_FORGET_PIN)
            this.state = AUTH_STATES.RESET_PASSWORD;
        } else {
          this.errors.push(result.getResponse()['error']['message']);
        }
      } else {
        this.errors.push(result.getResponse()['error']['message']);

      }

      this.cd.detectChanges();
    });


  }

  resetPassword() {
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    this.user.state = this.state;
    this.authService.resetPassword(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;

      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.errors = result.getErrors();
      }

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
      this.cd.detectChanges();
    });
  }
}
