import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ServerProvider } from '../../providers/server/server';
import { TranslateService } from '@ngx-translate/core';
declare var $: any;

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  language: any = localStorage.getItem('AdeeelaLanguage');
  permission: any = localStorage.getItem('AdeeelaPermission');
  data: any;
  constructor(private server: ServerProvider, public translate: TranslateService, public navCtrl: NavController, public navParams: NavParams) {
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
  RejectBooking(booking_no) {
    this.language = localStorage.getItem('AdeeelaLanguage');
    switch (this.language) {
      case 'en':
        this.data = {
          booking_no: booking_no
        };
        this.server.CreateLoading("Deleting booking", "dots", 2000);
        this.server.ServerRequest("book", "RejectBooking", this.data).then(result => {
          var data = JSON.parse(JSON.stringify(result));
          if (data.response != "Ok") {
            this.server.CreateAlert("Operation Failed", "Please try again later", ["Close"]);
          } else {
            this.server.CreateAlert("Operation Successful", "Deleted Successfully", ["Close"]);
            this.navCtrl.popToRoot();
          }
        });
        break;
      case 'ar':
        this.data = {
          booking_no: booking_no
        };
        this.server.CreateLoading("جاري حذف الحجز", "dots", 2000);
        this.server.ServerRequest("book", "RejectBooking", this.data).then(result => {
          var data = JSON.parse(JSON.stringify(result));
          if (data.response != "Ok") {
            this.server.CreateAlert("فشلت العملية", "الرجاء المحاولة مرة اخرى", ["إغلاق"]);
          } else {
            this.server.CreateAlert("نجحت العملية", "تم الحذف بنجاح", ["إغلاق"]);
            this.navCtrl.popToRoot();
          }
        });
        break;
      default:
        break;
    }
  }
}
