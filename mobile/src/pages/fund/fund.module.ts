import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FundPage } from './fund';

@NgModule({
  declarations: [
    FundPage,
  ],
  imports: [
    IonicPageModule.forChild(FundPage),
  ],
})
export class FundPageModule {}
