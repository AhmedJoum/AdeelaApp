import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PasswordPage } from './password';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(PasswordPage),
    TranslateModule
  ],
  exports: [
    PasswordPage
  ]
})
export class PasswordPageModule {}
