import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
declare var $:any;

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  language: any = localStorage.getItem('Language');
  tab1Root = 'HomePage';
  tab2Root = 'TripsPage';
  tab3Root = 'AccountPage';

  constructor(public translate:TranslateService) {
    this.translate.use(this.language);
  }
  
  ionViewwillEnter(){
    this.language = localStorage.getItem("Language");
    if (this.language == "ar") {
      $(".en").addClass("hidden");
      $(".leftmenubutton").addClass("hidden");
    } else {
      $(".ar").addClass("hidden");
      $(".rightmenubutton").addClass("hidden");
    }
  }
}
