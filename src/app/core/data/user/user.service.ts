import {Injectable} from '@angular/core';
import {User, UserData} from './user';
import {HttpClient} from '@angular/common/http';
import {BACKEND} from "../../../const";

@Injectable({
  providedIn: 'root',
})
export class UserService extends UserData {

  constructor(private http: HttpClient) {
    super();
  }

  private user: User;

  getUserProfile() {
    return this.refreshProfile().then(res => {
      this.user = JSON.parse(localStorage.getItem('profile'));
      return this.user;
    });

  }

  setUserProfile(user: User) {
    this.user = user;
  }

  isAdmin() {
    return this.user.role === 'admin';
  }

  isLabUser() {
    return this.user.role === 'labuser';
  }

  isLabAdmin() {
    return this.user.role === 'labadmin';
  }

  isUser() {
    return this.user.role === 'user';

  }

  updateProfile(data) {
    return this.http.post(BACKEND + 'api/user/update', data).toPromise();
  }

  refreshProfile() {
    return this.http.get(BACKEND + 'api/user/get_profile').toPromise().then((res: any) => {
      this.user = {
        username: res['username'],
        first_name: res['first_name'],
        last_name: res['last_name'],
        role: res['role'],
        balance: res['balance'],
        color: res['color'],
      };
      localStorage.setItem('profile', JSON.stringify(this.user));
      return true;
    });
  }
}
