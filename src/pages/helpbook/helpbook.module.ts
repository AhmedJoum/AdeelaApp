import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HelpbookPage } from './helpbook';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    HelpbookPage,
  ],
  imports: [
    IonicPageModule.forChild(HelpbookPage),
    TranslateModule
  ],
})
export class HelpbookPageModule {}
