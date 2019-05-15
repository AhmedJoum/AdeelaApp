import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SummaryPage } from './summary';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(SummaryPage),
    TranslateModule
  ],
  exports: [
    SummaryPage
  ]
})
export class SummaryPageModule {}
