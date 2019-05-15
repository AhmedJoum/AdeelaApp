import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusPage } from './bus';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    BusPage,
  ],
  imports: [
    IonicPageModule.forChild(BusPage),
    TranslateModule
  ],
  exports: [
    BusPage
  ]
})
export class BusPageModule {}
