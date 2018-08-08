import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AuthProvider} from "../../../providers/auth/auth";
import {User} from "../../../interface/user";
import {RestProvider} from "../../../providers/rest/rest";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiResponse} from "../../../interface/api-response";

@Component({
  selector: 'page-phone-verify',
  templateUrl: 'phone-verify.html',
})
export class PhoneVerifyPage {
  profile: User;
  verifyForm: FormGroup = this.fb.group({
    verifyCode: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
  });
  verifyType: string;

  authyForm: FormGroup = this.fb.group({
    verifyCode: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
  });
  smsRequested = true;
  smsForm: FormGroup = this.fb.group({
    verifyCode: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
  });
  phoneRequested = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider, private rest: RestProvider, private fb: FormBuilder) {
    this.profile = this.navParams.get('profile');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhoneVerifyPage');
  }


  smsRequest(type: string) {
    this.rest.requestPhone(type).subscribe((res) => {
      if (res.success) {
        this.smsRequested = true;
      }
    });
  }


  doVerify() {
    if (this.verifyForm.valid) {
      this.rest.confirmPhone(this.verifyForm.value).subscribe(res => {
        if (res.success) {
          this.navCtrl.pop().catch();
        }
      });
    }
  }

  doVerifyAuthy() {
    if (this.authyForm.valid) {
      let loading = this.rest.createLoading('Đang xác nhận ...');
      loading.present().catch();
      this.rest.authyVerify(this.authyForm.value).subscribe((res) => {
        loading.dismissAll();
        console.log(res);
        if (res.success) {
          if (res.data.profile) {
            this.auth.profile = res.data.profile;
            this.profile = res.data.profile;
          }
          this.rest.showToast('Xác nhận Authy thành công.');
          this.navCtrl.pop().catch();
        } else if (res.status === 422) {
          this.rest.setErrors(this.authyForm, res.errors);
        } else {
          this.rest.showAlert('Lỗi', res.message);
        }
      });
    }
  }

  authyRegister() {
    if (!this.profile.authyId) {
      this.rest.authRegister().subscribe((res: ApiResponse) => {
        if (res.success) {
          this.profile = res.data.profile;
        } else {
          this.rest.showAlert('Lỗi', res.message);
        }
      })
    }
  }
}
