import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MethodsPage } from './methods';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    MethodsPage,
  ],
  imports: [
    IonicPageModule.forChild(MethodsPage),
    TranslateModule
  ],
})
export class MethodsPageModule {}
