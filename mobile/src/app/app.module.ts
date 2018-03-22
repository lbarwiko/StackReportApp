import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestapiProvider } from '../providers/restapi/restapi';
import { UserService, FundService, AuthService, EndpointService, FollowingService, SecurityService, PredictionService } from '../services/main';
import { IonicStorageModule } from '@ionic/storage';
import { ChartsModule } from 'ng2-charts';


import { 
    RootPage,
    AboutPage,
    HomePage,
    RegisterPage,
    UserPage,
    TestPage,
    TabsPage,
    LoginPage,
    SecurityPage,
    TopFundsPage,
    MainDashboardPage,
    InvestmentsPage,
    ReportsPage,
    RegionalfundsPage
    } from '../pages/main'

import {
  PreviewComponent,
  SecurityGraphComponent,
  NavBarComponent
} from '../components/main'

@NgModule({
  declarations: [
    MyApp,
    RootPage,
    AboutPage,
    UserPage,
    HomePage,
    RegisterPage,
    TabsPage,
    TestPage,
    LoginPage,
    SecurityPage,
    TopFundsPage,
    RegionalfundsPage,
    InvestmentsPage,
    ReportsPage,
    PreviewComponent,
    SecurityGraphComponent,
    MainDashboardPage,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RootPage,
    AboutPage,
    UserPage,
    HomePage,
    RegisterPage,
    TabsPage,
    TestPage,
    LoginPage,
    SecurityPage,
    TopFundsPage,
    MainDashboardPage,
    ReportsPage,
    InvestmentsPage,
    RegionalfundsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
    FundService,
    RestapiProvider,
    AuthService,
    EndpointService,
    FollowingService,
    PredictionService,
    SecurityService
  ]
})
export class AppModule {}
