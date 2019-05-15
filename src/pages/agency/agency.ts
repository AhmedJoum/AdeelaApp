import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { TranslateService } from '@ngx-translate/core';
declare var $: any;

@IonicPage()
@Component({
  selector: 'page-agency',
  templateUrl: 'agency.html',
})
export class AgencyPage {
  language: any = localStorage.getItem('AdeeelaLanguage');
  permission: any = localStorage.getItem('AdeeelaPermission');
  agencies: any;
  slides: any;
  data: any;
  today: any;
  currenttime: any;
  routes: any;
  agency_index: any;
  route_index: any;
  date: any = sessionStorage.getItem("Date");
  constructor(public translate: TranslateService, private server: ServerProvider, public navCtrl: NavController, public navParams: NavParams) {
    translate.use(this.language);
  }

  ionViewWillEnter() {
    this.GetAgencies();
    if (this.slides == null) {
      this.GetAds();
    }
    if (this.today == null) {
      this.InitializeDate();
    }
    this.language = localStorage.getItem("AdeeelaLanguage");
    if (this.language == "ar") {
      $(".en").addClass("hidden");
      $(".leftmenubutton").addClass("hidden");
    } else {
      $(".ar").addClass("hidden");
      $(".rightmenubutton").addClass("hidden");
    }
  }

  OnChange(index) {
    this.GetAgencyRoutes(index);
    this.agency_index = index;
  }
  OnSelectChange(index) {
    this.route_index = index;
  }
  GetAgencyRoutes(index) {
    let data = {
      id: this.agencies[index].id
    };
    this.language = localStorage.getItem('AdeeelaLanguage');
    let from = sessionStorage.getItem("FromEn");
    let to = sessionStorage.getItem("ToEn");
    let data2 = {
      id: this.agencies[index].id,
      from: from,
      to: to,
      language: this.language
    }
    this.server.verifyTickets(data2).then(result => {
      if (Number(result > 0)) {
        switch (this.language) {
          case 'en':
            this.server.CreateLoading("Getting Available Routes", "dots", 20000);
            this.server.ServerRequest("route", "GetAgencyRoutes", data).then(result => {
              let data = JSON.parse(JSON.stringify(result));
              if (data == null || data == "no routes available") {
                this.routes = [];
              } else {
                this.routes = [];
                data.forEach(r => {
                  r.from_en == from && r.to_en == to ? this.routes.push(r) : '';
                });
              }
            });
            break;
    
          case 'ar':
            this.server.CreateLoading("جاري الحصول على الخطوط", "dots", 20000);
            this.server.ServerRequest("route", "GetAgencyRoutes", data).then(result => {
              let data = JSON.parse(JSON.stringify(result));
              if (data == null || data == "no routes available") {
                this.routes = [];
              } else {
                this.routes = [];
                data.forEach(r => {
                  r.from_en == from && r.to_en == to ? this.routes.push(r) : '';
                });
              }
            });
            break;
    
          default:
            break;
        }
      } else {
        if (this.language == "en") {
          this.server.CreateAlert('Warning', 'Tickets unvailable for chosen agency', ['Close']);
        } else {
          this.server.CreateAlert('تحذير', 'التذاكر غير متاحة للوكالة المختارة', ['إغلاق']);
        }
        this.routes = [];
      }
    })

  }
  InitializeDate() {
    let data = {};
    this.server.HiddenServerRequest("ads", "GetDate", data).then(result => {
      let data = JSON.parse(JSON.stringify(result));
      this.today = data.today;
      this.currenttime = data.time;
      sessionStorage.setItem("CurrentTime", this.currenttime);
    });
  }
  GetAds() {
    this.language = localStorage.getItem('AdeeelaLanguage');
    switch (this.language) {
      case 'en':
        this.data = {};
        this.server.HiddenServerRequest("ads", "GetAds", this.data).then(result => {
          var data = JSON.parse(JSON.stringify(result));
          console.log(data);
          if (data == undefined || data == null) {

          } else {
            this.slides = data;
          }
        });
        break;
      case 'ar':
        this.data = {};
        this.server.HiddenServerRequest("ads", "GetAds", this.data).then(result => {
          var data = JSON.parse(JSON.stringify(result));
          if (data == undefined || data == null) {

          } else {
            this.slides = data;
          }
        });
        break;
      default:
        break;
    }
  }
  GetAgency() {

  }
  GetAgencies() {
    this.language = localStorage.getItem("AdeeelaLanguage");
    var data = {
      from: sessionStorage.getItem("From"),
      to: sessionStorage.getItem("To"),
      language: this.language,
      access:"Adeeela"
    };
    switch (this.language) {
      case 'en':
        this.server.CreateLoading("Getting Available Agencies", "dots", 20000);
        this.server.ServerRequest("agency", "GetAgencies", data).then(result => {
          var agences = JSON.parse(JSON.stringify(result));
          if (agences == null || agences == "no agencies available") {
            this.agencies = null;
          } else {
            this.server.getAgencies(data).then(res => {
              var agsIds = JSON.parse(JSON.stringify(res));
              this.agencies = [];
              agences.forEach(ag => {
                if(agsIds.indexOf(ag.id) != -1) {
                  this.agencies.push(ag);
                }
              });
            });
          }
        });
        break;

      case 'ar':
        this.server.CreateLoading("جاري الحصول على الوكالات", "dots", 20000);
        this.server.ServerRequest("agency", "GetAgencies", data).then(result => {
          var agences = JSON.parse(JSON.stringify(result));
          if (agences == null || agences == "no agencies available") {
            this.agencies = null;
          } else {
            data.language = 'en';
            data.from = sessionStorage.getItem('FromEn')
            data.to = sessionStorage.getItem('ToEn')
            this.server.getAgencies(data).then(res => {
              var agsIds = JSON.parse(JSON.stringify(res));
              this.agencies = [];
              agences.forEach(ag => {
                if(agsIds.indexOf(ag.id) != -1) {
                  this.agencies.push(ag);
                }
              });
            });
          }
        });
        break;

      default:
        break;
    }
  }
  Next() {
    if(this.route_index == null || this.agency_index == null) {
      if (this.language == "en") {
        this.server.CreateAlert('Warning', 'Please select all fields', ['Close']);
      } else {
        this.server.CreateAlert('تحذير', 'الرجاء اختيار جميع الحقول', ['إغلاق']);
      }
      return;
    }
    if (this.currenttime > this.routes[this.route_index].time) {
      if (this.today == this.date) {
        if (this.language == "en") {
          this.server.CreateAlert('Warning', 'Trip already took off, Please choose another time or another day', ['Close']);
        } else {
          this.server.CreateAlert('تحذير', 'مضى زمن الرحلة، الرجاء اختيار وقت اخر او اختيار يوم اخر', ['إغلاق']);
        }
        return;
      }
    }
    switch (this.language) {
      case 'en':
        sessionStorage.setItem("AgencyID", this.agencies[this.agency_index].id);
        sessionStorage.setItem("AgencyName", this.agencies[this.agency_index].name_en);
        sessionStorage.setItem("RouteID", this.routes[this.route_index].id);
        sessionStorage.setItem("TicketPrice", this.routes[this.route_index].price);
        sessionStorage.setItem("Time", this.routes[this.route_index].time);
        //this.navCtrl.push("BusPage");
        break;
      case 'ar':
        sessionStorage.setItem("AgencyID", this.agencies[this.agency_index].id);
        sessionStorage.setItem("AgencyName", this.agencies[this.agency_index].name_ar);
        sessionStorage.setItem("RouteID", this.routes[this.route_index].id);
        sessionStorage.setItem("TicketPrice", this.routes[this.route_index].price);
        sessionStorage.setItem("Time", this.routes[this.route_index].time);
        //this.navCtrl.push("BusPage");
        break;
    }
    this.GetBuses();
  }
  GetBuses() {
    let data = {
      id: sessionStorage.getItem("AgencyID"),
      route_id: sessionStorage.getItem("RouteID"),
      language: localStorage.getItem("AdeeelaLanguage")
    };
    let buses;
    switch (this.language) {
      case 'en':
        this.server.CreateLoading("Check for buses", "dots", 20000);
        this.server.ServerRequest("route", "GetRouteBuses", data).then(result => {
          let data = JSON.parse(JSON.stringify(result));
          if (data == null || data == "no buses available") {
            buses = null;
            this.server.CreateAlert('No buses', 'No buses available', ['Close']);
            
          } else {
            buses = data;
            this.Reserve(buses[0]);
          }
        });
        break;

      case 'ar':
        this.server.CreateLoading("جاري التأكد من وجود بصات", "dots", 20000);
        this.server.ServerRequest("route", "GetRouteBuses", data).then(result => {
          let data = JSON.parse(JSON.stringify(result));
          if (data == null || data == "no buses available") {
            buses = null;
            this.server.CreateAlert('تنبيه', 'الباصات غير متوفرة', ['إغلاق']);
          } else {
            buses = data;
            this.Reserve(buses[0]);
          }
        });
        break;

      default:
        break;
    }
  }
  Reserve(bus) {
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
    this.GetAgencies();
    refresher.complete();
  }
  DoRefreshAr(refresher) {
    this.GetAgencies();
    refresher.complete();
  }
}
