import {Component, forwardRef, Inject} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Region} from "../../../interface/region";
import {RestProvider} from "../../../providers/rest/rest";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {City} from "../../../interface/city";
import {TicketType} from "../../../interface/ticket-type";
import {UniquePairValidator} from "../../../utils/UniquePairValidator";
import {LottoPairValidator} from "../../../utils/LottoPairValidator";
import {LottoLengthValidator} from "../../../utils/LottoLengthValidator";

@Component({
  selector: 'page-betting-create',
  templateUrl: 'betting-create.html',
})
export class BettingCreatePage {
  regions: Region[];
  cities: City[];
  ticketTypes: TicketType[];
  stopDateHours = 11;
  ticketForm: FormGroup = this.fb.group({
    awardDate: [this.minimumBetDate, Validators.required],
    region: ['mien-bac', Validators.required],
    city: ['', Validators.required],
    ticketType: ['', Validators.required],
    lotto: ['', Validators.compose([Validators.required, UniquePairValidator])],
    betAmount: ['', Validators.compose([Validators.required, Validators.min(10)])],
    rate: ['']
  });

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private fb: FormBuilder,
              @Inject(forwardRef(() => RestProvider)) private rest: RestProvider) {
  }

  ionViewDidLoad() {
    this.getRegions();
    this.getCities();
  }

  get minimumBetDate() {
    let now = new Date();
    let stop = new Date();
    stop.setUTCHours(this.stopDateHours);
    stop.setUTCMinutes(0);
    stop.setUTCSeconds(0);
    if (now.getTime() >= stop.getTime()) {
      now.setDate(now.getDate() + 1);
    }
    let min = now;
    let minMonth = ('0' + (min.getMonth() + 1)).slice(-2);
    let minDay = ('0' + min.getDate()).slice(-2);
    return min.getFullYear() + '-' + minMonth + '-' + minDay;
  }

  getRegions() {
    return this.rest.listRegions().subscribe(regions => {
      this.regions = regions;
    })
  }

  onChangeRegion() {
    this.ticketForm.get('city').reset();
    this.cities = [];
    this.ticketForm.get('ticketType').reset();
    this.ticketTypes = [];
    switch (this.ticketForm.get('region').value) {
      case 'mien-bac':
        this.stopDateHours = 11;
        break;
      case 'mien-trung':
        this.stopDateHours = 10;
        break;
      case 'mien-nam':
        this.stopDateHours = 9;
        break;
    }
    this.ticketForm.get('awardDate').reset();
  }

  onDateChange() {
    this.getCities();
  }

  onChangeCity() {
    this.getTypes();
    this.ticketForm.get('ticketType').reset();
  }

  onChangeType() {
    if (this.type) {
      this.ticketForm.get('rate').setValue(this.type.rate);
      this.ticketForm.get('lotto').setValidators(Validators.compose([
        Validators.required,
        UniquePairValidator,
        LottoLengthValidator(this.type.lottoLength),
        LottoPairValidator(this.type.lottoPair)
      ]));
      this.ticketForm.get('lotto').reset();
    }
  }

  get dayOfWeek() {
    if (this.ticketForm.get('awardDate').valid) {
      return new Date(this.ticketForm.get('awardDate').value).getDay();
    }
  }

  getCities() {
    let regionId = this.ticketForm.get('region').value;
    if (regionId) {
      return this.rest.listCities({
        filter: {
          region: regionId,
          dayOfWeek: this.dayOfWeek
        }
      }).subscribe(cities => {
        this.cities = cities;
        if (regionId === 'mien-bac' && cities.length) {
          this.ticketForm.get('city').setValue(cities[0].id);
          this.getTypes();
        }
      });
    }

  }


  getTypes() {
    return this.rest.listTypes({
      filter: {
        cities: this.ticketForm.get('city').value,
      }
    }).subscribe(types => {
      this.ticketTypes = types;
    });
  }

  doTicket() {
    if (this.ticketForm.valid) {
      this.rest.createTicket(this.ticketForm.value).subscribe(res => {

      });
    }
  }


  get type(): TicketType {
    let typeId = this.ticketForm.get('ticketType').value;
    if (typeId && this.ticketTypes.length) {
      for (let type of this.ticketTypes) {
        if (typeId === type.id) {
          return type;
        }
      }
    }
    return null;
  }

  get mask() {
    if (this.type) {
      let firstLotto = '000'.slice(0, this.type.lottoLength);
      let optionLotto = (this.type.lottoPair !== 0 ? '000' : '999').slice(0, this.type.lottoLength);
      let mask = [firstLotto];
      let max = this.type.lottoPair ? this.type.lottoPair : 10;
      for (let i = 1; i < max; i++) {
        mask.push(optionLotto);
      }
      return mask.join('-');
    }
    return '';
  }

  get maskPlaceholder() {
    if (this.type) {
      let pair = 'xxx'.slice(0, this.type.lottoLength);
      let mask = [pair];
      let max = this.type.lottoPair ? this.type.lottoPair : 10;
      for (let i = 1; i < max; i++) {
        mask.push(pair);
      }
      return mask.join('-');
    }
    return '';
  }

  hasRequired(field): boolean {
    return this.ticketForm.get(field).dirty && this.ticketForm.get(field).hasError('required');
  }

  get rateDescription() {
    if (this.ticketForm.valid) {
      let group = this.ticketForm;
      let des = 'Tiền thắng ước tính';
      let pair = group.get('lotto').value;
      let pairs = pair.toString().split('-').length;
      let repeat = '';
      let lottoLength = this.type.lottoLength;
      let amount = group.get('betAmount').value;
      if (this.type.mixParlay) {
        if (this.type.missAll) {
          des += ' nếu trượt tất cả các bộ số ' + pair + ` so với ${lottoLength} số cuối của tất cả các giải`;
        } else {
          des += ' nếu trúng tất cả các bộ số ' + pair + ` so với ${lottoLength} số cuối của tất cả các giải`;
        }
      } else {
        if (this.type.lotteryOnly) {
          des += ' nếu trúng' + (pairs !== 0 ? ' một trong các' : '') + ' bộ số ' + pair + ` so với ${lottoLength} số cuối của giải đặc biệt`;
        } else {
          des += ' nếu trúng tổng số nháy (tsn) của' + (pairs !== 1 ? ' các' : '') + ' bộ số ' + pair + ` so với ${lottoLength} số cuối của tất cả các giải`;
          repeat = ' x tsn';
        }
        amount += pairs !== 1 ? ' : ' + pairs : '';
      }

      let rate = this.type.rate;
      des += ' là: ' + amount + ' x ' + rate + repeat;

      return des;
    }
    return null;
  }


}
