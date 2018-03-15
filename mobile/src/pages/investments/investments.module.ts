import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvestmentsPage } from './investments';

@NgModule({
  declarations: [
    InvestmentsPage,
  ],
  imports: [
    IonicPageModule.forChild(InvestmentsPage),
  ],
})
export class InvestmentsPageModule {}
