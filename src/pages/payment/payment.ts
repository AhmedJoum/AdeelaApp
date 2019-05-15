import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { TranslateService } from '@ngx-translate/core';
declare var $: any;

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  language: any = localStorage.getItem('AdeeelaLanguage');
  logged: any = localStorage.getItem('AdeeelaLoggedIn');
  url:any = sessionStorage.getItem("url");
  data:any;
  constructor(public translate: TranslateService, public server: ServerProvider, public navCtrl: NavController, public navParams: NavParams) {
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
 
  ionViewDidLoad() {
 }
}
