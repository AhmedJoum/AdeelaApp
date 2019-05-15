import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { TranslateService } from '@ngx-translate/core';
declare var $: any;

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  language: any = localStorage.getItem('AdeeelaLanguage');
  user_id: any = localStorage.getItem('AdeeelaID');
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
  price: any = sessionStorage.getItem("TicketPrice");
  date: any = sessionStorage.getItem("Date");
  data: any;
  seats = [];
  package = [];
  total: any;
  constructor(public translate: TranslateService, public server: ServerProvider, public navCtrl: NavController, public navParams: NavParams) {
    translate.use(this.language);
    this.seats = navParams.data;
    this.seats.sort(function (a, b) { return a - b; });
    this.total = this.price * this.seats.length;
  }

  ionViewWillEnter() {
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

  Book(form) {
    this.package = [];
    this.language = localStorage.getItem("AdeeelaLanguage");
    switch (this.language) {
      case 'en':
        for (let i = 0; i < this.seats.length; i++) {
          if ($("#passengernameen" + i).val() == null || $("#passengernameen" + i).val() == "" || $("#passengerphoneen" + i).val() == null || $("#passengerphoneen" + i).val() == "") {
            return;
          }
          this.data = {
            user_id: this.user_id,
            route_id: this.route_id,
            agency_id: this.agency_id,
            from_en: this.from,
            to_en: this.to,
            passenger_name: $("#passengernameen" + i).val(),
            passenger_phone: $("#passengerphoneen" + i).val(),
            seat_no: this.seats[i],
            bus_no: this.bus_no,
            bus_level: this.level,
            date: this.date,
            time: this.time,
            price: this.price,
            customer_name: localStorage.getItem("AdeeelaName"),
            status: 1,
            language: "en"
          };
          this.package.push(this.data);
        }
        sessionStorage.setItem("Total", this.total);
        this.navCtrl.push("MethodsPage", this.package);
        break;

      case 'ar':
        for (let i = 0; i < this.seats.length; i++) {
          if ($("#passengernamear" + i).val() == null || $("#passengernamear" + i).val() == "" || $("#passengerphonear" + i).val() == null || $("#passengerphonear" + i).val() == "") {
            return;
          }
          this.data = {
            user_id: this.user_id,
            route_id: this.route_id,
            agency_id: this.agency_id,
            passenger_name: $("#passengernamear" + i).val(),
            passenger_phone: $("#passengerphonear" + i).val(),
            from_ar: this.from,
            to_ar: this.to,
            seat_no: this.seats[i],
            bus_no: this.bus_no,
            bus_level: this.level,
            date: this.date,
            time: this.time,
            price: this.price,
            customer_name: localStorage.getItem("AdeeelaName"),
            status: 1,
            language: "ar"
          };
          this.package.push(this.data);
        }
        sessionStorage.setItem("Total", this.total);
        this.navCtrl.push("MethodsPage", this.package);
        break;
      default:
        break;
    }
  }

  Validate() {
    setTimeout(function () {
      $("#bookingen").bootstrapValidator({
        message: "This value is not valid", feedbackIcons: {
          valid: "glyphicon glyphicon-ok", invalid: "glyphicon glyphicon-remove", validating: "glyphicon glyphicon-refresh"
        }
        , fields: {
          passengernameen0: {
            validators: {
              notEmpty: {
                message: "Please enter passenger name"
              }
              , stringLength: {
                min: 6, max: 50, message: "Please make sure passenger name is more than 6 and less than 50 characters."
              }
              , regexp: {
                regexp: /^[A-Z a-z\u0621-\u064A\u0660-\u0669]+$/, message: "please make sure that you enter characters only."
              }
            }
          },
          passengerphoneen0: {
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
          },
          bookingtypeen0: {
            validators: {
              notEmpty: {
                message: "Please select Booking Type"
              }
            }
          },
          passengernameen1: {
            validators: {
              notEmpty: {
                message: "Please enter passenger name"
              }
              , stringLength: {
                min: 6, max: 50, message: "Please make sure passenger name is more than 6 and less than 50 characters."
              }
              , regexp: {
                regexp: /^[A-Z a-z\u0621-\u064A\u0660-\u0669]+$/, message: "please make sure that you enter characters only."
              }
            }
          },
          passengerphoneen1: {
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
          },
          bookingtypeen1: {
            validators: {
              notEmpty: {
                message: "Please select Booking Type"
              }
            }
          },
          passengernameen2: {
            validators: {
              notEmpty: {
                message: "Please enter passenger name"
              }
              , stringLength: {
                min: 6, max: 50, message: "Please make sure passenger name is more than 6 and less than 50 characters."
              }
              , regexp: {
                regexp: /^[A-Z a-z\u0621-\u064A\u0660-\u0669]+$/, message: "please make sure that you enter characters only."
              }
            }
          },
          passengerphoneen2: {
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
          },
          bookingtypeen2: {
            validators: {
              notEmpty: {
                message: "Please select Booking Type"
              }
            }
          },
          passengernameen3: {
            validators: {
              notEmpty: {
                message: "Please enter passenger name"
              }
              , stringLength: {
                min: 6, max: 50, message: "Please make sure passenger name is more than 6 and less than 50 characters."
              }
              , regexp: {
                regexp: /^[A-Z a-z\u0621-\u064A\u0660-\u0669]+$/, message: "please make sure that you enter characters only."
              }
            }
          },
          passengerphoneen3: {
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
          },
          bookingtypeen3: {
            validators: {
              notEmpty: {
                message: "Please select Booking Type"
              }
            }
          },
          passengernameen4: {
            validators: {
              notEmpty: {
                message: "Please enter passenger name"
              }
              , stringLength: {
                min: 6, max: 50, message: "Please make sure passenger name is more than 6 and less than 50 characters."
              }
              , regexp: {
                regexp: /^[A-Z a-z\u0621-\u064A\u0660-\u0669]+$/, message: "please make sure that you enter characters only."
              }
            }
          },
          passengerphoneen4: {
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
          },
          bookingtypeen4: {
            validators: {
              notEmpty: {
                message: "Please select Booking Type"
              }
            }
          },
          passengernameen5: {
            validators: {
              notEmpty: {
                message: "Please enter passenger name"
              }
              , stringLength: {
                min: 6, max: 50, message: "Please make sure passenger name is more than 6 and less than 50 characters."
              }
              , regexp: {
                regexp: /^[A-Z a-z\u0621-\u064A\u0660-\u0669]+$/, message: "please make sure that you enter characters only."
              }
            }
          },
          passengerphoneen5: {
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
          },
          bookingtypeen5: {
            validators: {
              notEmpty: {
                message: "Please select Booking Type"
              }
            }
          },
          passengernameen6: {
            validators: {
              notEmpty: {
                message: "Please enter passenger name"
              }
              , stringLength: {
                min: 6, max: 50, message: "Please make sure passenger name is more than 6 and less than 50 characters."
              }
              , regexp: {
                regexp: /^[A-Z a-z\u0621-\u064A\u0660-\u0669]+$/, message: "please make sure that you enter characters only."
              }
            }
          },
          passengerphoneen6: {
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
          },
          bookingtypeen6: {
            validators: {
              notEmpty: {
                message: "Please select Booking Type"
              }
            }
          },
          passengernameen7: {
            validators: {
              notEmpty: {
                message: "Please enter passenger name"
              }
              , stringLength: {
                min: 6, max: 50, message: "Please make sure passenger name is more than 6 and less than 50 characters."
              }
              , regexp: {
                regexp: /^[A-Z a-z\u0621-\u064A\u0660-\u0669]+$/, message: "please make sure that you enter characters only."
              }
            }
          },
          passengerphoneen7: {
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
          },
          bookingtypeen7: {
            validators: {
              notEmpty: {
                message: "Please select Booking Type"
              }
            }
          },
          passengernameen8: {
            validators: {
              notEmpty: {
                message: "Please enter passenger name"
              }
              , stringLength: {
                min: 6, max: 50, message: "Please make sure passenger name is more than 6 and less than 50 characters."
              }
              , regexp: {
                regexp: /^[A-Z a-z\u0621-\u064A\u0660-\u0669]+$/, message: "please make sure that you enter characters only."
              }
            }
          },
          passengerphoneen8: {
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
          },
          bookingtypeen8: {
            validators: {
              notEmpty: {
                message: "Please select Booking Type"
              }
            }
          },
          passengernameen9: {
            validators: {
              notEmpty: {
                message: "Please enter passenger name"
              }
              , stringLength: {
                min: 6, max: 50, message: "Please make sure passenger name is more than 6 and less than 50 characters."
              }
              , regexp: {
                regexp: /^[A-Z a-z\u0621-\u064A\u0660-\u0669]+$/, message: "please make sure that you enter characters only."
              }
            }
          },
          passengerphoneen9: {
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
          },
          bookingtypeen9: {
            validators: {
              notEmpty: {
                message: "Please select Booking Type"
              }
            }
          },
          passengernameen10: {
            validators: {
              notEmpty: {
                message: "Please enter passenger name"
              }
              , stringLength: {
                min: 6, max: 50, message: "Please make sure passenger name is more than 6 and less than 50 characters."
              }
              , regexp: {
                regexp: /^[A-Z a-z\u0621-\u064A\u0660-\u0669]+$/, message: "please make sure that you enter characters only."
              }
            }
          },
          passengerphoneen10: {
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
          },
          bookingtypeen10: {
            validators: {
              notEmpty: {
                message: "Please select Booking Type"
              }
            }
          },
          passengernameen11: {
            validators: {
              notEmpty: {
                message: "Please enter passenger name"
              }
              , stringLength: {
                min: 6, max: 50, message: "Please make sure passenger name is more than 6 and less than 50 characters."
              }
              , regexp: {
                regexp: /^[A-Z a-z\u0621-\u064A\u0660-\u0669]+$/, message: "please make sure that you enter characters only."
              }
            }
          },
          passengerphoneen11: {
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
          },
          bookingtypeen11: {
            validators: {
              notEmpty: {
                message: "Please select Booking Type"
              }
            }
          },
          passengernameen12: {
            validators: {
              notEmpty: {
                message: "Please enter passenger name"
              }
              , stringLength: {
                min: 6, max: 50, message: "Please make sure passenger name is more than 6 and less than 50 characters."
              }
              , regexp: {
                regexp: /^[A-Z a-z\u0621-\u064A\u0660-\u0669]+$/, message: "please make sure that you enter characters only."
              }
            }
          },
          passengerphoneen12: {
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
          },
          bookingtypeen12: {
            validators: {
              notEmpty: {
                message: "Please select Booking Type"
              }
            }
          },
          passengernameen13: {
            validators: {
              notEmpty: {
                message: "Please enter passenger name"
              }
              , stringLength: {
                min: 6, max: 50, message: "Please make sure passenger name is more than 6 and less than 50 characters."
              }
              , regexp: {
                regexp: /^[A-Z a-z\u0621-\u064A\u0660-\u0669]+$/, message: "please make sure that you enter characters only."
              }
            }
          },
          passengerphoneen13: {
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
          },
          bookingtypeen13: {
            validators: {
              notEmpty: {
                message: "Please select Booking Type"
              }
            }
          },
          passengernameen14: {
            validators: {
              notEmpty: {
                message: "Please enter passenger name"
              }
              , stringLength: {
                min: 6, max: 50, message: "Please make sure passenger name is more than 6 and less than 50 characters."
              }
              , regexp: {
                regexp: /^[A-Z a-z\u0621-\u064A\u0660-\u0669]+$/, message: "please make sure that you enter characters only."
              }
            }
          },
          passengerphoneen14: {
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
          },
          bookingtypeen14: {
            validators: {
              notEmpty: {
                message: "Please select Booking Type"
              }
            }
          }
        }
      }).on('success.form.bv', function (e) { e.preventDefault(); });
      $("#bookingar").bootstrapValidator({
        message: "This value is not valid", feedbackIcons: {
          valid: "glyphicon glyphicon-ok", invalid: "glyphicon glyphicon-remove", validating: "glyphicon glyphicon-refresh"
        }
        , fields: {
          passengernamear0: {
            validators: {
              notEmpty: {
                message: "الرجاء إدخال اسم الراكب"
              }
              , stringLength: {
                min: 6, max: 150, message: "يرجى التأكد من ان اسم الراكب أكثر من 6 وأقل من 150 حرفا."
              }
              , regexp: {
                regexp: /^[A-Z a-z\u0621-\u064A\u0660-\u0669]+$/, message: "يرجى التأكد من إدخال الأحرف فقط."
              }
            }
          },
          passengerphonear0: {
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
          },
          bookingtypear0: {
            validators: {
              notEmpty: {
                message: "الرجاء اختيار نوع الحجز"
              }
            }
          },
          passengernamear1: {
            validators: {
              notEmpty: {
                message: "الرجاء إدخال اسم الراكب"
              }
              , stringLength: {
                min: 6, max: 150, message: "يرجى التأكد من ان اسم الراكب أكثر من 6 وأقل من 150 حرفا."
              }
              , regexp: {
                regexp: /^[A-Z a-z\u0621-\u064A\u0660-\u0669]+$/, message: "يرجى التأكد من إدخال الأحرف فقط."
              }
            }
          },
          passengerphonear1: {
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
          },
          bookingtypear1: {
            validators: {
              notEmpty: {
                message: "الرجاء اختيار نوع الحجز"
              }
            }
          },
          passengernamear2: {
            validators: {
              notEmpty: {
                message: "الرجاء إدخال اسم الراكب"
              }
              , stringLength: {
                min: 6, max: 150, message: "يرجى التأكد من ان اسم الراكب أكثر من 6 وأقل من 150 حرفا."
              }
              , regexp: {
                regexp: /^[A-Z a-z\u0621-\u064A\u0660-\u0669]+$/, message: "يرجى التأكد من إدخال الأحرف فقط."
              }
            }
          },
          passengerphonear2: {
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
          },
          bookingtypear2: {
            validators: {
              notEmpty: {
                message: "الرجاء اختيار نوع الحجز"
              }
            }
          },
          passengernamear3: {
            validators: {
              notEmpty: {
                message: "الرجاء إدخال اسم الراكب"
              }
              , stringLength: {
                min: 6, max: 150, message: "يرجى التأكد من ان اسم الراكب أكثر من 6 وأقل من 150 حرفا."
              }
              , regexp: {
                regexp: /^[A-Z a-z\u0621-\u064A\u0660-\u0669]+$/, message: "يرجى التأكد من إدخال الأحرف فقط."
              }
            }
          },
          passengerphonear3: {
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
          },
          bookingtypear3: {
            validators: {
              notEmpty: {
                message: "الرجاء اختيار نوع الحجز"
              }
            }
          },
          passengernamear4: {
            validators: {
              notEmpty: {
                message: "الرجاء إدخال اسم الراكب"
              }
              , stringLength: {
                min: 6, max: 150, message: "يرجى التأكد من ان اسم الراكب أكثر من 6 وأقل من 150 حرفا."
              }
              , regexp: {
                regexp: /^[A-Z a-z\u0621-\u064A\u0660-\u0669]+$/, message: "يرجى التأكد من إدخال الأحرف فقط."
              }
            }
          },
          passengerphonear4: {
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
          },
          bookingtypear4: {
            validators: {
              notEmpty: {
                message: "الرجاء اختيار نوع الحجز"
              }
            }
          },
          passengernamear5: {
            validators: {
              notEmpty: {
                message: "الرجاء إدخال اسم الراكب"
              }
              , stringLength: {
                min: 6, max: 150, message: "يرجى التأكد من ان اسم الراكب أكثر من 6 وأقل من 150 حرفا."
              }
              , regexp: {
                regexp: /^[A-Z a-z\u0621-\u064A\u0660-\u0669]+$/, message: "يرجى التأكد من إدخال الأحرف فقط."
              }
            }
          },
          passengerphonear5: {
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
          },
          bookingtypear5: {
            validators: {
              notEmpty: {
                message: "الرجاء اختيار نوع الحجز"
              }
            }
          },
          passengernamear6: {
            validators: {
              notEmpty: {
                message: "الرجاء إدخال اسم الراكب"
              }
              , stringLength: {
                min: 6, max: 150, message: "يرجى التأكد من ان اسم الراكب أكثر من 6 وأقل من 150 حرفا."
              }
              , regexp: {
                regexp: /^[A-Z a-z\u0621-\u064A\u0660-\u0669]+$/, message: "يرجى التأكد من إدخال الأحرف فقط."
              }
            }
          },
          passengerphonear6: {
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
          },
          bookingtypear6: {
            validators: {
              notEmpty: {
                message: "الرجاء اختيار نوع الحجز"
              }
            }
          },
          passengernamear7: {
            validators: {
              notEmpty: {
                message: "الرجاء إدخال اسم الراكب"
              }
              , stringLength: {
                min: 6, max: 150, message: "يرجى التأكد من ان اسم الراكب أكثر من 6 وأقل من 150 حرفا."
              }
              , regexp: {
                regexp: /^[A-Z a-z\u0621-\u064A\u0660-\u0669]+$/, message: "يرجى التأكد من إدخال الأحرف فقط."
              }
            }
          },
          passengerphonear7: {
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
          },
          bookingtypear7: {
            validators: {
              notEmpty: {
                message: "الرجاء اختيار نوع الحجز"
              }
            }
          },
          passengernamear8: {
            validators: {
              notEmpty: {
                message: "الرجاء إدخال اسم الراكب"
              }
              , stringLength: {
                min: 6, max: 150, message: "يرجى التأكد من ان اسم الراكب أكثر من 6 وأقل من 150 حرفا."
              }
              , regexp: {
                regexp: /^[A-Z a-z\u0621-\u064A\u0660-\u0669]+$/, message: "يرجى التأكد من إدخال الأحرف فقط."
              }
            }
          },
          passengerphonear8: {
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
          },
          bookingtypear8: {
            validators: {
              notEmpty: {
                message: "الرجاء اختيار نوع الحجز"
              }
            }
          },
          passengernamear9: {
            validators: {
              notEmpty: {
                message: "الرجاء إدخال اسم الراكب"
              }
              , stringLength: {
                min: 6, max: 150, message: "يرجى التأكد من ان اسم الراكب أكثر من 6 وأقل من 150 حرفا."
              }
              , regexp: {
                regexp: /^[A-Z a-z\u0621-\u064A\u0660-\u0669]+$/, message: "يرجى التأكد من إدخال الأحرف فقط."
              }
            }
          },
          passengerphonear9: {
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
          },
          bookingtypear9: {
            validators: {
              notEmpty: {
                message: "الرجاء اختيار نوع الحجز"
              }
            }
          },
          passengernamear10: {
            validators: {
              notEmpty: {
                message: "الرجاء إدخال اسم الراكب"
              }
              , stringLength: {
                min: 6, max: 150, message: "يرجى التأكد من ان اسم الراكب أكثر من 6 وأقل من 150 حرفا."
              }
              , regexp: {
                regexp: /^[A-Z a-z\u0621-\u064A\u0660-\u0669]+$/, message: "يرجى التأكد من إدخال الأحرف فقط."
              }
            }
          },
          passengerphonear10: {
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
          },
          bookingtypear10: {
            validators: {
              notEmpty: {
                message: "الرجاء اختيار نوع الحجز"
              }
            }
          },
          passengernamear11: {
            validators: {
              notEmpty: {
                message: "الرجاء إدخال اسم الراكب"
              }
              , stringLength: {
                min: 6, max: 150, message: "يرجى التأكد من ان اسم الراكب أكثر من 6 وأقل من 150 حرفا."
              }
              , regexp: {
                regexp: /^[A-Z a-z\u0621-\u064A\u0660-\u0669]+$/, message: "يرجى التأكد من إدخال الأحرف فقط."
              }
            }
          },
          passengerphonear11: {
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
          },
          bookingtypear11: {
            validators: {
              notEmpty: {
                message: "الرجاء اختيار نوع الحجز"
              }
            }
          },
          passengernamear12: {
            validators: {
              notEmpty: {
                message: "الرجاء إدخال اسم الراكب"
              }
              , stringLength: {
                min: 6, max: 150, message: "يرجى التأكد من ان اسم الراكب أكثر من 6 وأقل من 150 حرفا."
              }
              , regexp: {
                regexp: /^[A-Z a-z\u0621-\u064A\u0660-\u0669]+$/, message: "يرجى التأكد من إدخال الأحرف فقط."
              }
            }
          },
          passengerphonear12: {
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
          },
          bookingtypear12: {
            validators: {
              notEmpty: {
                message: "الرجاء اختيار نوع الحجز"
              }
            }
          },
          passengernamear13: {
            validators: {
              notEmpty: {
                message: "الرجاء إدخال اسم الراكب"
              }
              , stringLength: {
                min: 6, max: 150, message: "يرجى التأكد من ان اسم الراكب أكثر من 6 وأقل من 150 حرفا."
              }
              , regexp: {
                regexp: /^[A-Z a-z\u0621-\u064A\u0660-\u0669]+$/, message: "يرجى التأكد من إدخال الأحرف فقط."
              }
            }
          },
          passengerphonear13: {
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
          },
          bookingtypear13: {
            validators: {
              notEmpty: {
                message: "الرجاء اختيار نوع الحجز"
              }
            }
          },
          passengernamear14: {
            validators: {
              notEmpty: {
                message: "الرجاء إدخال اسم الراكب"
              }
              , stringLength: {
                min: 6, max: 150, message: "يرجى التأكد من ان اسم الراكب أكثر من 6 وأقل من 150 حرفا."
              }
              , regexp: {
                regexp: /^[A-Z a-z\u0621-\u064A\u0660-\u0669]+$/, message: "يرجى التأكد من إدخال الأحرف فقط."
              }
            }
          },
          passengerphonear14: {
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
          },
          bookingtypear14: {
            validators: {
              notEmpty: {
                message: "الرجاء اختيار نوع الحجز"
              }
            }
          },
          passengernamear15: {
            validators: {
              notEmpty: {
                message: "الرجاء إدخال اسم الراكب"
              }
              , stringLength: {
                min: 6, max: 150, message: "يرجى التأكد من ان اسم الراكب أكثر من 6 وأقل من 150 حرفا."
              }
              , regexp: {
                regexp: /^[A-Z a-z\u0621-\u064A\u0660-\u0669]+$/, message: "يرجى التأكد من إدخال الأحرف فقط."
              }
            }
          },
          passengerphonear15: {
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
          },
          bookingtypear15: {
            validators: {
              notEmpty: {
                message: "الرجاء اختيار نوع الحجز"
              }
            }
          }
        }
      }).on('success.form.bv', function (e) { e.preventDefault(); });
    }, 1000);
  }
}
