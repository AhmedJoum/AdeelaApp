import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
declare var $: any;

@IonicPage()
@Component({
  selector: 'page-guide',
  templateUrl: 'guide.html',
})
export class GuidePage {
  language: any = localStorage.getItem('AdeeelaLanguage');
  constructor(private translate: TranslateService, public navCtrl: NavController, public navParams: NavParams) {
    this.translate.use(this.language);
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

  Book() {
    this.navCtrl.push("HelpbookPage");
  }
  Trip() {
    this.navCtrl.push("HelptripPage");
  }
}
