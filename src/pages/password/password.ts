import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { ServerProvider } from '../../providers/server/server';
declare var $: any;

@IonicPage()
@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
})
export class PasswordPage {
  language: any = localStorage.getItem('Language');
  logged: any = localStorage.getItem("LoggedIn");
  token: any = localStorage.getItem("Token");
  id: any = localStorage.getItem("ID");
  constructor(public server: ServerProvider, public translate: TranslateService, public navCtrl: NavController, public navParams: NavParams) {
    translate.use(this.language);
  }

  ionViewWillEnter() {
    this.Validate();
    this.language = localStorage.getItem("Language");
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
  ionViewWillLeave() {
    $(".en").removeClass("space-30");
    $(".ar").removeClass("space-30");
  }
  EnterEn(form) {
    if (form.password == null || form.password == undefined || form.password == "") {
      this.server.CreateAlert("Warning", "Please enter your password", ['Close']);
    } else {
      var data = {
        id: this.id,
        password: form.password,
        token: this.token
      };
      this.server.CreateLoading("Verifing", "dots", 20000);
      this.server.ServerRequest('auth', 'NormalPasswordVerify', data).then(result => {
        var data = JSON.parse(JSON.stringify(result));
        if (data.response != "Ok") {
          this.server.CreateAlert("Verification Failed", "Incorrect Password", [{
            text: 'Close'
          }, {
            text: 'Forgot Password',
            handler: data => {
              this.navCtrl.push("ForgotPage");
            }
          }]);
        } else {
          this.navCtrl.push("AccountPage");
        }
      });
    }
  }
  EnterAr(form) {
    if (form.ppassword == null || form.ppassword == undefined || form.ppassword == "") {
      this.server.CreateAlert("تحذير", "الرجاء إدخال كلمة المرور", ['إغلاق']);
    } else {
      var data = {
        id: this.id,
        password: form.ppassword,
        token: this.token
      };
      this.server.CreateLoading("جاري التحقق", "dots", 20000);
      this.server.ServerRequest('auth', 'NormalPasswordVerify', data).then(result => {
        var data = JSON.parse(JSON.stringify(result));
        if (data.response != "Ok") {
          this.server.CreateAlert("فشل التحقق", "كلمة المرور خاطئة", [{
            text: 'إغلاق'
          }, {
            text: 'نسيت كلمة المرور',
            handler: data => {
              this.navCtrl.push("ForgotPage");
            }
          }]);
        } else {
          this.navCtrl.push("AccountPage");
        }
      });
    }
  }

  Validate() {

    $("#passwordformen").bootstrapValidator({
      message: "This value is not valid", feedbackIcons: {
        valid: "glyphicon glyphicon-ok", invalid: "glyphicon glyphicon-remove", validating: "glyphicon glyphicon-refresh"
      }
      , fields: {
        username: {
          validators: {
            notEmpty: {
              message: "Please enter your username"
            }
            , stringLength: {
              min: 6, max: 20, message: "Please make sure your username is more than 6 and less than 20 characters."
            }
            , regexp: {
              regexp: /^[A-Za-z0-9\u0621-\u064A\u0660-\u0669]+@+[A-Za-z0-9\u0621-\u064A\u0660-\u0669]+$/, message: "please make sure that you enter characters only and no spaces between them."
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
            }
          }
        }
      }
    }).on('success.form.bv', function (e) { e.preventDefault(); });
    $("#passwordformar").bootstrapValidator({
      message: "This value is not valid", feedbackIcons: {
        valid: "glyphicon glyphicon-ok", invalid: "glyphicon glyphicon-remove", validating: "glyphicon glyphicon-refresh"
      }
      , fields: {
        username: {
          validators: {
            notEmpty: {
              message: "الرجاء إدخال اسم المستخدم"
            }
            , stringLength: {
              min: 6, max: 20, message: "الرجاء التأكد من أن اسم المستخدم أكثر من 6 وأقل من 20 حرفا."
            }
            , regexp: {
              regexp: /^[A-Za-z0-9\u0621-\u064A\u0660-\u0669]+@+[A-Za-z0-9\u0621-\u064A\u0660-\u0669]+$/, message: "الرجاء التأكد من إدخال احرف فقط وعدم وجود مسافات بينها"
            }
          }
        },
        ppassword: {
          validators: {
            notEmpty: {
              message: "الرجاء إدخال كلمة المرور"
            }
            , stringLength: {
              min: 6, max: 20, message: "الرجاء التأكد من أن كلمة المرور أكثر من 6 وأقل من 20 حرفا."
            }
          }
        }
      }
    }).on('success.form.bv', function (e) { e.preventDefault(); });
  }
}
