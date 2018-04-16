import { NgModule } from '@angular/core';
import { SecurityGraphComponent } from './securityGraph';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    //SecurityGraphComponent,
  ],
  imports: [
    IonicPageModule.forChild(SecurityGraphComponent),
  ],
})
export class SecurityGraphComponentModule {}
