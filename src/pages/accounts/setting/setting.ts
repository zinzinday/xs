import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AuthProvider} from "../../../providers/auth/auth";
import {LoginPage} from "../login/login";
import "rxjs/add/operator/map";

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  constructor(public navCtrl: NavController, public auth: AuthProvider) {
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.auth.isLoggedIn.toPromise();
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave');
    this.navCtrl.push(LoginPage).catch();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

}
