import { Component } from '@angular/core';
import { ServerProvider } from '../../providers/server/server';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { CallNumber } from '@ionic-native/call-number';

declare var $: any;
@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {
  language: any = localStorage.getItem('AdeeelaLanguage');
  logged: any = localStorage.getItem("AdeeelaLoggedIn");
  token: any = localStorage.getItem("AdeeelaToken");
  encities: any = new Array();
  arcities: any = new Array();
  data:any;
  salepoints:any;
  constructor(public translate:TranslateService, private server: ServerProvider, public navCtrl: NavController, public navParams: NavParams, private callNumber: CallNumber) { 
    translate.use(this.language);
    this.encities = this.server.encities;
    this.arcities = this.server.arcities;
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
  OnChange(value) {
      this.GetSalepoints(value);
  }
  
  Home() {
    this.navCtrl.setRoot("TabsPage", {}, { animate: true, direction: "back" });
  }
  GetSalepoints(state) {
    this.language = localStorage.getItem('AdeeelaLanguage');
    switch (this.language) {
      case 'en':
        this.data = {
          language: this.language,
          state: state
        };
        console.log(this.data);
        this.server.CreateLoading("Getting Salepoints", "dots", 2000);
        this.server.ServerRequest("salepoint", "GetStateSalepoints", this.data).then(result => {
          var data = JSON.parse(JSON.stringify(result));
          if (data == undefined || data == null) {
            this.salepoints = null;
          } else {
            this.salepoints = data;
          }
        });
        break;
      case 'ar':
        this.data = {
          language: this.language,
          state: state
        };
        this.server.CreateLoading("جاري الحصول على نقاط البيع ", "dots", 2000);
        this.server.ServerRequest("salepoint", "GetStateSalepoints", this.data).then(result => {
          var data = JSON.parse(JSON.stringify(result));
          if (data == undefined || data == null) {
            this.salepoints = null;
          } else {
            this.salepoints = data;
          }
        });
        break;
      default:
        break;
    }
  }
  callPhoneNumber(number) {
    console.log('number ', number);
    this.callNumber.callNumber(number.toString(), false)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }
}
