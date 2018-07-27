import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LoginPage} from "../accounts/login/login";
import {SettingPage} from "../accounts/setting/setting";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goLogin() {
    this.navCtrl.push(LoginPage).catch();
  }

  goSetting() {
    this.navCtrl.push(SettingPage).catch();
  }
}
