import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { TranslateService } from '@ngx-translate/core';
declare var $: any;

@IonicPage()
@Component({
  selector: 'page-trips',
  templateUrl: 'trips.html',
})
export class TripsPage {
  language: any = localStorage.getItem('Language');
  user_id: any = localStorage.getItem('ID');
  data: any;
  trips: any;
  today: any;
  trip_date: any;
  maxdate: any;
  constructor(public server: ServerProvider, public translate: TranslateService, public navCtrl: NavController, public navParams: NavParams) {
    translate.use(this.language);
  }

  ionViewWillEnter() {
    if (this.today == null || this.maxdate == null) {
      this.InitializeDate();
    }
    this.Validate();
    this.language = localStorage.getItem("Language");
    if (this.language == "ar") {
      $(".en").addClass("hidden");
      $(".leftmenubutton").addClass("hidden");
    } else {
      $(".ar").addClass("hidden");
      $(".rightmenubutton").addClass("hidden");
    }
    if (this.trips == null) {
      this.GetRequestedTrips();
    }
  }
  InitializeDate() {
    this.data = {};
    this.server.HiddenServerRequest("ads", "GetDate", this.data).then(result => {
      let data = JSON.parse(JSON.stringify(result));
      this.today = data.today;
      this.maxdate = data.maxdate;
    });
  }
  GetRequestedTrips() {
    this.language = localStorage.getItem('Language');
    switch (this.language) {
      case 'en':
        this.data = {
          user_id: localStorage.getItem("ID")
        };
        this.server.CreateLoading("Getting Requests", "dots", 30000);
        this.server.ServerRequest("book", "GetUserRequestedTrips", this.data).then(result => {
          var data = JSON.parse(JSON.stringify(result));
          if (data == undefined || data == null) {
            this.trips = null;
          } else {
            this.trips = data;
          }
        });
        break;
      case 'ar':
        this.data = {
          user_id: localStorage.getItem("ID")
        };
        this.server.CreateLoading("جاري الحصول على الطلبات   ", "dots", 30000);
        this.server.ServerRequest("book", "GetUserRequestedTrips", this.data).then(result => {
          var data = JSON.parse(JSON.stringify(result));
          if (data == undefined || data == null) {
            this.trips = null;
          } else {
            this.trips = data;
          }
        });
        break;
      default:
        break;
    }
  }
  Refresh() {
    this.language = localStorage.getItem('Language');
    switch (this.language) {
      case 'en':
        this.data = {
          user_id: localStorage.getItem("ID")
        };
        this.server.HiddenServerRequest("book", "GetUserRequestedTrips", this.data).then(result => {
          var data = JSON.parse(JSON.stringify(result));
          if (data == undefined || data == null) {
            this.trips = null;
          } else {
            this.trips = data;
          }
        });
        break;
      case 'ar':
        this.data = {
          user_id: localStorage.getItem("ID")
        };
        this.server.HiddenServerRequest("book", "GetUserRequestedTrips", this.data).then(result => {
          var data = JSON.parse(JSON.stringify(result));
          if (data == undefined || data == null) {
            this.trips = null;
          } else {
            this.trips = data;
          }
        });
        break;
      default:
        break;
    }
  }
  AcceptTrip(trip, index) {
    this.language = localStorage.getItem('Language');
    switch (this.language) {
      case 'en':
        this.data = {
          trip_id: this.trips[index].trip_id
        };
        this.server.CreateLoading("Confirming Request", "dots", 30000);
        this.server.ServerRequest("book", "ConfirmRequest", this.data).then(result => {
          var data = JSON.parse(JSON.stringify(result));
          if (data.response != "Ok") {
            this.server.CreateAlert("Operation Failed", "Please try again later", ["Close"]);
          } else {
            this.server.CreateAlert("Operation Successful", "Confirmed Successfully", ["Close"]);
            this.server.MassNotifications("Trip Request Confirmed", "Please check the trip status", "99");
            this.Refresh();
          }
        });
        break;
      case 'ar':
        this.data = {
          trip_id: this.trips[index].trip_id
        };
        this.server.CreateLoading("جاري تاكيد الطلب", "dots", 30000);
        this.server.ServerRequest("book", "ConfirmRequest", this.data).then(result => {
          var data = JSON.parse(JSON.stringify(result));
          if (data.response != "Ok") {
            this.server.CreateAlert("فشلت العملية", "الرجاء المحاولة مرة اخرى", ["إغلاق"]);
          } else {
            this.server.CreateAlert("نجحت العملية", "تم التاكيد بنجاح", ["إغلاق"]);
            this.server.MassNotifications("تم قبول طلب الرحلة", "يرجى التحقق من حالة الرحلة", "99");
            this.Refresh();
          }
        });
        break;
      default:
        break;
    }
  }
  RejectTrip(trip, index) {
    this.language = localStorage.getItem('Language');
    switch (this.language) {
      case 'en':
        this.data = {
          trip_id: trip.trip_id,
          status: 3
        };
        this.server.CreateLoading("Rejecting Request", "dots", 30000);
        this.server.ServerRequest("book", "RejectRequest", this.data).then(result => {
          var data = JSON.parse(JSON.stringify(result));
          if (data.response != "Ok") {
            this.server.CreateAlert("Operation Failed", "Please try again later", ["Close"]);
          } else {
            this.server.CreateAlert("Operation Successful", "Rejected Successfully", ["Close"]);
            this.server.MassNotifications("Trip Request Rejected", "Cost too high", "99");
            this.Refresh();
          }
        });
        break;
      case 'ar':
        this.data = {
          trip_id: this.trips[index].trip_id,
          status: 3
        };
        this.server.CreateLoading("جاري رفض الطلب  ", "dots", 30000);
        this.server.ServerRequest("book", "RejectRequest", this.data).then(result => {
          var data = JSON.parse(JSON.stringify(result));
          if (data.response != "Ok") {
            this.server.CreateAlert("فشلت العملية", "الرجاء المحاولة مرة اخرى", ["إغلاق"]);
          } else {
            this.server.CreateAlert("نجحت العملية", "تم الرفض بنجاح", ["إغلاق"]);
            this.server.MassNotifications("تم رفض طلب الرحلة", "السعر مرتفع", "99");
            this.Refresh();
          }
        });
        break;
      default:
        break;
    }
  }
  Request(form) {
    this.language = localStorage.getItem('Language');
    switch (this.language) {
      case 'en':
        if (form.triptypeen == "" || form.triptypeen == null || form.bustypeen == "" || form.bustypeen == null || form.buscounten == "" || form.buscounten == null || form.fromen == "" || form.fromen == null || form.toen == "" || form.toen == null || form.phoneen == "" || form.phoneen == null || this.trip_date == "" || this.trip_date == null) {
          this.server.CreateAlert("Warning", "Please enter all required fields", ["Close"]);
          return;
        }
        if (form.fromen.length < 3 || form.toen.length < 3) {
          this.server.CreateAlert("Warning", "3 characters minimum are required for Pickup and Dropoff Locations", ["Close"]);
          return;
        }
        if (Number(form.buscounten) < 1) {
          this.server.CreateAlert("Warning", "One bus minimum is required", ["Close"]);
          return;
        }
        this.data = {
          user_id: this.user_id,
          trip_type: form.triptypeen,
          bus_type: form.bustypeen,
          bus_count: form.buscounten,
          pickup: form.fromen,
          dropoff: form.toen,
          trip_date : this.trip_date,
          phone: form.phoneen,
        };
        this.server.CreateLoading("Requesting Trip", "dots", 30000);
        this.server.ServerRequest("book", "RequestTrip", this.data).then(result => {
          var data = JSON.parse(JSON.stringify(result));
          if (data.response == "pending") {
            this.server.CreateAlert("Operation Failed", "You already have a pending request, Please wait.", ["Close"]);
          } else {
            if (data.response != "Ok") {
              this.server.CreateAlert("Operation Failed", "Please try again later", ["Close"]);
            }
            else {
              this.server.CreateAlert("Operation Successful", "Requested Successfully, Please wait for confirmation, We will get back to you ASAP", ["Close"]);
              this.server.MassNotifications("Trip Request", "Please check the requested trip", "99");
              $('#requesttripformen').each(function () {
                this.reset();
              });
              this.Refresh();
            }
          }
        });
        break;
      case 'ar':
        if (form.triptypear == "" || form.triptypear == null || form.bustypear == "" || form.bustypear == null || form.buscountar == "" || form.buscountar == null || form.fromar == "" || form.fromar == null || form.toar == "" || form.toar == null || form.phonear == "" || form.phonear == null || this.trip_date == "" || this.trip_date == null) {
          this.server.CreateAlert("تحذير", "الرجاء إدخال جميع الحقول المطلوبة", ["اغلق"]);
          return;
        }        
        if (form.fromar.length < 3 || form.toar.length < 3) {
          this.server.CreateAlert("تحذير", "ثلاث حروف على الأقل ضرورية بالنسبة لمكان الانطلاق ومكان الوصول", ["اغلق"]);
          return;
        }
        if (Number(form.buscountar) < 1) {
          this.server.CreateAlert("تحذير", "الرجاء إختيار عدد الباصات", ["اغلق"]);
          return;
        }
        this.data = {
          user_id: this.user_id,
          trip_type: form.triptypear,
          bus_type: form.bustypear,
          bus_count: form.buscountar,
          pickup: form.fromar,
          dropoff: form.toar,
          trip_date : this.trip_date,
          phone: form.phonear,
        };
        this.server.CreateLoading("جاري طلب الرحلة", "dots", 30000);
        this.server.ServerRequest("book", "RequestTrip", this.data).then(result => {
          var data = JSON.parse(JSON.stringify(result));
          if (data.response == "pending") {
            this.server.CreateAlert("فشلت العملية", "لديك طلب معلق ، الرجاء الانتظار حتى تتم معالجة طلبك.", ["إغلاق"]);
          } else {
            if (data.response != "Ok") {
              this.server.CreateAlert("فشلت العملية", "الرجاء المحاولة مرة اخرى", ["إغلاق"]);
            } else {
              this.server.CreateAlert("نجحت العملية", "تم الطلب بنجاح، الرجاء انتظار التاكيد، سوف نقوم بالرجوع اليك في اقرب فرصة ممكنة", ["إغلاق"]);
              this.server.MassNotifications('طلب رحلة', 'الرجاء التحقق من طلب الرحلة', '99');
              $('#requesttripformar').each(function () {
                this.reset();
              });
              this.Refresh();
            }
          }
        });
        break;
      default:
        break;
    }
  }

  Validate() {
    setTimeout(function () {
      $("#requesttripformen").bootstrapValidator({
        message: "This value is not valid", feedbackIcons: {
          valid: "glyphicon glyphicon-ok", invalid: "glyphicon glyphicon-remove", validating: "glyphicon glyphicon-refresh"
        }
        , fields: {
          triptypeen: {
            validators: {
              notEmpty: {
                message: "Please select Trip Type"
              }
            }
          },
          bustypeen: {
            validators: {
              notEmpty: {
                message: "Please select Bus Type"
              }
            }
          },
          buscounten: {
            validators: {
              notEmpty: {
                message: 'Please enter bus count'
              },
              stringLength: {
                min: 1,
                max: 2,
                message: 'You cannot order more than 99 buses'
              },
              regexp: {
                regexp: /^[0-9]*$/,
                message: "bus count must contain numbers only"
              }
            }
          },
          fromen: {
            validators: {
              notEmpty: {
                message: "Please enter pickup location"
              }
              , stringLength: {
                min: 1, max: 150, message: "Please make sure pickup location is more than 6 and less than 150 characters."
              }
              , regexp: {
                regexp: /^[A-Z a-z\u0621-\u064A\u0660-\u0669]+$/, message: "please make sure that you enter characters only."
              }
            }
          },
          toen: {
            validators: {
              notEmpty: {
                message: "Please enter dropoff location"
              }
              , stringLength: {
                min: 1, max: 150, message: "Please make sure dropoff location is more than 6 and less than 150 characters."
              }
              , regexp: {
                regexp: /^[A-Z a-z\u0621-\u064A\u0660-\u0669]+$/, message: "please make sure that you enter characters only."
              }
            }
          },
          phoneen: {
            validators: {
              notEmpty: {
                message: 'Please enter phone'
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
      $("#requesttripformar").bootstrapValidator({
        message: "This value is not valid", feedbackIcons: {
          valid: "glyphicon glyphicon-ok", invalid: "glyphicon glyphicon-remove", validating: "glyphicon glyphicon-refresh"
        }
        , fields: {
          triptypear: {
            validators: {
              notEmpty: {
                message: "الرجاء اختيار نوع الرحلة"
              }
            }
          },
          bustypear: {
            validators: {
              notEmpty: {
                message: "الرجاء اختيار نوع الباص"
              }
            }
          },
          buscountar: {
            validators: {
              notEmpty: {
                message: 'الرجاء ادخال عدد البصات'
              },
              stringLength: {
                min: 1,
                max: 2,
                message: 'لا يمكنك طلب أكثر من 99 بص'
              },
              regexp: {
                regexp: /^[0-9]*$/,
                message: "يجب أن يحتوي عدد البصات على أرقام فقط"
              }
            }
          },
          fromar: {
            validators: {
              notEmpty: {
                message: "الرجاء إدخال مكان القيام"
              }
              , stringLength: {
                min: 1, max: 150, message: "يرجى التأكد من ان مكان القيام أكثر من 6 وأقل من 150 حرفا."
              }
              , regexp: {
                regexp: /^[A-Z a-z\u0621-\u064A\u0660-\u0669]+$/, message: "يرجى التأكد من إدخال الأحرف فقط."
              }
            }
          },
          toar: {
            validators: {
              notEmpty: {
                message: "الرجاء ادخال مكان الوصول"
              }
              , stringLength: {
                min: 1, max: 150, message: "يرجى التأكد من ان مكان الوصول أكثر من 6 وأقل من 150 حرفا."
              }
              , regexp: {
                regexp: /^[A-Z a-z\u0621-\u064A\u0660-\u0669]+$/, message: "يرجى التأكد من إدخال الأحرف فقط."
              }
            }
          },
          phonear: {
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
