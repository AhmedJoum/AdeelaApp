import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { TranslateService } from '@ngx-translate/core';
declare var $: any;

@IonicPage()
@Component({
  selector: 'page-dates',
  templateUrl: 'dates.html',
})
export class DatesPage {

  language: any = localStorage.getItem('AdeeelaLanguage');
  permission: any = localStorage.getItem('AdeeelaPermission');
  records:any;
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
    if (this.records == null) {
      this.GetHistory();
    }
  }

  GetHistory() {
    var data = {
      id: localStorage.getItem('AdeeelaID'),
      date: sessionStorage.getItem('date')
    };
    switch (this.language) {
      case 'en':
        this.server.CreateLoading("Getting History", "dots", 20000);
        this.server.ServerRequest("book", "GetNormalHistory", data).then(result => {
          var data = JSON.parse(JSON.stringify(result));
          if (data == null || data == "nohistory") {
            this.server.CreateAlert('Operation Failed', 'Please try again later', ["Close"]);
          } else {
            this.records = data;
          }
        });
        break;

      case 'ar':
        this.server.CreateLoading("جاري الحصول على السجل", "dots", 20000);
        this.server.ServerRequest("book", "GetNormalHistory", data).then(result => {
          var data = JSON.parse(JSON.stringify(result));
          if (data == null || data == "nohistory") {
            this.server.CreateAlert('Operation Failed', 'Please try again later', ["Close"]);
          } else {
            this.records = data;
          }
        });
        break;

      default:
        break;
    }
  }
  History(data) {
    this.navCtrl.push("HistoryPage", data);
  }
}
