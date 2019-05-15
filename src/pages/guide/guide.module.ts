import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuidePage } from './guide';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    GuidePage,
  ],
  imports: [
    IonicPageModule.forChild(GuidePage),
    TranslateModule
  ],
})
export class GuidePageModule {}
