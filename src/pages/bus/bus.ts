import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { TranslateService } from '@ngx-translate/core';
declare let $: any;
@IonicPage()
@Component({
  selector: 'page-bus',
  templateUrl: 'bus.html',
})
export class BusPage {
  language: any = localStorage.getItem('AdeeelaLanguage');
  permission: any = localStorage.getItem('AdeeelaPermission');
  agency_id: any = localStorage.getItem("AdeeelaAgencyID");
  buses: any;
  data: any;
  routes: any;
  constructor(public translate: TranslateService, public server: ServerProvider, public navCtrl: NavController, public navParams: NavParams) {
    translate.use(this.language);
  }

  ionViewWillEnter() {
    this.GetBuses();
    if (this.language == "ar") {
      $(".en").addClass("hidden");
      $(".leftmenubutton").addClass("hidden");
    } else {
      $(".ar").addClass("hidden");
      $(".rightmenubutton").addClass("hidden");
    }
  }

  GetBuses() {
    this.data = {
      id: sessionStorage.getItem("AgencyID"),
      route_id: sessionStorage.getItem("RouteID"),
      language: localStorage.getItem("AdeeelaLanguage")
    };
    switch (this.language) {
      case 'en':
        this.server.CreateLoading("Getting Available Buses", "dots", 20000);
        this.server.ServerRequest("route", "GetRouteBuses", this.data).then(result => {
          let data = JSON.parse(JSON.stringify(result));
          if (data == null || data == "no buses available") {
            this.buses = null;
          } else {
            this.buses = data;
          }
        });
        break;

      case 'ar':
        this.server.CreateLoading("جاري الحصول على البصات", "dots", 20000);
        this.server.ServerRequest("route", "GetRouteBuses", this.data).then(result => {
          let data = JSON.parse(JSON.stringify(result));
          if (data == null || data == "no buses available") {
            this.buses = null;
          } else {
            this.buses = data;
          }
        });
        break;

      default:
        break;
    }
  }
  GetRoutes() {
    this.language = localStorage.getItem('AdeeelaLanguage');
    switch (this.language) {
      case 'en':
        this.data = {
          id: this.agency_id
        };
        this.server.CreateLoading("Getting Routes", "dots", 2000);
        this.server.ServerRequest("route", "GetAgencyRoutes", this.data).then(result => {
          let data = JSON.parse(JSON.stringify(result));
          if (data == undefined || data == null) {
            this.routes = null;
          } else {
            this.routes = data;
          }
        });
        break;
      case 'ar':
        this.data = {
          id: this.agency_id
        };
        this.server.CreateLoading("جاري الحصول على الخطوط ", "dots", 2000);
        this.server.ServerRequest("route", "GetAgencyRoutes", this.data).then(result => {
          let data = JSON.parse(JSON.stringify(result));
          if (data == undefined || data == null) {
            this.routes = null;
          } else {
            this.routes = data;
          }
        });
        break;
      default:
        break;
    }
  }
  Next(bus) {
    switch (this.language) {
      case 'en':
        sessionStorage.setItem("BusName", bus.name_en);
        sessionStorage.setItem("BusID", bus.id);
        sessionStorage.setItem("BusLevel", bus.level);
        sessionStorage.setItem("BusLicensePlate", bus.license_plate);
        sessionStorage.setItem("BusImage", bus.image);
        sessionStorage.setItem("BusNo", bus.no);
        if (bus.seat_numbers == 49) {
          this.navCtrl.push("SeatsPage");
        } else {
          this.navCtrl.push("Seats2Page");
        }
        break;
      case 'ar':
        sessionStorage.setItem("BusName", bus.name_ar);
        sessionStorage.setItem("BusID", bus.id);
        sessionStorage.setItem("BusLevel", bus.level);
        sessionStorage.setItem("BusLicensePlate", bus.license_plate);
        sessionStorage.setItem("BusImage", bus.image);
        sessionStorage.setItem("BusNo", bus.no);
        if (bus.seat_numbers == 49) {
          this.navCtrl.push("SeatsPage");
        } else {
          this.navCtrl.push("Seats2Page");
        }
        break;
    }
  }

  DoRefresh(refresher) {
    this.GetBuses();
    refresher.complete();
  }
}
