import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { TranslateService } from '@ngx-translate/core';
declare let $: any;

@IonicPage()
@Component({
  selector: 'page-seats',
  templateUrl: 'seats.html',
})
export class SeatsPage {
  language: any = localStorage.getItem('Language');
  permission: any = localStorage.getItem('Permission');
  firstrun: any;
  loop: any;
  busimage: any;
  data: any;
  seats = [];
  constructor(public server: ServerProvider, public translate: TranslateService, public navCtrl: NavController, public navParams: NavParams) {
    translate.use(this.language);
  }

  ionViewWillEnter() {
    this.language = localStorage.getItem("Language");
    if (this.language == "ar") {
      $(".en").addClass("hidden");
      $(".leftmenubutton").addClass("hidden");
    } else {
      $(".ar").addClass("hidden");
      $(".rightmenubutton").addClass("hidden");
    }
    if (this.firstrun == null) {
      this.InitializeButtons();
      this.firstrun == true;
    }
    this.loop = setInterval(() => {
      this.InitializeButtons2();
    }, 15000);
    if (this.busimage == null) {
      this.GetBusImage();
    }
  }
  ionViewWillLeave() {
    clearInterval(this.loop);
  }


  Check(seat) {
    if (this.seats.indexOf(seat) == -1) {
      this.seats.push(seat);
      $("." + seat).addClass("blue");
    } else {
      this.seats.splice(this.seats.indexOf(seat), 1);
      $("." + seat).removeClass("blue");
    }
  }
  GetBusImage() {
    this.language = localStorage.getItem('Language');
    this.data = {
      id: sessionStorage.getItem("BusImage")
    };
    switch (this.language) {
      case 'en':
        this.server.HiddenServerRequest("route", "GetBusImage", this.data).then(result => {
          let data = JSON.parse(JSON.stringify(result));
          if (data == undefined || data == null) {

          } else {
            this.busimage = data;
          }
        });
        break;
      case 'ar':
        this.server.HiddenServerRequest("route", "GetBusImage", this.data).then(result => {
          let data = JSON.parse(JSON.stringify(result));
          if (data == undefined || data == null) {

          } else {
            this.busimage = data;
          }
        });
        break;
      default:
        break;
    }
  }

  InitializeButtons() {
    this.language = localStorage.getItem("Language");
    let data = {
      agency_id: sessionStorage.getItem('AgencyID'),
      route_id: sessionStorage.getItem('RouteID'),
      bus_level: sessionStorage.getItem("BusLevel"),
      bus_id: sessionStorage.getItem("BusID"),
      bus_no: sessionStorage.getItem("BusNo"),
      time: sessionStorage.getItem("Time"),
      date: sessionStorage.getItem("Date")
    };
    switch (this.language) {
      case 'en':
        this.server.CreateLoading("Getting Seats", "dots", 20000);
        this.server.ServerRequest("book", "GetSeats", data).then(result => {
          let data = JSON.parse(JSON.stringify(result));
          if (data == null || data == "failed") {
            this.server.CreateAlert('Booking Failed', 'Please try again later', ["Close"]);
          } else {
            for (let i = 0; i < data.length; i++) {
              if (data[i].status == 1) {
                if (data[i].seat_no < 10) {
                  $(".0" + data[i].seat_no).addClass("red");
                  $(".0" + data[i].seat_no).prop("disabled", "true");
                } else {
                  $("." + data[i].seat_no).addClass("red");
                  $("." + data[i].seat_no).prop("disabled", "true");
                }
              }

              if (data[i].status == 2) {
                if (data[i].seat_no < 10) {
                  $(".0" + data[i].seat_no).addClass("yellow");
                  $(".0" + data[i].seat_no).prop("disabled", "true");
                } else {
                  $("." + data[i].seat_no).addClass("yellow");
                  $("." + data[i].seat_no).prop("disabled", "true");
                }
              }
              if (data[i].status == 4) {
                if (data[i].seat_no < 10) {
                  $(".0" + data[i].seat_no).addClass("orange");
                  $(".0" + data[i].seat_no).prop("disabled", "true");
                } else {
                  $("." + data[i].seat_no).addClass("orange");
                  $("." + data[i].seat_no).prop("disabled", "true");
                }
              }
            }
          }
        });
        break;
      case 'ar':
        this.server.CreateLoading("جاري الحصول على المقاعد", "dots", 20000);
        this.server.ServerRequest("book", "GetSeats", data).then(result => {
          let data = JSON.parse(JSON.stringify(result));
          if (data == null || data == "failed") {
            this.server.CreateAlert('فشل الحجز', 'الرجاء المحاولة مرة اخرى', ["إغلاق"]);
          } else {
            for (let i = 0; i < data.length; i++) {
              if (data[i].status == 1) {
                if (data[i].seat_no < 10) {
                  $(".0" + data[i].seat_no).addClass("red");
                  $(".0" + data[i].seat_no).prop("disabled", "true");
                } else {
                  $("." + data[i].seat_no).addClass("red");
                  $("." + data[i].seat_no).prop("disabled", "true");
                }
              }
              if (data[i].status == 2) {
                if (data[i].seat_no < 10) {
                  $(".0" + data[i].seat_no).addClass("yellow");
                  $(".0" + data[i].seat_no).prop("disabled", "true");
                } else {
                  $("." + data[i].seat_no).addClass("yellow");
                  $("." + data[i].seat_no).prop("disabled", "true");
                }
              }
              if (data[i].status == 4) {
                if (data[i].seat_no < 10) {
                  $(".0" + data[i].seat_no).addClass("orange");
                  $(".0" + data[i].seat_no).prop("disabled", "true");
                } else {
                  $("." + data[i].seat_no).addClass("orange");
                  $("." + data[i].seat_no).prop("disabled", "true");
                }
              }
            }
          }
        });
        break;

      default:
        break;
    }
  }

  InitializeButtons2() {

    this.language = localStorage.getItem("Language");
    let data = {
      agency_id: sessionStorage.getItem('AgencyID'),
      route_id: sessionStorage.getItem('RouteID'),
      bus_level: sessionStorage.getItem("BusLevel"),
      bus_id: sessionStorage.getItem("BusID"),
      bus_no: sessionStorage.getItem("BusNo"),
      time: sessionStorage.getItem("Time"),
      date: sessionStorage.getItem("Date")
    };
    switch (this.language) {
      case 'en':
        this.server.HiddenServerRequest("book", "GetSeats", data).then(result => {
          let data = JSON.parse(JSON.stringify(result));
          if (data == null || data == "failed") {
            this.server.CreateAlert('Booking Failed', 'Please try again later', ["Close"]);
          } else {
            for (let i = 0; i < data.length; i++) {
              if (data[i].status == 1) {
                if (data[i].seat_no < 10) {
                  $(".0" + data[i].seat_no).addClass("red");
                  $(".0" + data[i].seat_no).prop("disabled", "true");
                } else {
                  $("." + data[i].seat_no).addClass("red");
                  $("." + data[i].seat_no).prop("disabled", "true");
                }
              }
              if (data[i].status == 2) {
                if (data[i].seat_no < 10) {
                  $(".0" + data[i].seat_no).addClass("yellow");
                  $(".0" + data[i].seat_no).prop("disabled", "true");
                } else {
                  $("." + data[i].seat_no).addClass("yellow");
                  $("." + data[i].seat_no).prop("disabled", "true");
                }
              }
              if (data[i].status == 4) {
                if (data[i].seat_no < 10) {
                  $(".0" + data[i].seat_no).addClass("orange");
                  $(".0" + data[i].seat_no).prop("disabled", "true");
                } else {
                  $("." + data[i].seat_no).addClass("orange");
                  $("." + data[i].seat_no).prop("disabled", "true");
                }
              }
            }
          }
        });
        break;

      case 'ar':
        this.server.HiddenServerRequest("book", "GetSeats", data).then(result => {
          let data = JSON.parse(JSON.stringify(result));
          if (data == null || data == "failed") {
            this.server.CreateAlert('فشل الحجز', 'الرجاء المحاولة مرة اخرى', ["إغلاق"]);
          } else {
            for (let i = 0; i < data.length; i++) {
              if (data[i].status == 1) {
                if (data[i].seat_no < 10) {
                  $(".0" + data[i].seat_no).addClass("red");
                  $(".0" + data[i].seat_no).prop("disabled", "true");
                } else {
                  $("." + data[i].seat_no).addClass("red");
                  $("." + data[i].seat_no).prop("disabled", "true");
                }
              }
              if (data[i].status == 2) {
                if (data[i].seat_no < 10) {
                  $(".0" + data[i].seat_no).addClass("yellow");
                  $(".0" + data[i].seat_no).prop("disabled", "true");
                } else {
                  $("." + data[i].seat_no).addClass("yellow");
                  $("." + data[i].seat_no).prop("disabled", "true");
                }
              }
              if (data[i].status == 4) {
                if (data[i].seat_no < 10) {
                  $(".0" + data[i].seat_no).addClass("orange");
                  $(".0" + data[i].seat_no).prop("disabled", "true");
                } else {
                  $("." + data[i].seat_no).addClass("orange");
                  $("." + data[i].seat_no).prop("disabled", "true");
                }
              }
            }
          }
        });
        break;

      default:
        break;
    }
  }
  Next() {
    if (this.seats.length == 0) {
      this.language = localStorage.getItem("Language");
      switch (this.language) {
        case 'en':
          this.server.CreateAlert("Warning", "Please choose atleast one seat.", ["Close"]);
          break;
        case 'ar':
          this.server.CreateAlert("تحذير", "الرجاء اختيار مقعد واحد على الاقل", ["اغلق"])
          break;
      }
    } else {
      if (this.seats.length > 14) {
        this.language = localStorage.getItem("Language");
        switch (this.language) {
          case 'en':
            this.server.CreateAlert("Warning", "You cannot choose more than 14 seats on 1 booking", ["Close"]);
            break;
          case 'ar':
            this.server.CreateAlert("تحذير", "لا يمكنك حجز اكثر من 14 مقعد في حجز واحد", ["اغلق"])
            break;
        }
      } else {
        this.navCtrl.push("DetailsPage", this.seats);
      }
    }
  }
}
