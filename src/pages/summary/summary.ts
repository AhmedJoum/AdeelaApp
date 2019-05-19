import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
declare var $:any;

@IonicPage()
@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html',
})
export class SummaryPage {
language: any = localStorage.getItem('Language');
user_id: any = localStorage.getItem('ID');
permission: any = localStorage.getItem('Permission');
from: any = sessionStorage.getItem("From");
to: any = sessionStorage.getItem("To");
time: any = sessionStorage.getItem("Time");
route_id: any = sessionStorage.getItem('RouteID');
agency_id: any = sessionStorage.getItem('AgencyID');
agency: any = sessionStorage.getItem("AgencyName");
bus: any = sessionStorage.getItem("BusName");
level: any = sessionStorage.getItem("BusLevel")
seat_no: any = sessionStorage.getItem("SeatNo");
price: any = sessionStorage.getItem("TicketPrice");
booking_no : any = sessionStorage.getItem("BookingNo");
ticket_no: any = sessionStorage.getItem("TicketNo");
today: any = new Date();

  constructor(public translate: TranslateService, public navCtrl: NavController, public navParams: NavParams) {
    translate.use(this.language);
  }

  ionViewWillEnter() {
    this.language = localStorage.getItem("Language");
    if (this.language == "ar") {
      $(".en").addClass("hidden");
      $(".leftmenubutton").addClass("hidden");
    } else {
      $(".ar").addClass("hidden");
      $(".rightmenubutton").addClass("hidden");
    }
  }
  Finish() {
    this.navCtrl.setRoot("TabsPage", {}, { animate: true, direction: "back" });
  }
}
