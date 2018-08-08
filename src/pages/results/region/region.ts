import {Component, forwardRef, Inject, OnChanges, SimpleChanges} from '@angular/core';
import {NavController} from 'ionic-angular';
import {RestProvider} from "../../../providers/rest/rest";
import {City} from "../../../interface/city";

@Component({
  selector: 'page-region',
  templateUrl: 'region.html',
})
export class RegionPage implements OnChanges {
  regionId: string = 'mien-bac';
  currentTime;
  currentDate: string = this.getDefaultCalendar(new Date);
  currentMinDate = this.getDefaultCalendar(new Date(2010, 1, 1));
  currentMaxDate = this.getDefaultCalendar(new Date());
  cityNameMB: string;
  citiesMT: City[] = [];
  cityIdMT: string;
  citiesMN: City[] = [];
  cityIdMN: string;
  mb: any = {};

  constructor(public navCtrl: NavController,
              @Inject(forwardRef(() => RestProvider)) private rest: RestProvider) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ionViewDidLoad() {
    this.onChangeDate();
  }

  private resultMB() {
    this.rest.result({
      filter: {
        region: 'mien-bac',
        awardDate: this.currentDate,
      },
      limit: 27,
      skip: 0,
      sort: {
        position: 1
      }
    }).subscribe(res => {
      this.mb = {};
      this.cityNameMB = null;
      if (res.length) {
        this.cityNameMB = res[0].city.name;
        for (let award of res) {
          this.mb['p' + award.position] = award.lotto;
        }
      }
    });
  }

  listCitiesMT() {
    this.rest.listCities({
      filter: {
        region: 'mien-trung',
        dayOfWeek: this.getDayOfWeek()
      },
      sort: {
        id: 1
      }
    }).subscribe(res => {
      this.citiesMT = res;
      if (res.length) {
        this.cityIdMT = res[0].id;
      }
    });
  }

  listCitiesMN() {
    this.rest.listCities({
      filter: {
        region: 'mien-nam',
        dayOfWeek: this.getDayOfWeek()
      },
      sort: {
        id: 1
      }
    }).subscribe(res => {
      this.citiesMN = res;
      if (res.length) {
        this.cityIdMN = res[0].id;
      }
    })
  }

  onChangeDate(event?) {
    if (event) {
      this.currentTime = new Date(event.year, event.month - 1, event.day);
    }
    this.resultMB();
    this.listCitiesMT();
    this.listCitiesMN();
  }

  private getUTCSecondsOffset(date): number {
    return date.getUTCHours() * 3600 + date.getUTCMinutes() * 60 + date.getUTCSeconds();
  }

  private getDayOfWeek() {
    return new Date(this.currentDate).getUTCDay();
  }

  private getDefaultCalendar(date) {
    let offset = this.getUTCSecondsOffset(date);
    if (offset <= 33300) {
      date = new Date(date.getTime() - 86400 * 1000);
    }
    let dateDay = ('0' + date.getDate()).slice(-2);
    let dateMonth = ('0' + (date.getMonth() + 1)).slice(-2);
    return date.getUTCFullYear() + '-' + dateMonth + '-' + dateDay;
  }

  get currentDateLabel() {
    let weeks = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    let months = ['tháng 1', 'tháng 2', 'tháng 3', 'tháng 4', 'tháng 5', 'tháng 6', 'tháng 7', 'tháng 8', 'tháng 9', 'tháng 10', 'tháng 11', 'tháng 12'];
    let date = new Date(this.currentDate);
    let dateDay = ('0' + date.getUTCDate()).slice(-2);
    let dateMonth = months[date.getUTCMonth()];
    return weeks[date.getUTCDay()] + ', ngày ' + dateDay + ' ' + dateMonth + ' ' + date.getUTCFullYear();
  }


  prevDate() {
    let cur = this.toUTC(new Date(this.currentDate));
    cur.setDate(cur.getDate() - 1);
    this.currentDate = this.getDefaultCalendar(cur);
  }

  nextDate() {
    let cur = this.toUTC(new Date(this.currentDate));
    cur.setDate(cur.getDate() + 1);
    if (cur.getTime() <= new Date().getTime()) {
      this.currentDate = this.getDefaultCalendar(cur);
    }

  }

  private toUTC(date) {
    let newDate = new Date();
    newDate.setTime(date.getTime() + (date.getTimezoneOffset() * 60 * 1000));
    return newDate;
  }
}
