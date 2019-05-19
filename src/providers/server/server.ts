import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController, LoadingController, ToastController } from 'ionic-angular';
// import { FCM } from '@ionic-native/fcm';
@Injectable()
export class ServerProvider {
  private baseurl = "https://server..com/api";
  //private baseurl = "http://192.168.1.101:9999/api";
  //private baseurl = "http://127.0.0.1:9999/api";
  private api = [];
  public today: any;
  public maxdate: any;
  public language = localStorage.getItem('Language');
  public times = [
   "03:00:00","03:15:00", "03:30:00", "03:45:00", "04:00:00", "04:15:00", "04:30:00", "04:45:00", "05:00:00", "05:15:00", "05:30:00", "05:45:00", "06:00:00", "06:15:00",  "06:30:00", "06:45:00", "07:00:00", "07:15:00", "07:30:00", "07:45:00", "08:00:00",
   "08:15:00", "08:30:00", "08:45:00", "09:00:00", "09:15:00", "09:30:00", "09:45:00", "10:00:00", "10:15:00", "10:30:00", "10:45:00", "11:00:00", "11:15:00", "11:30:00", "11:45:00", "12:00:00", "12:15:00", "12:30:00", "12:45:00", "13:00:00", "13:15:00",
   "13:30:00", "13:45:00", "14:00:00", "14:15:00", "14:30:00", "14:45:00", "15:00:00", "15:15:00", "15:30:00", "15:45:00", "16::00", "16:15:00", "16:30:00", "16:45:00", "17:00:00", "17:15:00", "17:30:00", "17:45:00", "18:00:00"  
  ];
  public encities = [
    "Omdurman", "Bahri", "Khartoum", "Portsudan", "Atbara", "Madani", "AlObied", "Kassala", "Nyala", "AlDamazin", "Dongola", "Kosti", "AlNahud", "Shandi", "Sawakin", "Marawi", "Alfashir", "Sinnar", "Aldindir", "Singa", "Algadarif", "Halfa", "New Halfa"
  ];
  public arcities = [
    "امدرمان", "بحري", "الخرطوم", "بورتسودان", "عطبرة", "مدني", "الابيض", "كسلا", "نيالا", "الدمازين", "دنقلا", "كوستي", "النهود", "شندي", "سواكن", "مروي", "الفاشر", "سنار", "الدندر", "سنجا", "القضارف", "حلفا", "حلفا الجديدة"
  ];


  public loader: any;
  data: any;

  constructor(//public fcm: FCM,
     public http: Http, public toastCtrl: ToastController, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.api['auth'] = 'authentication';
    this.api['agency'] = 'Agencies';
    this.api['ads'] = 'Ads';
    this.api['book'] = 'Bookings'
    this.api['user'] = 'Users';
    this.api['route'] = 'Routes';
    this.api['tools'] = 'Tools';
    this.api['notification'] = 'Notifications';
    this.api['salepoint'] = 'Salepoints';
    this.api['payment'] = 'Payment';
    
  }

  ServerRequest(api, request, data) {
    let http = new Promise((resolve) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json; charset=UTF-8');
      this.http.post(this.baseurl + "/" + this.api[api] + "/" + request, JSON.stringify(data), { headers: headers }).map(res => res.json()).subscribe((result) => {
        resolve(result);
      }, (error) => {
        this.language = localStorage.getItem("Language");
        switch (this.language) {
          case 'en':
            if (error.toString().indexOf("null") != -1) {
              this.CreateAlert("Connection Error", "Failed to connect to server, Please check your internet connection and try again.", [
                {
                  text: 'Close',
                  handler: () => {
                    this.loader.dismiss();
                  }
                }
              ]);
            } else {
              if (error.toString().indexOf("503") != -1) {
                this.CreateAlert("Connection Error", "Server temporary down, Please try again later.", [
                  {
                    text: 'Close',
                    handler: () => {
                    }
                  }
                ]);
              } else {
                this.CreateAlert("Error", error, [
                  {
                    text: 'Close',
                    handler: () => {
                      this.loader.dismiss();
                    }
                  }
                ]);
              }
            }
            break;

          case 'ar':
            if (error.toString().indexOf("null") != -1) {
              this.CreateAlert(" خطأ اتصال", "فشل الاتصال بالمخدم، الرجاء التاكد من اتصال الانترنت الخاص بك او المحاولة مرة اخرى", [
                {
                  text: 'اغلق',
                  handler: () => {
                    this.loader.dismiss();
                  }
                }
              ]);
            } else {
              if (error.toString().indexOf("503") != -1) {
                this.CreateAlert("خطا اتصال", "خطأ موقت في المخدم، الرجاء المحاولة في وقت لاحق", [
                  {
                    text: 'اغلق',
                    handler: () => {
                    }
                  }
                ]);
              } else {
                this.CreateAlert("Error", error, [
                  {
                    text: 'اغلق',
                    handler: () => {
                      this.loader.dismiss();
                    }
                  }
                ]);
              }
            }
            break;
        }
      }, () => {
        this.loader.dismiss();
      });
    });
    return http;
  }

  HiddenServerRequest(api, request, data) {
    let http = new Promise((resolve) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json; charset=UTF-8');
      this.http.post(this.baseurl + "/" + this.api[api] + "/" + request, JSON.stringify(data), { headers: headers }).map(res => res.json()).subscribe((result) => {
        resolve(result);
      });
    });
    return http;
  }
  getHashPass(data) {
    return new Promise((resolve) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json; charset=UTF-8');
      let url = this.baseurl+"/Tools/ComputeHash";
      this.http.post(url, JSON.stringify(data), { headers: headers }).subscribe((response) => {
        resolve(JSON.stringify(response));
      }, error => {
        console.log(error);
      });
    });
  }
  SingleNotification(title, message, token) {
    var data = {
      title: title,
      message: message,
      token: token,
    }
    return new Promise((resolve) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json; charset=UTF-8');
      //let url = "https://www..com/api/notifications/singlenotification.php";
      let url = "http://admar..com/notify.php";
      this.http.post(url, JSON.stringify(data), { headers: headers }).map(res => res.json()).subscribe((error) => {
        this.language = localStorage.getItem("Language");
        switch (this.language) {
          case 'en':
            if (error.toString().indexOf("null") != -1) {
              this.CreateAlert("Connection Error", "Failed to connect to server, Please check your internet connection and try again.", [
                {
                  text: 'Close',
                  handler: () => {
                  }
                }
              ]);
            } else {
              this.CreateAlert("Error", error, [
                {
                  text: 'Close',
                  handler: () => {
                  }
                }
              ]);
            }
            break;

          case 'ar':
            if (error.toString().indexOf("null") != -1) {
              this.CreateAlert(" خطأ اتصال", "فشل الاتصال بالمخدم، الرجاء التاكد من اتصال الانترنت الخاص بك او المحاولة مرة اخرى", [
                {
                  text: 'اغلق',
                  handler: () => {
                  }
                }
              ]);
            } else {
              this.CreateAlert("Error", error, [
                {
                  text: 'اغلق',
                  handler: () => {
                  }
                }
              ]);
            }
            break;
        }
      });
    });
  }
  MassNotifications(title, message, topic, token?) {
    var data = {
      title: title,
      message: message,
      topic: topic,
      token: token || ''
    }
    return new Promise((resolve) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json; charset=UTF-8');
      //let url = "https://www..com/api/notifications/massnotifications.php";
      let url = "http://admar..com/massnotify.php";
      this.http.post(url, JSON.stringify(data), { headers: headers }).map(res => res.json()).subscribe((error) => {
        this.language = localStorage.getItem("Language");
        switch (this.language) {
          case 'en':
            if (error.toString().indexOf("null") != -1) {
              this.CreateAlert("Connection Error", "Failed to connect to server, Please check your internet connection and try again.", [
                {
                  text: 'Close',
                  handler: () => {
                  }
                }
              ]);
            } else {
              this.CreateAlert("Error", error, [
                {
                  text: 'Close',
                  handler: () => {
                  }
                }
              ]);
            }
            break;

          case 'ar':
            if (error.toString().indexOf("null") != -1) {
              this.CreateAlert(" خطأ اتصال", "فشل الاتصال بالمخدم، الرجاء التاكد من اتصال الانترنت الخاص بك او المحاولة مرة اخرى", [
                {
                  text: 'اغلق',
                  handler: () => {
                  }
                }
              ]);
            } else {
              this.CreateAlert("Error", error, [
                {
                  text: 'اغلق',
                  handler: () => {
                  }
                }
              ]);
            }
            break;
        }
      });
    });
  }

  getPaymentId(data) {
    return new Promise((resolve) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json; charset=UTF-8');
      let url = "http://admar..com//createpayment.php";
      this.http.post(url, JSON.stringify(data), { headers: headers }).map(res => res.json()).subscribe(response => {
        resolve(response);
      });
    });
  }

  getAgencies(data) {
    return new Promise((resolve) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json; charset=UTF-8');
      let url = "http://admar..com//agencies.php";
      this.http.post(url, JSON.stringify(data), { headers: headers }).map(res => res.json()).subscribe(response => {
        resolve(response);
      });
    });
  }

  verifyTickets(data) {
    return new Promise((resolve) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json; charset=UTF-8');
      let url = "http://admar..com//verifytickets.php";
      this.http.post(url, JSON.stringify(data), { headers: headers }).map(res => res.json()).subscribe(response => {
        resolve(response);
      });
    });
  }

  getPaymentUrl(data) {
    return new Promise((resolve) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json; charset=UTF-8');
      let url = "http://admar..com/payment/payment.php";
      this.http.post(url, JSON.stringify(data), { headers: headers }).map(res => res.json()).subscribe(response => {
        resolve(response);
      });
    });
  }

  updatePaymentData(data) {
    return new Promise((resolve) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json; charset=UTF-8');
      let url = "http://admar..com//update.php";
      this.http.post(url, JSON.stringify(data), { headers: headers }).map(res => res.json()).subscribe(response => {
        resolve(response);
      });
    });
  }

  updatePassword(data) {
    return new Promise((resolve) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json; charset=UTF-8');
      let url = "http://admar..com//update-password.php";
      this.http.post(url, JSON.stringify(data), { headers: headers }).subscribe(response => {
        resolve(JSON.parse(JSON.stringify(response))['_body']);
      });
    });
  }

  CreateToast(message, duration, position) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position
    });
    toast.present();
  }
  CreateLoading(message, type, timeout) {
    this.loader = this.loadingCtrl.create({
      spinner: type,
      content: message,
      duration: timeout
    });
    this.loader.present();
  }

  CreateAlert(title, message, buttons) {
    this.language = localStorage.getItem('Language');
    let alert: any;
    switch (this.language) {
      case 'en':
        alert = this.alertCtrl.create({
          title: title,
          subTitle: message,
          buttons: buttons
        });
        alert.present();
        break;
      case 'ar':
        alert = this.alertCtrl.create({
          title: title,
          subTitle: message,
          buttons: buttons,
          cssClass: 'arabic'
        });
        alert.present();
        break;
    }

  }

  // GetToken() {
  //   let id = localStorage.getItem('ID');
  //   this.fcm.getToken().then(token => {
  //     let data;
  //     data = {
  //       id: id,
  //       token: token
  //     };
  //     this.HiddenServerRequest('tools', 'UpdateNormalToken', data).then(result => {
  //       localStorage.setItem("Token", token);
  //     });
  //   });

  //   this.fcm.onTokenRefresh().subscribe(token => {
  //     let data;
  //     localStorage.setItem("Token", token);
  //     data = {
  //       id: id,
  //       token: token
  //     };
  //     this.HiddenServerRequest('tools', 'UpdateNormalToken', data).then(result => {
  //       localStorage.setItem("Token", token);
  //     });
  //   });
  // }
  // InitializeToken() {
  //   let id = localStorage.getItem('ID');
  //   this.fcm.subscribeToTopic('normalusers_'+id);
  //   this.fcm.subscribeToTopic('User');
  //   this.fcm.subscribeToTopic('NormalUser');
  //   this.fcm.onNotification().subscribe(data => {
  //     if (data.wasTapped) {
  //       this.CreateAlert(data.title, data.body, ['Close']);
  //     } else {
  //       this.CreateAlert(data.title, data.body, ['Close']);
  //     };
  //   });
  // }

  getCities() {
    return new Promise((resolve) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json; charset=UTF-8');
      let url = "http://admar..com//cities.php";
      this.http.get(url, { headers: headers }).map(res => res.json()).subscribe(response => {
        resolve(response);
      });
    });
  }
}
