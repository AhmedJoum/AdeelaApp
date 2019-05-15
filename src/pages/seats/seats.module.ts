import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeatsPage } from './seats';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SeatsPage,
  ],
  imports: [
    IonicPageModule.forChild(SeatsPage),
    TranslateModule
  ],
  exports: [
    SeatsPage
  ]
})
export class SeatsPageModule {}
