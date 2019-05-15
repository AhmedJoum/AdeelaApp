import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { TranslateService } from '@ngx-translate/core';

declare let $: any;
@IonicPage()
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})
export class BookingPage {
  language: any = localStorage.getItem('AdeeelaLanguage');
  logged: any = localStorage.getItem('AdeeelaLoggedIn');
  dates: any;
  constructor(public server: ServerProvider, public translate: TranslateService, public navCtrl: NavController, public navParams: NavParams) {
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
    if (this.dates == null) {
      this.GetDates();
    }
  }

  GetDates() {
    let data = {
      id: localStorage.getItem('AdeeelaID')
    };
    switch (this.language) {
      case 'en':
        this.server.CreateLoading("Getting History", "dots", 20000);
        this.server.ServerRequest("book", "GetNormalUserDates", data).then(result => {
          let data = JSON.parse(JSON.stringify(result));
          if (data == null || data == "nodates") {
            this.dates = null;
          } else {
            this.dates = data;
          }
        });
        break;

      case 'ar':
        this.server.CreateLoading("جاري الحصول على السجل", "dots", 20000);
        this.server.ServerRequest("book", "GetNormalUserDates", data).then(result => {
          let data = JSON.parse(JSON.stringify(result));
          if (data == null || data == "nodates") {
            this.dates = null;
          } else {
            this.dates = data;
          }
        });
        break;

      default:
        break;
    }
  }
  History(data) {
    sessionStorage.setItem("date",data.date);
    this.navCtrl.push("DatesPage");
  }
  ionViewWillLeave() {
    this.dates = null;
  }
}
