import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AuthProvider} from "../../../providers/auth/auth";
import {User} from "../../../interface/user";
import {PhoneVerifyPage} from "../phone-verify/phone-verify";
import {EmailVerifyPage} from "../email-verify/email-verify";


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  profile: User;

  constructor(public navCtrl: NavController, private auth: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.getProfile();
  }

  getProfile() {
    this.auth.profile.subscribe(profile => {
      this.profile = profile;
    })
  }

  ionViewCanEnter() {
    return this.auth.isLoggedIn.toPromise();
  }


  goPhoneVerify() {
    this.navCtrl.push(PhoneVerifyPage, {profile: this.profile}, {duration: 800}).catch()
  }

  goEmailVerify() {
    this.navCtrl.push(EmailVerifyPage, {profile: this.profile}, {duration: 800}).catch()
  }
}
