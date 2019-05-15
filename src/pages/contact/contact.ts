import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
declare var $:any;

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})

export class ContactPage {
  language: any = localStorage.getItem('AdeeelaLanguage');
  logged: any = localStorage.getItem('AdeeelaLoggedIn');
  constructor(public translate: TranslateService, public navCtrl: NavController, public navParams: NavParams) {
    translate.use(this.language);
  }

  ionViewWillEnter() {

    this.language = localStorage.getItem("AdeeelaLanguage");
    if (this.language == "ar") {
      $(".en").addClass("hidden");
      $(".leftmenubutton").addClass("hidden");
    } else {
      $(".ar").addClass("hidden");
      $(".rightmenubutton").addClass("hidden");
    }
    
  }
}
