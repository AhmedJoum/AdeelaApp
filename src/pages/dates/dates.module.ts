import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DatesPage } from './dates';

import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    DatesPage,
  ],
  imports: [
    IonicPageModule.forChild(DatesPage),
    TranslateModule
  ],
})
export class DatesPageModule {}
