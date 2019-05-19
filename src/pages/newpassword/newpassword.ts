import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';

declare var $: any;
@IonicPage()
@Component({
  selector: 'page-newpassword',
  templateUrl: 'newpassword.html',
})
export class NewpasswordPage {
  language: any = localStorage.getItem('Language');
  phone: any
  phonee: any
  password: any
  password2: any
  passwordd: any
  passwordd2: any

  constructor(public navCtrl: NavController, public navParams: NavParams, private server: ServerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewpasswordPage');
  }

  resetPassword() {
    console.log('phone ', this.phonee);
    if (!this.phonee) {
      this.server.CreateAlert('معلومة ناقصة', 'المرجو إدخال رقم الهاتف', ['إغلاق']);
      return;
    }
    $("#loginformen").bootstrapValidator({
      message: "This value is not valid", feedbackIcons: {
        valid: "glyphicon glyphicon-ok", invalid: "glyphicon glyphicon-remove", validating: "glyphicon glyphicon-refresh"
      }
      , fields: {
        phone: { validators: { notEmpty: { message: "Please enter your phone" }, stringLength: { min: 10, max: 10, message: "Phone must be 10 numbers long" }, regexp: { regexp: /^0+[0-9]*$/, message: "Phone must contain numbers only and must start with 0" } } }
      }
    }).on('success.form.bv', function (e) { e.preventDefault(); });
    $("#loginformar").bootstrapValidator({
      message: "This value is not valid", feedbackIcons: {
        valid: "glyphicon glyphicon-ok", invalid: "glyphicon glyphicon-remove", validating: "glyphicon glyphicon-refresh"
      }
      , fields: {
        phonee: { validators: { notEmpty: { message: "الرجاء إدخال رقم الهاتف" }, stringLength: { min: 10, max: 10, message: "يجب ان يكون الهاتف 10 ارقام" }, regexp: { regexp: /^0+[0-9]*$/, message: "يجب أن يكون الهاتف أرقام فقط ويجب أن يبدأ ب 0" } } }
      }
    }).on('success.form.bv', function (e) { e.preventDefault(); });

    if ((this.password != this.password2 && this.language == 'en') || (this.passwordd != this.passwordd2 && this.language == 'ar')) {
      this.server.CreateAlert('', 'تأكيد رقم الهاتف غير صحيح', ['إغلاق']);
      return;
    }

    this.server.getHashPass({password: this.language == 'en' ? this.password : this.passwordd}).then(response => {
      let data = {
        access: "Adeeela",
        phone: this.phonee,
        newPass: this.language == 'en' ? this.password : this.passwordd,
        hashedPass: JSON.parse(response.toString())['_body']
      }
  
      this.server.updatePassword(data).then(response => {
        console.log('response ', response);
        console.log('toUpperCase ', response.toString().toUpperCase());
        console.log('toUpperCase ', JSON.stringify(response.toString().toUpperCase()));
        console.log('test ', response.toString().toUpperCase().substring(0, 2) == "OK");
        
        if (response.toString().toUpperCase().substring(0, 2) == "OK") {
          this.server.CreateAlert('','تم تحديث كلمة المرور بنجاح', ['إغلاق']);
          this.password = null
          this.password2 = null
          this.passwordd = null
          this.passwordd2 = null
          this.phone = null
          this.phonee = null
        } else {
          this.server.CreateAlert('','خطأ أثناء تحديث كلمة المرور', ['إغلاق']);
        }
      }).catch(error => {
        console.error(error);
        this.server.CreateToast('','خطأ أثناء تحديث كلمة المرور', ['إغلاق']);
      });
    })
    .catch(error => {
      console.error(error);
      this.server.CreateToast('','خطأ أثناء تحديث كلمة المرور', ['إغلاق']);
    })
  }

}
