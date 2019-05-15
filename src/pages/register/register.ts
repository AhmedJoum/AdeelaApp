import { Component } from '@angular/core';
import { ServerProvider } from '../../providers/server/server';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
declare var $: any;
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  language: any = localStorage.getItem('AdeeelaLanguage');
  logged: any = localStorage.getItem("AdeeelaLoggedIn");
  token: any = localStorage.getItem("AdeeelaToken");
  data: any;
  constructor(public translate: TranslateService, private server: ServerProvider, public navCtrl: NavController, public navParams: NavParams, private splashScreen: SplashScreen) {
    translate.use(this.language);
    this.IsLogged();
  }
  ionViewWillEnter() {
    this.Validate();
    this.language = localStorage.getItem("AdeeelaLanguage");
    if (this.language == "ar") {
      $(".en").addClass("hidden");
      $(".en").addClass("space-10");
      $(".ar").addClass("space-10");
      $(".leftmenubutton").addClass("hidden");
    } else {
      $(".ar").addClass("hidden");
      $(".ar").addClass("space-10");
      $(".en").addClass("space-10");
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

  Register(form) {
    this.language = localStorage.getItem('AdeeelaLanguage');
    switch (this.language) {
      case 'en':
        if (form.name == "" || form.name == null || form.phone == "" || form.phone == null  || form.gender == "" || form.gender == null || form.password == "" || form.password == null) {
          this.server.CreateAlert("Warning", "Please enter all required fields", ["Close"]);
          return;
        }
        this.data = {
          name: form.name,
          phone: form.phone,
          email: form.email,
          gender: form.gender,
          password: form.password
        };
        this.server.CreateLoading("Creating Account", "dots", 20000);
        this.server.ServerRequest("auth", "RegisterAccount", this.data).then(result => {
          var data = JSON.parse(JSON.stringify(result));
          if (data.response == "Ok") {
            localStorage.setItem("AdeeelaLoggedIn", "1");
            localStorage.setItem("AdeeelaID", data.id);
            localStorage.setItem("AdeeelaName", form.name);
            localStorage.setItem("AdeeelaEmail", form.email);
            localStorage.setItem("AdeeelaPhone", form.phone);
            localStorage.setItem("AdeeelaGender", form.gender);
            this.navCtrl.setRoot("TabsPage");
            this.splashScreen.show();
            setTimeout(() => {
              window.location.reload();
            }, 250);
          } else {
            this.server.CreateAlert('Registeration Failed', data.error_en, ['Close']);
          }
        });
        break;
      case 'ar':
      if (form.namee == "" || form.namee == null || form.phonee == "" || form.phonee == null || form.genderr == "" || form.genderr == null || form.passwordd == "" || form.passwordd == null) {
        this.server.CreateAlert("تحذير", "الرجاء إدخال جميع الحقول المطلوبة", ["أغلق"]);
        return;
      }
        this.data = {
          name: form.namee,
          phone: form.phonee,
          email: form.emaill,
          gender: form.genderr,
          password: form.passwordd
        };
        this.server.CreateLoading("جاري انشاء الحساب", "dots", 20000);
        this.server.ServerRequest("auth", "RegisterAccount", this.data).then(result => {
          var data = JSON.parse(JSON.stringify(result));
          if (data.response == "Ok") {
            localStorage.setItem("AdeeelaLoggedIn", "1");
            localStorage.setItem("AdeeelaID", data.id);
            localStorage.setItem("AdeeelaName", form.namee);
            localStorage.setItem("AdeeelaEmail", form.emaill);
            localStorage.setItem("AdeeelaPhone", form.phonee);
            localStorage.setItem("AdeeelaGender", form.genderr);
            this.navCtrl.setRoot("TabsPage");
            this.splashScreen.show();
            setTimeout(() => {
              window.location.reload();
            }, 250);
          } else {
            this.server.CreateAlert('فشل الانشاء', data.error_ar , ['إغلاق']);
          }
        });
        break;
      default:
        break;
    }
  }

  Validate() {
    $("#registerformen").bootstrapValidator({
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
              min: 1, max: 120, message: "Please make sure your name is more than 1 and less than 120 characters."
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
        gender: {
          validators: {
            notEmpty: {
              message: "Please select your gender"
            }
          }
        },
        username: {
          validators: {
            notEmpty: {
              message: "Please enter your username"
            }
            , stringLength: {
              min: 6, max: 20, message: "Please make sure your username is more than 6 and less than 20 characters."
            }
            , regexp: {
              regexp: /^[A-Za-z0-9\u0621-\u064A\u0660-\u0669]+$/, message: "Please enter characters only."
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
    $("#registerformar").bootstrapValidator({
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
              min: 1, max: 120, message: "يرجى التأكد من ان الاسم أكثر من 1 وأقل من 120 حرفا."
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
        },
        emaill: {
          validators: {
            stringLength: {
              min: 6,
              max: 100,
              message: 'يجب أن يزيد طول البريد الإلكتروني عن 6 أحرف وأقل من 100 حرف'
            },
            emailAddress: {
              message: 'الإدخال ليس عنوان بريد إلكتروني صالحا'
            }
          }
        },
        genderr: {
          validators: {
            notEmpty: {
              message: "الرجاء اختيار الجنس"
            }
          }
        },
        passwordd: {
          validators: {
            notEmpty: {
              message: "الرجاء ادخال كلمة المرور"
            }
            , stringLength: {
              min: 6, max: 20, message: "يرجى التأكد من أن كلمة المرور أكثر من 6 وأقل من 20 حرفا."
            }, regexp: {
              regexp: /^[A-Za-z0-9\u0621-\u064A\u0660-\u0669]+$/, message: "يرجى التأكد من إدخال الأحرف فقط وعدم وجود مسافات بينها."
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
            }, regexp: {
              regexp: /^[A-Za-z0-9\u0621-\u064A\u0660-\u0669]+$/, message: "يرجى التأكد من إدخال الأحرف فقط وعدم وجود مسافات بينها."
            },
            identical: {
              field: 'passwordd',
              message: 'كلمة المرور غير متطابقة'
            }
          }
        }
      }
    }).on('success.form.bv', function (e) { e.preventDefault(); });
  }
}
