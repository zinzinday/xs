import {Component, forwardRef, Inject} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RestProvider} from "../../../providers/rest/rest";
import {AuthProvider} from "../../../providers/auth/auth";
import {LoginPage} from "../login/login";
import {PhoneValidator} from "../../../utils/PhoneValidator";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  registerForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.compose([Validators.required, PhoneValidator])],
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  mask = '+09 000-000-0009';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              @Inject(forwardRef(() => RestProvider)) public rest: RestProvider,
              private fb: FormBuilder,
              private auth: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.auth.isLoggedIn.pipe().map(res => !res).toPromise();
  }

  doRegister() {
    if (this.registerForm.valid) {
      this.rest.register(this.registerForm.value).subscribe(res => {
        console.log(res);
        if (res.success) {
          this.rest.showToast('Xin chúc mừng! Bạn đã tạo thành công tài khoản!');
          this.goLogin();
        } else if (res.status === 422) {
          this.rest.setErrors(this.registerForm, res.errors);
          console.log(this.registerForm);
        } else {
          this.rest.showAlert('Lỗi', res.message);
        }
      })
    }

  }

  hasRequired(field: string): boolean {
    return this.registerForm.get(field).dirty && this.registerForm.get(field).hasError('required');
  }

  hasApiError(field: string): boolean {
    return this.registerForm.get(field).hasError('api');
  }

  apiErrorMessage(field: string): string {
    return this.registerForm.get(field).getError('api');
  }

  goLogin() {
    if (this.navCtrl.getPrevious()) {
      this.navCtrl.popTo(LoginPage).catch();
    } else {
      this.navCtrl.setRoot(LoginPage).catch();
    }
  }
}
