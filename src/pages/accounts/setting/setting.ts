import {Component, forwardRef, Inject} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AuthProvider} from "../../../providers/auth/auth";
import {RestProvider} from "../../../providers/rest/rest";
import {LoginPage} from "../login/login";
import "rxjs/add/operator/map";

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  constructor(public navCtrl: NavController, public auth: AuthProvider,
              @Inject(forwardRef(() => RestProvider)) private rest: RestProvider) {
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
