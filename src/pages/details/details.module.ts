import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailsPage } from './details';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailsPage),
    TranslateModule
  ],
  exports: [
    DetailsPage
  ]
})
export class DetailsPageModule {}
