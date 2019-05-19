import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { ServerProvider } from '../../providers/server/server';
declare var $: any;
@IonicPage()
@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class TransactionsPage {

  constructor(public server: ServerProvider, public translate: TranslateService, public navCtrl: NavController, public navParams: NavParams) { }
  language: any = localStorage.getItem("Language");
  data: any;
  transactions: any;
  loop:any;
  total: number = 0;
  sended: boolean = false;
  agency_id: any = sessionStorage.getItem('AgencyID');
  agency: any = sessionStorage.getItem("AgencyName");

  ionViewWillEnter() {
    this.language = localStorage.getItem("Language");
    if (this.language == "ar") {
      $(".en").addClass("hidden");
      $(".leftmenubutton").addClass("hidden");
    } else {
      $(".ar").addClass("hidden");
      $(".rightmenubutton").addClass("hidden");
    }
    this.GetTransactions();
    this.loop = setInterval(()=> {this.GetHiddenTransactions();},10000);
    
  }
  ionViewWillLeave() {
    clearInterval(this.loop);
  }
  GetTransactions() {
    this.data = {
      user_id: localStorage.getItem("ID")
    };
    this.language = localStorage.getItem("Language");
    switch (this.language) {
      case 'en':
        this.server.CreateLoading("Getting your transactions", "dots", 20000);
        this.server.ServerRequest("payment", "GetMyTransactions", this.data).then(result => {
          let data = JSON.parse(JSON.stringify(result));
          
          if(data == null) {
            this.transactions = null;
          } else {
            this.transactions = data;
          }
        });
        break;
      case 'ar':
        this.server.CreateLoading("جاري الحصول على دفعياتك", "dots", 20000);
        this.server.ServerRequest("payment", "GetMyTransactions", this.data).then(result => {
          let data = JSON.parse(JSON.stringify(result));
          console.log(data);
          if(data == null) {
            this.transactions = null;
          } else {
            this.transactions = data;
          }
        });
        break;
    }
  }
  GetHiddenTransactions() {
    this.data = {
      user_id: localStorage.getItem("ID")
    };
    this.language = localStorage.getItem("Language");
    switch (this.language) {
      case 'en':
        this.server.HiddenServerRequest("payment", "GetMyTransactions", this.data).then(result => {
          let data = JSON.parse(JSON.stringify(result));
          
          if(data == null) {
            this.transactions = null;
          } else {
            this.transactions = data;
            setInterval(() => {
              this.server.MassNotifications('New tiket', 'New ticket is requested', 'ticketForAgencyAdeela_'+this.agency_id);
              this.server.MassNotifications('New tiket', 'New ticket is requested for agency '+this.agency, '99');
            }, 20000);
          }
        });
        break;
      case 'ar':
        this.server.HiddenServerRequest("payment", "GetMyTransactions", this.data).then(result => {
          let data = JSON.parse(JSON.stringify(result));
          console.log(data);
          if(data == null) {
            this.transactions = null;
          } else {
            this.transactions = data;
            setInterval(() => {
              this.server.MassNotifications('تذكرة حديدة', 'تم طلب تذكرة جديدة', 'ticketForAgencyAdeela_'+this.agency_id);
              let msg = ' تم طلب تذكرة جديدة لوكالة ' + this.agency;
              this.server.MassNotifications('تذكرة حديدة', msg, '99');
            }, 20000);
          }
        });
        break;
    }
  }
  Home() {
    this.navCtrl.setRoot("TabsPage", {}, { animate: true, direction: "back" });
  }
}
