import {NbAuthStrategyOptions, NbAuthTokenClass} from '@nebular/auth';

export declare class AcobOAuthStategyOptions extends NbAuthStrategyOptions {
  baseEndpoint?: string;
  redirect?: {
    success?: string;
    failure?: string;
  };
  defaultErrors?: any[];
  defaultMessages?: any[];
  token?: {
    endpoint?: string;
    redirectUri?: string;
    requireValidToken?: boolean;
    class: NbAuthTokenClass;
  };
  refresh?: {
    endpoint?: string;
    requireValidToken?: boolean;
  };
  register?: {
    endpoint?: string,
    redirectUri?: string;
    fetchUserProfile?: boolean;
    userProfileEndPoint?: string;
  };
  checkusername?: {
    endpoint?: string;
  };
  verifypin?: {
    endpoint?: string;
  };
  completeregister?: {
    endpoint?: string;

  };
  forgetpin?: {
    endpoint?: string;
  };
  resetpassword?: {
    endpoint?: string;
  };
  logout?: {
    endpoint?: string;
  };
}
