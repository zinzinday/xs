import {Component, forwardRef, Inject} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {City} from "../../../../interface/city";
import {RestProvider} from "../../../../providers/rest/rest";
import {Region} from "../../../../interface/region";
import {TicketType} from "../../../../interface/ticket-type";

@Component({
  selector: 'page-betting-type',
  templateUrl: 'ticket-type-form.html',
})
export class BettingTypePage {
  type: TicketType;
  typeId: string;
  cities: City[];
  region: string[];
  regions: Region[];
  typeForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    shortName: ['', Validators.required],
    cities: ['', Validators.required],
    rate: ['', Validators.required],
    lottoLength: [2, Validators.required],
    lottoPair: [0, Validators.required],
    mixParlay: [''],
    missAll: [''],
    lotteryOnly: [''],
  });


  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder,
              @Inject(forwardRef(() => RestProvider)) private rest: RestProvider) {
    this.type = this.navParams.get('type');
    if (this.type) {
      if (!this.type.lottoPair) {
        this.type.lottoPair = 0;
      }
      this.typeId = this.type.id;
      delete this.type.id;
      console.log(this.type);
      this.typeForm.setValue(this.type);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BettingTypePage');
    this.getRegions();
  }

  doCreate() {
    if (this.typeForm.valid) {
      if (this.typeId) {
        this.rest.updateType(this.typeId, this.typeForm.value).subscribe(res => {
          console.log(res);
        });
      } else {
        this.rest.createType(this.typeForm.value).subscribe(res => {
          console.log(res);
        });
      }
    }
  }


  getRegions() {
    return this.rest.listRegions().subscribe(regions => {
      this.regions = regions;
    })
  }

  setCities($event) {
    return this.rest.listCities({
      filter: {
        region: $event
      },
      sort: {
        region: 1,
      }
    }).subscribe(cities => {
      let citiesId = cities.map((v) => {
        return v.id;
      });
      this.typeForm.get('cities').setValue(citiesId);

      console.log(this.typeForm.get('cities').value);
    });
  }

  deleteType(typeId: string) {
    this.rest.deleteType(typeId).subscribe(console.log);
  }
}
