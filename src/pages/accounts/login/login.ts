import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {of} from "rxjs/observable/of";
import {Observable} from "rxjs/Observable";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegisterPage} from "../register/register";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  lockingForm: FormGroup = this.fb.group({
    user: ['', Validators.required]
  });
  step = 1;

  isPhone = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewCanEnter(): Observable<boolean> {
    console.log('ionViewCanEnter LoginPage');
    return of(true);
  }

  doLocking() {
    if (this.lockingForm.valid) {
      console.log('submitted');
    }
  }

  goRegister() {
    this.navCtrl.push(RegisterPage).catch();
  }
}
