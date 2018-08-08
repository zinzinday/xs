import {AfterViewInit, Component, Input, OnChanges} from '@angular/core';
import {RestProvider} from "../../../providers/rest/rest";
import {Award} from "../../../interface/award";

@Component({
  selector: 'page-city-result',
  templateUrl: 'city-result.html',
})
export class CityResultPage implements AfterViewInit, OnChanges {
  @Input() city: string;
  @Input() region: string;
  @Input() date: string;
  result: any = {};
  cityName: string;

  constructor(private rest: RestProvider) {
  }

  ngOnChanges(change: any) {
    if (change.hasOwnProperty('city')) {
      this.city = change.city.currentValue;
    }
    if (change.hasOwnProperty('date')) {
      this.date = change.date.currentValue;
    }
    this.getResult();
  }

  ngAfterViewInit(): void {
    this.getResult();
  }

  getResult() {
    this.rest.result({
      filter: {
        city: this.city,
        awardDate: this.date
      },
      sort: {
        position: 1
      }
    }).subscribe((res: Award[]) => {
      this.result = {};
      if (res.length) {
        this.cityName = res[0].city.name;
        for (let award of res) {
          this.result['position_' + award.position] = award.lotto;
        }
      }
    })
  }
}
