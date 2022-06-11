import {NbAuthOAuth2JWTToken} from '@nebular/auth';


export class AcobAuthOAuth2JWTToken extends NbAuthOAuth2JWTToken {

  getValue(): string {
    return this.token.access;
  }

  setRefreshToken(refreshToken: string) {
    this.token.refresh = refreshToken;
  }

  getRefreshToken(): string {
    return this.token.refresh;
  }
}
