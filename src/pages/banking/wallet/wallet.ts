import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {DepositPage} from "../deposit/deposit";
import {WithdrawalPage} from "../withdrawal/withdrawal";

/**
 * Generated class for the WalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html',
})
export class WalletPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletPage');
  }

  goDeposit() {
    this.navCtrl.push(DepositPage, {}, {duration: 800}).catch();
  }

  goWithdrawal() {
    this.navCtrl.push(WithdrawalPage, {}, {duration: 800}).catch();
  }
}
