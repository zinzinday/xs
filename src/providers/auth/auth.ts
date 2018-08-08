import {Injectable} from '@angular/core';
import {LocalStorageProvider} from "../storages/local-storage";
import {Observable} from "rxjs/Observable";
import {User} from "../../interface/user";
import {Credential} from "../../interface/credential";
import "rxjs/add/operator/map";

@Injectable()
export class AuthProvider {

  constructor(private storage: LocalStorageProvider) {

  }

  get isLoggedIn(): Observable<boolean> {
    return this.credential.pipe().map(res => !!res);
  }

  get phoneVerified(): Observable<boolean> {
    return this.profile.pipe().map(profile => {
      return !!profile.phoneVerified;
    })
  }

  get credential(): Observable<Credential> {
    return this.storage.getItem('credential');
  }

  set credential(data) {
    this.storage.setItem('credential', data);
  }

  get profile(): Observable<User> {
    return this.storage.getItem('profile');
  }

  set profile(data) {
    this.storage.setItem('profile', data);
  }

  signOut() {
    this.storage.removeItem('credential');
    this.storage.removeItem('profile');
  }

}
