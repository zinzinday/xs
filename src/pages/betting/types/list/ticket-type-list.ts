import {Component} from '@angular/core';
import {NavController, NavParams, Refresher} from 'ionic-angular';
import {BettingTypePage} from "../forms/ticket-type-form";
import {RestProvider} from "../../../../providers/rest/rest";
import {TicketType} from "../../../../interface/ticket-type";

@Component({
  selector: 'page-betting-types',
  templateUrl: 'ticket-type-list.html',
})
export class BettingTypesPage {
  types: TicketType[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private rest: RestProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BettingTypesPage');
    this.getTypes();
  }

  getTypes() {
    this.rest.listTypes().subscribe(types => {
      this.types = types;
    })
  }

  goType(type: TicketType) {
    this.navCtrl.push(BettingTypePage, {type: type}).catch();
  }

  doRefresh(refresher: Refresher) {
    setTimeout(() => {
      this.getTypes();
      refresher.complete();
    }, 2000);
  }

  goCreate() {
    this.navCtrl.push(BettingTypePage).catch();
  }
}
