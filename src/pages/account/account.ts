import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { TranslateService } from '@ngx-translate/core';

declare var $: any;
@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  language: any = localStorage.getItem('AdeeelaLanguage');
  logged: any = localStorage.getItem('AdeeelaLoggedIn');
  name: any = localStorage.getItem('AdeeelaName');
  gender: any = localStorage.getItem('AdeeelaGender');
  phonee: any;
  emaill: any;
  phone: any;
  email: any;
  constructor(public translate:TranslateService, public server: ServerProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.CheckGender();
    translate.use(this.language);
  }

  CheckGender() {
    this.language = localStorage.getItem("AdeeelaLanguage");
    if (this.gender == "0") {
      if (this.language == "en") {
        this.gender = "Male";
      } else {
        this.gender = "ذكر";
      }
    } else {
      if (this.language == "en") {
        this.gender = "Female";
      } else {
        this.gender = "انثى";
      }
    }
  }

  ionViewWillEnter() {
    this.phonee = localStorage.getItem("AdeeelaPhone");
    this.emaill = localStorage.getItem("AdeeelaEmail");
    this.phone = localStorage.getItem("AdeeelaPhone");
    this.email = localStorage.getItem("AdeeelaEmail");
    this.Validate();
    this.language = localStorage.getItem("AdeeelaLanguage");
    if (this.language == "ar") {
      $(".en").addClass("hidden");
      $(".en").addClass("space-30");
      $(".ar").addClass("space-30");
      $(".leftmenubutton").addClass("hidden");
    } else {
      $(".ar").addClass("hidden");
      $(".ar").addClass("space-30");
      $(".en").addClass("space-30");
      $(".rightmenubutton").addClass("hidden");
    }
  }

  UpdateEn(form) {
    if (form.phone == undefined || form.phone == null || form.phone == "" || form.password == undefined || form.password == null || form.password == "" || form.cpassword == undefined || form.cpassword == null || form.cpassword == "") {
      this.server.CreateAlert('Warning', 'Please enter all fields', ['Close']);
      return;
    }
    var data = {
      id: localStorage.getItem("AdeeelaID"),
      token: localStorage.getItem("AdeeelaToken"),
      index: localStorage.getItem("AdeeelaIndex"),
      phone: form.phone,
      email: form.email,
      password: form.password
    };
    this.server.CreateLoading("Updating...", "dots", 30000);
    this.server.ServerRequest("agency", "UpdateNormalAccountInfo", data).then((result) => {
      if (result != false && result != null) {
        this.server.CreateAlert("Update Success", "Your account have been updated Successfully!", ["Close"]);
        localStorage.setItem("AdeeelaPhone", form.phone);
        localStorage.setItem("AdeeelaEmail", form.email);
        this.navCtrl.popToRoot();
      } else {
        this.server.CreateAlert("Update Failed", "Please try again later", ["close"]);
      }
    });
  }

  UpdateAr(form) {
    if (form.phonee == undefined || form.phonee == null || form.phonee == "" || form.passwordd == undefined || form.passwordd == null || form.passwordd == "" || form.cpasswordd == undefined || form.cpasswordd == null || form.cpasswordd == "") {
      this.server.CreateAlert('إنذار', 'الرجاء ادخال جميع الحقول', ['إغلاق']);
      return;
    }
    var data = {
      id: localStorage.getItem("AdeeelaID"),
      token: localStorage.getItem("AdeeelaToken"),
      index: localStorage.getItem("AdeeelaIndex"),
      phone: form.phonee,
      email: form.emaill,
      password: form.passwordd
    };
    this.server.CreateLoading("جاري التحديث", "dots", 30000);
    this.server.ServerRequest("agency", "UpdateNormalAccountInfo", data).then((result) => {
      if (result != false && result != null) {
        this.server.CreateAlert("نجاح التحديث", "تم تحديث بياناتك بنجاح", ["إغلاق"]);
        localStorage.setItem("AdeeelaPhone", form.phonee);
        localStorage.setItem("AdeeelaEmail", form.emaill);
        this.navCtrl.popToRoot();
      } else {
        this.server.CreateAlert("فشل التحديث", "الرجاء المحاولة لاحقا", ["إغلاق"]);
      }
    });
  }
  
  Validate() {
    $("#accountform").bootstrapValidator({
      message: "This value is not valid", feedbackIcons: {
        valid: "glyphicon glyphicon-ok", invalid: "glyphicon glyphicon-remove", validating: "glyphicon glyphicon-refresh"
      }
      , fields: {
        phone: {
          validators: {
            notEmpty: {
              message: 'Please enter your phone'
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
        email: {
          validators: {
            stringLength: {
              min: 6,
              max: 100,
              message: 'Email must be more than 6 and less than 100 characters long'
            },
            emailAddress: {
              message: 'The input is not a valid email address'
            }
          }
        },
        password: {
          validators: {
            notEmpty: {
              message: "Please enter your password"
            }
            , stringLength: {
              min: 6, max: 20, message: "Please make sure your password is more than 6 and less than 20 characters."
            },
            identical: {
              field: 'password',
              message: 'The password and its confirm are not the same'
            }
          }
        },
        cpassword: {
          validators: {
            notEmpty: {
              message: "Please enter your confirm password"
            }
            , stringLength: {
              min: 6, max: 20, message: "Please make sure your password is more than 6 and less than 20 characters."
            },
            identical: {
              field: 'password',
              message: 'The password and its confirm are not the same'
            }
          }
        }
      }
    }).on('success.form.bv', function (e) { e.preventDefault(); });

    $("#accountform-ar").bootstrapValidator({
      message: "This value is not valid", feedbackIcons: {
        valid: "glyphicon glyphicon-ok", invalid: "glyphicon glyphicon-remove", validating: "glyphicon glyphicon-refresh"
      }
      , fields: {
        phonee: {
          validators: {
            notEmpty: {
              message: "الرجاء إدخال رقم الهاتف"
            },
            stringLength: {
              min: 10,
              max: 10,
              message: "يجب ان يكون الهاتف 10 ارقام"
            },
            regexp: {
              regexp: /^0+[0-9]*$/,
              message: "يجب أن يكون الهاتف أرقام فقط ويجب أن يبدأ ب 0"
            }
          }
        },
        emaill: {
          validators: {
            stringLength: {
              min: 6,
              max: 100,
              message: "يجب أن يتجاوز طول البريد الإلكتروني 6 أحرف وأقل من 100 حرف"
            },
            emailAddress: {
              message: "الإدخال ليس عنوان بريد إلكتروني صالحا"
            }
          }
        },
        passwordd: {
          validators: {
            notEmpty: {
              message: "الرجاء ادخال كلمة المرور."
            }
            , stringLength: {
              min: 6, max: 20, message: "يرجى التأكد من أن كلمة المرور أكثر من 6 وأقل من 20 حرفا."
            }
          }
        },
        cpasswordd: {
          validators: {
            notEmpty: {
              message: "الرجاء ادخال تاكيد كلمة المرور"
            }
            , stringLength: {
              min: 6, max: 20, message: "يرجى التأكد من أن تاكيد كلمة المرور أكثر من 6 وأقل من 20 حرفا."
            },
            identical: {
              field: 'passwordd',
              message: 'كلمة المرور وتأكيدها ليست مطابقة'
            }
          }
        }
      }
    }).on('success.form.bv', function (e) { e.preventDefault(); });
  }
}
