import {Component, forwardRef, Inject} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegisterPage} from "../register/register";
import {RestProvider} from "../../../providers/rest/rest";
import {AuthProvider} from "../../../providers/auth/auth";
import "rxjs/add/operator/map";
import {HomePage} from "../../home/home";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  lookupForm: FormGroup = this.fb.group({
    user: ['', Validators.required]
  });
  userExist: any = false;
  userId: string;

  loginForm: FormGroup = this.fb.group({
    userId: [this.userId, Validators.required],
    password: ['', Validators.required],
  });


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private fb: FormBuilder,
              private auth: AuthProvider,
              @Inject(forwardRef(() => RestProvider)) public rest: RestProvider) {
  }

  ionViewDidLoad() {
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.auth.isLoggedIn.pipe().map(res => !res).toPromise();
  }

  doLookup() {
    if (this.lookupForm.valid) {
      this.rest.lookup(this.lookupForm.value).subscribe(res => {
        if (res.success) {
          this.userExist = res.data;
          this.userId = res.data.id;
        } else if (res.status === 422) {
          this.rest.setErrors(this.lookupForm, res.errors);
        } else {
          this.rest.showAlert('Lỗi', res.message);
        }
      });
    }
  }

  doLogin() {
    this.loginForm.get('userId').setValue(this.userId);
    if (this.loginForm.valid) {
      this.rest.login(this.loginForm.value).subscribe(res => {
        if (res.success) {
          this.rest.showToast('Đăng nhập thành công!');
          this.auth.credential = res.data.credential;
          this.auth.profile = res.data.profile;
          this.goBack();
        } else if (res.status === 422) {
          this.rest.setErrors(this.loginForm, res.errors);
        } else {
          this.rest.showAlert('Lỗi', res.message);
        }
      });
    } else {
      console.log(this.loginForm.value);
    }
  }

  goRecover() {

  }

  goBack() {
    if (this.navCtrl.getPrevious()) {
      this.navCtrl.pop({duration: 800}).catch();
    } else {
      this.navCtrl.setRoot(HomePage, {}, {
        duration: 800
      }).catch();
    }
  }

  goRegister() {
    this.navCtrl.push(RegisterPage).catch();
  }

  hasRequired(form: FormGroup, field: string): boolean {
    return form.get(field).dirty && form.get(field).hasError('required');
  }

  hasApiError(form: FormGroup, field: string): boolean {
    return form.get(field).hasError('api');
  }

  apiErrorMessage(form: FormGroup, field: string): string {
    return form.get(field).getError('api');
  }
}
