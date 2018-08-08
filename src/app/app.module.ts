import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/accounts/login/login";
import {RegisterPage} from "../pages/accounts/register/register";
import {SettingPage} from "../pages/accounts/setting/setting";
import {RestProvider} from '../providers/rest/rest';
import {AuthProvider} from '../providers/auth/auth';
import {LocalStorageProvider} from '../providers/storages/local-storage';
import {IndexDbProvider} from '../providers/storages/index-db';
import {HttpClientModule} from "@angular/common/http";
import {CitiesPage} from "../pages/results/cities/cities";
import {Keyboard} from "@ionic-native/keyboard";
import {Network} from "@ionic-native/network";
import {RegionPage} from "../pages/results/region/region";
import {CityResultPage} from "../pages/results/city-result/city-result";
import {ProfilePage} from "../pages/accounts/profile/profile";
import {WalletPage} from "../pages/banking/wallet/wallet";
import {DepositPage} from "../pages/banking/deposit/deposit";
import {WithdrawalPage} from "../pages/banking/withdrawal/withdrawal";
import {BettingCreatePage} from "../pages/betting/betting-create/betting-create";
import {BettingHistoryPage} from "../pages/betting/betting-history/betting-history";
import {BettingTypePage} from "../pages/betting/types/forms/ticket-type-form";
import {BettingTypesPage} from "../pages/betting/types/list/ticket-type-list";
import {IonMaskModule} from '@pluritech/ion-mask';
import {RecoverPage} from "../pages/accounts/recover/recover";
import {TransactionPage} from "../pages/banking/transaction/transaction";
import {SupportPage} from "../pages/support/support";
import {PhoneVerifyPage} from "../pages/accounts/phone-verify/phone-verify";
import {EmailVerifyPage} from "../pages/accounts/email-verify/email-verify";
import {NavigationBar} from "@ionic-native/navigation-bar";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    RecoverPage,
    ProfilePage,
    EmailVerifyPage,
    PhoneVerifyPage,
    SettingPage,
    WalletPage,
    DepositPage,
    WithdrawalPage,
    TransactionPage,
    BettingCreatePage,
    BettingHistoryPage,
    BettingTypePage,
    BettingTypesPage,
    CitiesPage,
    RegionPage,
    CityResultPage,
    SupportPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: "",
      scrollPadding: false,
      scrollAssist: false
    }),
    HttpClientModule,
    IonMaskModule.forRoot()
  ],
  bootstrap: [IonicApp],

  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    RecoverPage,
    ProfilePage,
    PhoneVerifyPage,
    EmailVerifyPage,
    SettingPage,
    WalletPage,
    DepositPage,
    TransactionPage,
    WithdrawalPage,
    BettingCreatePage,
    BettingHistoryPage,
    BettingTypePage,
    BettingTypesPage,
    CitiesPage,
    RegionPage,
    CityResultPage,
    SupportPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    Network,
    NavigationBar,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    AuthProvider,
    LocalStorageProvider,
    IndexDbProvider
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
