import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestapiProvider } from '../providers/restapi/restapi';
import { UserService, FundService, AuthService, EndpointService, FollowingService, 
         SecurityService, PredictionService, HoldingService, TierService } from '../services/main';
import { IonicStorageModule } from '@ionic/storage';
import { ChartsModule } from 'ng2-charts';


import { 
    RootPage,
    AboutPage,
    HomePage,
    RegisterPage,
    UserPage,
    TabsPage,
    LoginPage,
    SecurityPage,
    AllFundsPage,
    AddFundsPage,
    MenuPage,
    InvestmentsPage,
    ReportsPage,
    } from '../pages/main'

import {
  PreviewComponent,
  SecurityGraphComponent,
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
    LoginPage,
    SecurityPage,
    AllFundsPage,
    AddFundsPage,
    InvestmentsPage,
    ReportsPage,
    PreviewComponent,
    SecurityGraphComponent,
    MenuPage,
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
    LoginPage,
    SecurityPage,
    AllFundsPage,
    AddFundsPage,
    MenuPage,
    ReportsPage,
    InvestmentsPage,
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
    SecurityService,
    HoldingService,
    TierService
  ]
})
export class AppModule {}
