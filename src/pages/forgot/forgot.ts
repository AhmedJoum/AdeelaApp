import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { TranslateService } from '@ngx-translate/core';
declare let $: any;

@IonicPage()
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html',
})
export class ForgotPage {
  language: any = localStorage.getItem('AdeeelaLanguage');
  data:any;
  constructor(public server: ServerProvider, public translate: TranslateService, public navCtrl: NavController, public navParams: NavParams) {
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

  GetPassword(form) {
    this.language = localStorage.getItem('AdeeelaLanguage');
    switch (this.language) {
      case 'en':
        if (form.name == "" || form.name == null || form.phone == "" || form.phone == null ) {
          this.server.CreateAlert("Warning", "Please enter all required fields", ["Close"]);
          return;
        }
        this.data = {
          name: form.name,
          phone: form.phone
        };
        this.server.CreateLoading("Getting Account Details", "dots", 20000);
        this.server.ServerRequest("auth", "GetAccount", this.data).then(result => {
          var data = JSON.parse(JSON.stringify(result));
          if (data.response != "not found") {
            
            this.server.CreateAlert('Password', data.password, ['Close']);
          } else {
            this.server.CreateAlert('Failed', "Account not found, recheck your data", ['Close']);
          }
        });
        break;
      case 'ar':
        if (form.namee == "" || form.namee == null || form.phonee == "" || form.phonee == null ) {
          this.server.CreateAlert("تحذير", "الرجاء إدخال جميع الحقول المطلوبة", ["أغلق"]);
          return;
        }
        this.data = {
          name: form.namee,
          phone: form.phonee
        };
        this.server.CreateLoading("جاري الحصول على الحساب", "dots", 20000);
        this.server.ServerRequest("auth", "GetAccount", this.data).then(result => {
          var data = JSON.parse(JSON.stringify(result));
          if (data.response != "not found") {
            this.server.CreateAlert("كلمة المرور",data.password,["اغلق"]);
          } else {
            this.server.CreateAlert('فشل ', "فشل الحصول على الحساب، الرجاء التاكد من صحة معلوماتك", ['إغلاق']);
          }
        });
        break;
      default:
        break;
    }
  }


  Validate() {
    $("#forgotformen").bootstrapValidator({
      message: "This value is not valid", feedbackIcons: {
        valid: "glyphicon glyphicon-ok", invalid: "glyphicon glyphicon-remove", validating: "glyphicon glyphicon-refresh"
      }
      , fields: {
        name: {
          validators: {
            notEmpty: {
              message: "Please enter your full name"
            }
            , stringLength: {
              min: 6, max: 80, message: "Please make sure your name is more than 2 and less than 80 characters."
            }
            , regexp: {
              regexp: /^[A-Z a-z\u0621-\u064A\u0660-\u0669]+$/, message: "Please enter characters only."
            }
          }
        },
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
        }
      }
    }).on('success.form.bv', function (e) { e.preventDefault(); });
    $("#forgotformar").bootstrapValidator({
      message: "This value is not valid", feedbackIcons: {
        valid: "glyphicon glyphicon-ok", invalid: "glyphicon glyphicon-remove", validating: "glyphicon glyphicon-refresh"
      }
      , fields: {
        namee: {
          validators: {
            notEmpty: {
              message: "الرجاء إدخال الاسم"
            }
            , stringLength: {
              min: 6, max: 20, message: "يرجى التأكد من ان الاسم أكثر من 6 وأقل من 20 حرفا."
            }
            , regexp: {
              regexp: /^[A-Z a-z\u0621-\u064A\u0660-\u0669]+$/, message: "يرجى التأكد من إدخال الأحرف فقط."
            }
          }
        },
        phonee: {
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
  }
}
