import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  registerForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, private toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  doRegister() {
    if (this.registerForm.valid) {
      this.toast.create({
        duration: 2000,
        message: 'Xin chúc mừng! Bạn đã tạo thành công tài khoản!'
      }).present().catch();
    }
  }

  goLogin() {
    this.navCtrl.pop().catch();
  }
}
