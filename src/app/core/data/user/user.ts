import {Injectable} from "@angular/core";

export interface User {
  username: string;
  first_name: string;
  last_name: string;
  role: string;
  balance: number;
  color: string;
}
@Injectable()
export abstract class UserData {
  abstract getUserProfile();
  abstract updateProfile(data);
}
