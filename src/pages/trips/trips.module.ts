import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TripsPage } from './trips';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TripsPage,
  ],
  imports: [
    IonicPageModule.forChild(TripsPage),
    TranslateModule
  ],
})
export class TripsPageModule {}
