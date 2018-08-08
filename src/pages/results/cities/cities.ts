import {Component, forwardRef, Inject} from '@angular/core';
import {NavController} from 'ionic-angular';
import {RestProvider} from "../../../providers/rest/rest";
import {City} from "../../../interface/city";

@Component({
  selector: 'page-cities',
  templateUrl: 'cities.html',
})
export class CitiesPage {
  citiesMB: City[];
  citiesMT: City[];
  citiesMN: City[];
  weeks = ['Chủ nhât', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

  constructor(public navCtrl: NavController,
              @Inject(forwardRef(() => RestProvider)) private rest: RestProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CitiesPage');
    this.listCitiesMB();
    this.listCitiesMT();
    this.listCitiesMN();
  }

  listCitiesMB() {
    this.rest.listCities({
      sort: {
        dayOfWeek: 1
      },
      filter: {
        region: 'mien-bac'
      }
    }).subscribe(cities => {
      this.citiesMB = cities;
    });
  }

  listCitiesMT() {
    this.rest.listCities({
      sort: {
        dayOfWeek: 1
      },
      filter: {
        region: 'mien-trung'
      }
    }).subscribe(cities => {
      this.citiesMT = cities;
    });
  }

  listCitiesMN() {
    this.rest.listCities({
      sort: {
        dayOfWeek: 1
      },
      filter: {
        region: 'mien-nam'
      }
    }).subscribe(cities => {
      this.citiesMN = cities;
    });
  }
}
