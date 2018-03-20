import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestapiProvider } from '../providers/restapi/restapi';
import { UserService, FundService, AuthService, EndpointService } from '../services/main';
import { IonicStorageModule } from '@ionic/storage';
import { ChartsModule } from 'ng2-charts';

import { 
    AboutPage,
    HomePage,
    RegisterPage,
    UserPage,
    TestPage,
    TabsPage,
    LoginPage,
    SecurityPage
    } from '../pages/main'

import {
  PreviewComponent,
  SecurityGraphComponent,
} from '../components/main'

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    UserPage,
    HomePage,
    RegisterPage,
    TabsPage,
    TestPage,
    LoginPage,
    SecurityPage,
    PreviewComponent,
    SecurityGraphComponent
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
    AboutPage,
    UserPage,
    HomePage,
    RegisterPage,
    TabsPage,
    TestPage,
    LoginPage,
    SecurityPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
    FundService,
    RestapiProvider,
    AuthService,
    EndpointService
  ]
})
export class AppModule {}
