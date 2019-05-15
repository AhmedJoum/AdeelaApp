import { Component } from '@angular/core';
import { ServerProvider } from '../../providers/server/server';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';

declare var $: any;
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  language: any = localStorage.getItem('AdeeelaLanguage');
  logged: any = localStorage.getItem("AdeeelaLoggedIn");
  token: any = localStorage.getItem("AdeeelaToken");

  constructor(public translate: TranslateService, private server: ServerProvider, public navCtrl: NavController, public navParams: NavParams, private splashScreen: SplashScreen) {
    translate.use(this.language);
  }

  ionViewWillEnter() {
    this.Validate();
    this.IsLogged();
    this.language = localStorage.getItem("AdeeelaLanguage");
    if (this.language == "ar") {
      $(".en").addClass("hidden");
      $(".en").addClass("space-50");
      $(".ar").addClass("space-50");
      $(".leftmenubutton").addClass("hidden");
    } else {
      $(".ar").addClass("hidden");
      $(".ar").addClass("space-50");
      $(".en").addClass("space-50");
      $(".rightmenubutton").addClass("hidden");
    }
  }

  IsLogged() {
    if (this.logged == "1") {
      this.navCtrl.setRoot("TabsPage");
    }
    else {
    }
  }

  LoginAr(form) {
    if (form.phonee === "" || form.phonee == null || form.passwordd === "" || form.passwordd == null) {
      this.server.CreateAlert('تحذير', 'الرجاء ادخال جميع الحقول', ['إغلاق'])
    } else {
      this.server.CreateLoading("جاري تسجيل الدخول", "dots", 20000);
      var data = {
        phone: form.phonee,
        password: form.passwordd,
        token: this.token
      };
      this.server.ServerRequest('auth', 'NormalLogin', data).then(result => {
        var userdata = JSON.parse(JSON.stringify(result));
        if (userdata.response == "Ok") {
          localStorage.setItem("AdeeelaLoggedIn", "1");
          localStorage.setItem("AdeeelaID", userdata.id);
          localStorage.setItem("AdeeelaToken", userdata.token);
          localStorage.setItem("AdeeelaName", userdata.name);
          localStorage.setItem("AdeeelaEmail", userdata.email);
          localStorage.setItem("AdeeelaPhone", userdata.phone);
          localStorage.setItem("AdeeelaGender", userdata.gender);
          this.navCtrl.setRoot("TabsPage");
          this.splashScreen.show();
          setTimeout(() => {
            window.location.reload();
          }, 250);
        } else {
          this.server.CreateAlert('فشل عملبة تسجيل الدخول', 'اسم المستخدم او كلمة المرور خاطئة', [{
            text: 'إغلاق'
          }, {
            text: 'نسيت كلمة المرور',
            handler: data => {
              this.navCtrl.push("ForgotPage");
            }
          }]);
        }
      });
    }
  }
  
  LoginEn(form) {

    if (form.phone === "" || form.phone == null || form.password === "" || form.password == null) {
      this.server.CreateAlert("Warning", "Please enter all required fields", ["Close"]);
    } else {
      this.server.CreateLoading("Logging", "dots", 20000);
      var data = {
        phone: form.phone,
        password: form.password,
        token: this.token
      };
      this.server.ServerRequest('auth', 'NormalLogin', data).then(result => {
        var userdata = JSON.parse(JSON.stringify(result));
        if (userdata.response == "Ok") {
          localStorage.setItem("AdeeelaLoggedIn", "1");
          localStorage.setItem("AdeeelaID", userdata.id);
          localStorage.setItem("AdeeelaToken", userdata.token);
          localStorage.setItem("AdeeelaName", userdata.name);
          localStorage.setItem("AdeeelaEmail", userdata.email);
          localStorage.setItem("AdeeelaPhone", userdata.phone);
          localStorage.setItem("AdeeelaGender", userdata.gender);
          this.navCtrl.setRoot("TabsPage");
          this.splashScreen.show();
          setTimeout(() => {
            window.location.reload();
          }, 250);
        } else {
          this.server.CreateAlert('Login Failed', 'Incorrect Username or Password', [{
            text: 'Forgot Password',
            handler: data => {
              this.navCtrl.push("ForgotPage");
            }
          }, {
            text: 'Close'
          }]);
        }
      });
    }
  }

  Register() {
    this.navCtrl.push("RegisterPage");
  }
  Validate() {

    $("#loginformen").bootstrapValidator({
      message: "This value is not valid", feedbackIcons: {
        valid: "glyphicon glyphicon-ok", invalid: "glyphicon glyphicon-remove", validating: "glyphicon glyphicon-refresh"
      }
      , fields: {
        password: {
          validators: {
            notEmpty: {
              message: "Please enter your password"
            }
            , stringLength: {
              min: 6, max: 20, message: "Please make sure your password is more than 6 and less than 20 characters."
            }
          }
        }, phone: { validators: { notEmpty: { message: "Please enter your phone" }, stringLength: { min: 10, max: 10, message: "Phone must be 10 numbers long" }, regexp: { regexp: /^0+[0-9]*$/, message: "Phone must contain numbers only and must start with 0" } } }
      }
    }).on('success.form.bv', function (e) { e.preventDefault(); });
    $("#loginformar").bootstrapValidator({
      message: "This value is not valid", feedbackIcons: {
        valid: "glyphicon glyphicon-ok", invalid: "glyphicon glyphicon-remove", validating: "glyphicon glyphicon-refresh"
      }
      , fields: {
        passwordd: {
          validators: {
            notEmpty: {
              message: "الرجاء إدخال كلمة المرور"
            }
            , stringLength: {
              min: 6, max: 20, message: "الرجاء التأكد من أن كلمة المرور أكثر من 6 وأقل من 20 حرفا."
            }
          }
        },
        phonee: { validators: { notEmpty: { message: "الرجاء إدخال رقم الهاتف" }, stringLength: { min: 10, max: 10, message: "يجب ان يكون الهاتف 10 ارقام" }, regexp: { regexp: /^0+[0-9]*$/, message: "يجب أن يكون الهاتف أرقام فقط ويجب أن يبدأ ب 0" } } }
      }
    }).on('success.form.bv', function (e) { e.preventDefault(); });
  }
  resetPassword() {

    this.navCtrl.push("NewpasswordPage");
    
  }
}
