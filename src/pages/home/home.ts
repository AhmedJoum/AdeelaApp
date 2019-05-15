import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { TranslateService } from '@ngx-translate/core';
import { Slides } from 'ionic-angular';

declare let $: any;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild('slidess') slidess: Slides;
  language: any = localStorage.getItem('AdeeelaLanguage');
  lastlanguage: any;
  logged: any = localStorage.getItem("AdeeelaLoggedIn");
  cities: any;
  fromcities: any;
  fromcitiesar: any;
  fromcitiesen: any;
  tocities: any;
  tocitiesar: any;
  tocitiesen: any;
  times: any;
  startCity: any;
  endCity: any;
  startId: any;
  endId: any;
  start: any;
  end: any;
  time: any;
  slides: any;
  today: any;
  maxdate: any;
  currenttime: any;
  date: any;
  data: any;
  ads: any;
  loop: any;
  counter = 0;
  constructor(public translate: TranslateService, private server: ServerProvider, public navCtrl: NavController, public navParams: NavParams) {
    translate.use(this.language);
    //this.server.GetToken();
    this.server.InitializeToken();
    this.server.getCities().then(cs => {
      this.cities = cs;
    })
  }

  ionViewWillEnter() {
    if (this.slides == null) {
      this.GetAds();
    }
    this.InitializeDate();
    this.InitializeCities();
    this.language = localStorage.getItem("AdeeelaLanguage");
    if (this.language == "ar") {
      $(".en").addClass("hidden");
      $(".leftmenubutton").addClass("hidden");

    } else {
      $(".ar").addClass("hidden");
      $(".rightmenubutton").addClass("hidden");
    }

    this.loop = setInterval(() => {
      if (this.today == null) {
        this.InitializeDate();
        this.InitializeCities();
        this.GetAds();
        this.counter = this.counter + 1;
        switch (this.language) {
          case 'en':
            this.server.CreateAlert("Connection Errror", "Please check your internet connection", ['Close']);
            break;
          case 'ar':
            this.server.CreateAlert("فشل الاتصال", "الرجاء التاكد من اتصالك بالانترنت", ["اغلق"]);
            break;
        }
      } else {
        clearInterval(this.loop);
      }
    }, 10000);
  }

  onSlideChangeStart() {
    this.slidess.startAutoplay();
  }
  ionViewWillLeave() {
    this.slides = undefined;
    this.data = undefined;
    this.ads = undefined;
  }
  InitializeDate() {
    this.data = {};
    this.server.HiddenServerRequest("ads", "GetDate", this.data).then(result => {
      let data = JSON.parse(JSON.stringify(result));
      this.today = data.today;
      this.maxdate = data.maxdate;
      this.currenttime = data.time;
    });
  }
  InitializeCities() {
    this.data = {
      language: localStorage.getItem("AdeeelaLanguage")
    };
    this.server.HiddenServerRequest("route","GetFromCities",this.data).then(result => {
      let data = JSON.parse(JSON.stringify(result));
      this.fromcities = data;
      this.fromcitiesar = data[0];
      this.fromcitiesen = data[1];
    });
    this.server.HiddenServerRequest("route","GetToCities",this.data).then(result => {
      let data = JSON.parse(JSON.stringify(result));
      this.tocities = data;
      this.tocitiesar = data[0];
      this.tocitiesen = data[1];
    });
    this.server.HiddenServerRequest("route","GetTimes",this.data).then(result => {
      let data = JSON.parse(JSON.stringify(result));
      this.times = data;  
    });
  }
  GetAds() {
    this.language = localStorage.getItem('AdeeelaLanguage');
    switch (this.language) {
      case 'en':
        this.data = {};
        this.server.HiddenServerRequest("ads", "GetAds", this.data).then(result => {
          let data = JSON.parse(JSON.stringify(result));
          if (data == undefined || data == null || data.length == 0) {
            this.slides = null;
          } else {
            this.slides = data;
          }
        });
        break;
      case 'ar':
        this.data = {};
        this.server.HiddenServerRequest("ads", "GetAds", this.data).then(result => {
          let data = JSON.parse(JSON.stringify(result));
          if (data == undefined || data == null || data.length == 0) {
            this.slides = null;
          } else {
            this.slides = data;
          }
        });
        break;
      default:
        break;
    }
  }

  Next() {
    this.language = localStorage.getItem('AdeeelaLanguage');
    if (this.start == undefined || this.start == null || this.end == undefined || this.end == null || this.date == undefined || this.date == null) {
      if (this.language == "en") {
        this.server.CreateAlert('Warning', 'Please choose all fields', ['Close']);
      } else {
        this.server.CreateAlert('إنذار', 'الرجاء اختيار جميع الحقول', ['إغلاق']);
      }
      return;
    }
    if (this.start == this.end) {
      if (this.language == "en") {
        this.server.CreateAlert('Warning', 'You cannot book to the same city', ['Close']);
      } else {
        this.server.CreateAlert('إنذار', 'لا يمكنك الحجز الى نفس المدينة', ['إغلاق']);
      }
      return;
    }
    if (this.currenttime > this.time) {
      if (this.today == this.date) {
        if (this.language == "en") {
          this.server.CreateAlert('Warning', 'Trip already took off, Please choose another time or another day', ['Close']);
        } else {
          this.server.CreateAlert('تحذير', 'مضى زمن الرحلة، الرجاء اختيار وقت اخر او اختيار يوم اخر', ['إغلاق']);
        }
        return;
      }
    }
    if (this.language == "ar") {
      this.onAgencyChange();
    }
    sessionStorage.setItem('From', this.start);
    sessionStorage.setItem('To', this.end);
    sessionStorage.setItem('Date', this.date);
    this.navCtrl.push("AgencyPage");
  }

  onAgencyChange() {
    sessionStorage.setItem('FromEn', this.cities[this.start]);
    sessionStorage.setItem('ToEn', this.cities[this.end]);
  }
  

}
