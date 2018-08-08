import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';


@Component({
  selector: 'page-betting-history',
  templateUrl: 'betting-history.html',
})
export class BettingHistoryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BettingHistoryPage');
  }
}
