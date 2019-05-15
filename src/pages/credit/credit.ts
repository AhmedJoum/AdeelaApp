import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { TranslateService } from '@ngx-translate/core';
declare var $: any;

@IonicPage()
@Component({
  selector: 'page-credit',
  templateUrl: 'credit.html',
})
export class CreditPage {
  language: any = localStorage.getItem('AdeeelaLanguage');
  user_id: any = localStorage.getItem('AdeeelaID');
  token: any = localStorage.getItem("AdeeelaToken");
  from: any = sessionStorage.getItem("From");
  to: any = sessionStorage.getItem("To");
  time: any = sessionStorage.getItem("Time");
  route_id: any = sessionStorage.getItem('RouteID');
  agency_id: any = sessionStorage.getItem('AgencyID');
  agency: any = sessionStorage.getItem("AgencyName");
  bus: any = sessionStorage.getItem("BusName");
  bus_no: any = sessionStorage.getItem("BusNo");
  level: any = sessionStorage.getItem("BusLevel");
  seat_no: any = sessionStorage.getItem("SeatNo");
  price: any = parseFloat(sessionStorage.getItem('TicketPrice'));
  date: any = sessionStorage.getItem("Date");
  passengername: any = sessionStorage.getItem("PassengerName");
  passengerphone: any = sessionStorage.getItem("PassengerPhone");
  data: any;
  fee: any = (this.price * 10) / 100;
  total: any = this.price + this.fee;

  constructor(public translate: TranslateService, private server: ServerProvider, public navCtrl: NavController, public navParams: NavParams) {
    translate.use(this.language);
  }
  ionViewWillEnter() {
    this.GetTimeNow();
    this.Validate();
    this.language = localStorage.getItem("AdeeelaLanguage");
    if (this.language == "ar") {
      $(".en").addClass("hidden");
      $(".leftmenubutton").addClass("hidden");
    } else {
      $(".ar").addClass("hidden");
      $(".rightmenubutton").addClass("hidden");
    }
  }

  GetTimeNow() {
    this.data = {};
    this.server.HiddenServerRequest("ads", "GetDate", this.data).then(result => {
      let data = JSON.parse(JSON.stringify(result));
      if(data.time >= "09:00:00" && data.time <= "17:00:00"){
        $("#confirmbtnen").prop("disabled",false);
        $("#confirmbtnar").prop("disabled",false);
      }
    
    });
  }
  Confirm(form) {
    this.language = localStorage.getItem('AdeeelaLanguage');
    switch (this.language) {
      case 'en':
        if (form.transferphoneen == "" || form.transferphoneen == null || form.numbersen == "" || form.numbersen == null) {
          this.server.CreateAlert("Warning", "Please enter all required fields", ['Close']);
          return;
        }
        this.data = {
          user_id: this.user_id,
          route_id: this.route_id,
          agency_id: this.agency_id,
          passenger_name: this.passengername,
          passenger_phone: this.passengerphone,
          seat_no: this.seat_no,
          bus_level: this.level,
          bus_no: this.bus_no,
          date: this.date,
          time: this.time,
          price: this.price,
          transfer_phone: form.transferphoneen,
          chosen_phone: form.numbersen,
          token: this.token,
          status: 2
        };
        this.server.CreateLoading("Booking Ticket", "dots", 2000);
        this.server.ServerRequest("book", "CreditTransfer", this.data).then(result => {
          var data = JSON.parse(JSON.stringify(result));
          if (data.response != "Ok") {
            this.server.CreateAlert("Operation Failed", "Please try again later", ["Close"]);
          } else {
            this.server.CreateAlert("Operation Successful", "Booked Successfully, Please wait for confirmation, We will get back to you ASAP", ["Close"]);
            this.server.MassNotifications('Credit Transfer Request', 'Please check the requested ticket', 'admin99');
            sessionStorage.setItem('PassengerName', this.passengername);
            sessionStorage.setItem('PassengerPhone', this.passengerphone);
            sessionStorage.setItem('BookingNo', data.booking_no);
            sessionStorage.setItem('TicketNo', data.ticket_no);
            this.navCtrl.setRoot("SummaryPage", {}, { animate: true, direction: "back" });
          }
        });
        break;
      case 'ar':
        if (form.transferphonear == "" || form.transferphonear == null || form.numbersar == "" || form.numbersar == null) {
          this.server.CreateAlert("تحذير", "الرجاء إدخال جميع الحقول المطلوبة", ['اغلق']);
          return;
        }
        this.data = {
          user_id: this.user_id,
          route_id: this.route_id,
          agency_id: this.agency_id,
          passenger_name: this.passengername,
          passenger_phone: this.passengerphone,
          seat_no: this.seat_no,
          bus_level: this.level,
          bus_no: this.bus_no,
          date: this.date,
          time: this.time,
          price: this.price,
          transfer_phone: form.transferphonear,
          chosen_phone: form.numbersar,
          token: this.token,
          status: 2
        };
        this.server.CreateLoading("جاري حجز التذكرة", "dots", 2000);
        this.server.ServerRequest("book", "CreditTransfer", this.data).then(result => {
          var data = JSON.parse(JSON.stringify(result));
          if (data.response != "Ok") {
            this.server.CreateAlert("فشلت العملية", "الرجاء المحاولة مرة اخرى", ["إغلاق"]);
          } else {
            this.server.CreateAlert("نجحت العملية", "تم الحجز بنجاح، الرجاء انتظار التاكيد، سوف نقوم بالرجوع اليك في اقرب فرصة ممكنة", ["إغلاق"]);
            this.server.MassNotifications('طلب تحويل رصيد', 'يرجى التحقق من التذكرة المطلوبة', 'admin99');
            sessionStorage.setItem('PassengerName', this.passengername);
            sessionStorage.setItem('PassengerPhone', this.passengerphone);
            sessionStorage.setItem('BookingNo', data.booking_no);
            sessionStorage.setItem('TicketNo', data.ticket_no);
            this.navCtrl.setRoot("SummaryPage", {}, { animate: true, direction: "back" });
          }
        });
        break;
      default:
        break;
    }
  }

  Validate() {
    setTimeout(function () {
      $("#crediten").bootstrapValidator({
        message: "This value is not valid", feedbackIcons: {
          valid: "glyphicon glyphicon-ok", invalid: "glyphicon glyphicon-remove", validating: "glyphicon glyphicon-refresh"
        }
        , fields: {
          numbersen: {
            validators: {
              notEmpty: {
                message: "Please select a number"
              }
            }
          },
          transferphoneen: {
            validators: {
              notEmpty: {
                message: 'Please enter transfer phone'
              },
              stringLength: {
                min: 10,
                max: 10,
                message: 'Phone must be 10 numbers long'
              },
              regexp: {
                regexp: /^0+[0-9]*$/,
                message: "Phone must start with 0 and contain numbers only"
              }
            }
          }
        }
      }).on('success.form.bv', function (e) { e.preventDefault(); });
      $("#creditar").bootstrapValidator({
        message: "This value is not valid", feedbackIcons: {
          valid: "glyphicon glyphicon-ok", invalid: "glyphicon glyphicon-remove", validating: "glyphicon glyphicon-refresh"
        }
        , fields: {
          numbersar: {
            validators: {
              notEmpty: {
                message: "الرجاء اختيار رقم"
              }
            }
          },
          transferphonear: {
            validators: {
              notEmpty: {
                message: 'الرجاء إدخال الرقم'
              },
              stringLength: {
                min: 10,
                max: 10,
                message: 'يجب أن يكون الهاتف 10 أرقام فقط'
              },
              regexp: {
                regexp: /^0+[0-9]*$/,
                message: "يجب أن يبدأ الهاتف ب 0 وأن يحتوي على أرقام فقط"
              }
            }
          }
        }
      }).on('success.form.bv', function (e) { e.preventDefault(); });
    }, 1000);
  }
}
