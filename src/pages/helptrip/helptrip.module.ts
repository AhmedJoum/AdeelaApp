import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HelptripPage } from './helptrip';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    HelptripPage,
  ],
  imports: [
    IonicPageModule.forChild(HelptripPage),
    TranslateModule
  ],
})
export class HelptripPageModule {}
