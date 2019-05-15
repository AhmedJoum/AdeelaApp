import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgencyPage } from './agency';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AgencyPage,
  ],
  imports: [
    IonicPageModule.forChild(AgencyPage),
    TranslateModule
  ],
  exports: [
    AgencyPage
  ]
})
export class AgencyPageModule {}
