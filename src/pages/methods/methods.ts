import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { ServerProvider } from '../../providers/server/server';
declare var $: any;

@IonicPage()
@Component({
  selector: 'page-methods',
  templateUrl: 'methods.html',
})
export class MethodsPage {
  language: any = localStorage.getItem('AdeeelaLanguage');
  logged: any = localStorage.getItem('AdeeelaLoggedIn');
  data: any;
  user_id: any = localStorage.getItem('AdeeelaID');
  permission: any = localStorage.getItem('AdeeelaPermission');
  from: any = sessionStorage.getItem("From");
  to: any = sessionStorage.getItem("To");
  time: any = sessionStorage.getItem("Time");
  passenger_name = sessionStorage.getItem("PassengerName");
  passenger_phone = sessionStorage.getItem("PassengerPhone");
  route_id: any = sessionStorage.getItem('RouteID');
  agency_id: any = sessionStorage.getItem('AgencyID');
  agency: any = sessionStorage.getItem("AgencyName");
  bus: any = sessionStorage.getItem("BusName");
  bus_no: any = sessionStorage.getItem("BusNo");
  level: any = sessionStorage.getItem("BusLevel");
  seat_no: any = sessionStorage.getItem("SeatNo");
  price: any = sessionStorage.getItem("TicketPrice");
  date: any = sessionStorage.getItem("Date");
  seats: any;
  constructor(public server: ServerProvider, public translate: TranslateService, public navCtrl: NavController, public navParams: NavParams) {
    translate.use(this.language);
  }

  ionViewWillEnter() {
    this.language = localStorage.getItem("AdeeelaLanguage");
    if (this.language == "ar") {
      $(".en").addClass("hidden");
      $(".leftmenubutton").addClass("hidden");
    } else {
      $(".ar").addClass("hidden");
      $(".rightmenubutton").addClass("hidden");
    }
  }

  Credit() {
    this.navCtrl.push("CreditPage");
  }

  Bank() {
    this.language = localStorage.getItem("AdeeelaLanguage");
    let data = [];

    this.navParams.data.forEach(d => {
      data.push({
        "user_id":d.user_id,
        "booking_no":d.booking_no,
        "ticket_no":d.ticket_no,
        "customer_name":d.customer_name,
        "price":d.price,
        "seat_no":d.seat_no,
        "status": d.status
      });
    });

    switch (this.language) {
      case 'en':
        this.server.CreateLoading("Please wait..", "dots", 20000);
        this.server.ServerRequest('book', 'NormalBook', this.navParams.data).then(result => {
          console.log("Normal book result ", result);
          let list = <any[]>result;
          let data2 = [], i = 0;
          
          list.forEach(item => {
            
            if (item && item.response == "Ok") {
              
              data2.push({
                "price": item['price'],
                "seat_no": item['seat_no'],
                "booking_no": item['booking_no'],
                "ticket_no": item['ticket_no'],
                "customer_name":data[0]['customer_name'],
                "user_id": data[i]["user_id"]
              });
  
            } else {
              this.server.CreateAlert("Booking Start Failed", "Please try again.", ["Close"]);
            }
            i++;
          });

          this.server.getPaymentId(data2).then(ids => {
            if (ids) {
              let r = ids.toString().split('::');
              let infos = {
                "customerRef": r[0],
                "amount": r[1],
                "paymentInfo": {
                  "customerName":data[0]['customer_name'],
                  "serviceType": "123"
                }
              }
              this.server.CreateLoading("Redirecting you to Syberpay platform", "dots", 20000);
              this.server.getPaymentUrl(infos).then(response => {
                if (response && response["paymentUrl"]) {
                  let idsToUpdates = r[0].split('-'), transactionId = response['transactionId'];
                  let data3 = [transactionId, idsToUpdates];
                  this.server.updatePaymentData(data3).then(updtaeResponse => {
                    console.log('updtaeResponse => ', updtaeResponse);  
                  })
                  .catch(error => {
                    console.log("Error ", error);   
                  });
                  sessionStorage.setItem("url", response["paymentUrl"]);
                  window.open(response["paymentUrl"]);
                  this.navCtrl.setRoot("TransactionsPage");
                } else {
                  this.server.CreateAlert("Booking Start Failed", "No ticket available for seat ", ["اغلق"]);
                }
              })
              .catch(err => {
                console.log("Error ", err);          
                this.server.CreateAlert("Booking Start Failed", "Please try again.", ["Close"]);
              });
            } else {
  
            }
          })
          .catch(err => {
            console.log("Error ", err);          
            this.server.CreateAlert("Booking Start Failed", "Please try again.", ["Close"]);
          });

        })
        
        /*
          this.server.ServerRequest('payment', 'GetPaymentUrl', this.navParams.data).then(result => {
            let data = JSON.parse(JSON.stringify(result));
            if (data.result == null) {
              this.server.CreateAlert("Booking Start Failed", "Please try again.", ["Close"]);
            } else {
              for (let i = 0; i < data.result.length; i++) {
                if (data.result[i]["response"] == "failed") {
                  this.server.CreateAlert("Booking Start Failed", "No ticket available for seat " + data.result[i]["seat_no"], ["اغلق"]);
                } else {
                  if (data.result[i]["url"] != null) {
                    sessionStorage.setItem("url", data.result[i]["url"]);
                    window.open(data.result[i]["url"]);
                    this.navCtrl.setRoot("TransactionsPage");
                  }
                }
              }
            }
          }); 
        */
        break;
      case 'ar':
        this.server.CreateLoading("جاري حجز المقاعد المختارة", "dots", 20000);
        this.server.ServerRequest('book', 'NormalBook', this.navParams.data).then(result => {
          console.log("Normal book result ", result);
          let list = <any[]>result;
          let data2 = [], i = 0;
          
          list.forEach(item => {
            
            if (item && item.response == "Ok") {
              
              data2.push({
                "price": item['price'],
                "seat_no": item['seat_no'],
                "booking_no": item['booking_no'],
                "ticket_no": item['ticket_no'],
                "customer_name":data[0]['customer_name'],
                "user_id": data[i]["user_id"]
              });
  
            } else {
              this.server.CreateAlert("بداية الحجز فشلت", "الرجاء المحاولة مرة اخرى", ["اغلق"]);
            }
            i++;
          });

          this.server.getPaymentId(data2).then(ids => {
            if (ids) {
              let r = ids.toString().split('::');
              
              let infos = {
                "customerRef": r[0],
                "amount": r[1],
                "paymentInfo": {
                  "customerName":data[0]['customer_name'],
                  "serviceType": "123"
                }
              }
              this.server.CreateLoading("جاري تحويلك لمنصة سايبر باي", "dots", 20000);
              this.server.getPaymentUrl(infos).then(response => {
                console.log('response => ', response);
                if (response && response["paymentUrl"]) {
                  let idsToUpdates = r[0].split('-'), transactionId = response['transactionId'];
                  let data3 = [transactionId, idsToUpdates];
                  this.server.updatePaymentData(data3).then(updtaeResponse => {
                    console.log('updtaeResponse => ', updtaeResponse);  
                  })
                  .catch(error => {
                    console.log("Error ", error);   
                  });
                  sessionStorage.setItem("url", response["paymentUrl"]);
                  window.open(response["paymentUrl"]); 
                  this.navCtrl.setRoot("TransactionsPage");
                } else {
                  this.server.CreateAlert("بداية الحجز فشلت", "لا توجد تذكرة متوفرة للمقعد ", ["اغلق"]);
                }
              })
              .catch(err => {
                console.log("Error ", err);          
                this.server.CreateAlert("بداية الحجز فشلت", "الرجاء المحاولة مرة اخرى", ["اغلق"]);
              });
            } else {
  
            }
          })
          .catch(error => {
            console.log("Error ", error);
          })

        })

        /*this.server.ServerRequest('payment', 'GetPaymentUrl', this.navParams.data).then(result => {
          let data = JSON.parse(JSON.stringify(result));
          if (data.result == null) {
            this.server.CreateAlert("بداية الحجز فشلت", "الرجاء المحاولة مرة اخرى", ["اغلق"]);
          } else {
            for (let i = 0; i < data.result.length; i++) {
              if (data.result[i]["response"] == "failed") {
                this.server.CreateAlert("بداية الحجز فشلت", "لا توجد تذكرة متوفرة للمقعد " + data.result[i]["seat_no"], ["اغلق"]);
                this.server.MassNotifications('تذكرة حديدة', 'تم طلب تذكرة غير متوفرة', 'ticketForAgencyAdeela_'+this.agency_id, 'seat_no');
              } else {
                if (data.result[i]["url"] != null) {
                  sessionStorage.setItem("url", data.result[i]["url"]);
                  window.open(data.result[i]["url"]);
                  this.server.MassNotifications('تذكرة حديدة', 'تم طلب تذكرة جديدة', 'ticketForAgencyAdeela_'+this.agency_id);
                  this.navCtrl.setRoot("TransactionsPage");
                }
              }
            }
          }
        });*/
        break;

    }
  }
  Salepoint() {
    this.navCtrl.push("LocationPage");
  }
}
