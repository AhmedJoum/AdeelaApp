import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Seats2Page } from './seats2';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    Seats2Page,
  ],
  imports: [
    IonicPageModule.forChild(Seats2Page),
    TranslateModule
  ],
})
export class Seats2PageModule {}
