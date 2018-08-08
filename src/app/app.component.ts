import {Component, ViewChild} from '@angular/core';
import {Keyboard, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {AuthProvider} from "../providers/auth/auth";
import {LoginPage} from "../pages/accounts/login/login";
import {RegisterPage} from "../pages/accounts/register/register";
import {Observable} from "rxjs/Observable";
import {Network} from "@ionic-native/network";
import {RegionPage} from "../pages/results/region/region";
import {ProfilePage} from "../pages/accounts/profile/profile";
import {SettingPage} from "../pages/accounts/setting/setting";
import {WalletPage} from "../pages/banking/wallet/wallet";
import {BettingCreatePage} from "../pages/betting/betting-create/betting-create";
import {BettingHistoryPage} from "../pages/betting/betting-history/betting-history";
import {BettingTypesPage} from "../pages/betting/types/list/ticket-type-list";
import {PhoneVerifyPage} from "../pages/accounts/phone-verify/phone-verify";
import {User} from "../interface/user";
import {NavigationBar} from "@ionic-native/navigation-bar";

interface LinkOption {
  title: string,
  component: any,
  icon?: string,
  items?: LinkOption[]
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  profile: User;
  disconnected: boolean = false;


  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public keyboard: Keyboard,
              private network: Network,
              private navigationBar: NavigationBar,
              private auth: AuthProvider) {
    this.initializeApp();
    this.network.onchange().subscribe(networkEvent => {
      if (networkEvent.type === 'online') {
        this.disconnected = false;
      } else {
        this.disconnected = true;
      }
    });
    this.auth.profile.subscribe(profile => {
      this.profile = profile;
    });
  }

  get pages(): Observable<LinkOption[]> {
    return this.auth.isLoggedIn.pipe().map(is => {
      if (is) {
        return [
          {title: 'Kết quả', component: RegionPage, icon: 'analytics'},
          {title: 'Tạo vé số', component: BettingCreatePage, icon: 'add'},
          {title: 'Loại vé cược', component: BettingTypesPage, icon: 'list'},
          {title: 'Lịch sử đặt cược', component: BettingHistoryPage, icon: 'stats'},
          {title: 'Hồ sơ cá nhân', component: ProfilePage, icon: 'contact'},
          {title: 'Cài đặt', component: SettingPage, icon: 'settings'},
          {title: 'Tài chính', component: WalletPage, icon: 'cash'},
          {title: 'Đăng xuất', component: 'logout', icon: 'log-out'}
        ];
      } else {
        return [
          {title: 'Đăng nhập', component: LoginPage, icon: 'log-in'},
          {title: 'Mở tài khoản', component: RegisterPage, icon: 'person-add'}
        ]
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.hide();
      this.statusBar.backgroundColorByHexString('#0D47A1');
      this.splashScreen.hide();
      if (this.platform.is('android')) {
        this.navigationBar.setUp(true);
      }
      this.keyboard.hideFormAccessoryBar(true);
      this.platform.registerBackButtonAction(() => {
        if (this.nav.getPrevious()) {
          this.nav.pop({duration: 800}).catch();
        }
      });
    });
  }


  openPage(page) {
    if (page.component === 'logout') {
      this.logout();
    } else {
      this.nav.setRoot(page.component, {}, {duration: 500}).catch();
    }
  }

  private logout() {
    this.auth.signOut();
    this.nav.setRoot(LoginPage, {}, {duration: 800}).catch();
  }

  goVerify() {
    this.nav.setRoot(PhoneVerifyPage, {profile: this.profile}, {duration: 600}).catch()
  }
}
