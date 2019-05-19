import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ServerProvider } from '../providers/server/server';
import { TranslateService } from '@ngx-translate/core';
declare let $: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  firsttime: any = localStorage.getItem('FirstTime');
  language: any = localStorage.getItem('Language');
  logged: any = localStorage.getItem('LoggedIn');
  name: any = localStorage.getItem('Name');
  token: any = localStorage.getItem('Token');
  links: Array<{ name: string, icon: string, component: any, data: any }>;
  arlinks: Array<{ name: string, icon: string, component: any, data: any }>;

  constructor(public translate: TranslateService, private server: ServerProvider, platform: Platform, statusBar: StatusBar, private splashScreen: SplashScreen) {
    
    this.InitializeLanguage();
    this.InitializeLogin();
    this.InitializeMenu();
    platform.ready().then(() => {
      this.IsLoggedIn();
      statusBar.styleBlackOpaque();
      splashScreen.hide();
    });
  }
  InitializeLanguage() {
    if (this.language == null || this.language == undefined) {
      localStorage.setItem('Language', 'ar');
      this.language = localStorage.getItem('Language');
    }
    this.translate.setDefaultLang(this.language);
    this.translate.use(this.language);
  }

  InitializeLogin() {
    if (this.logged == null || this.logged == undefined) {
      localStorage.setItem('LoggedIn', '0');
      this.logged = localStorage.getItem('LoggedIn');
    }
  }

  InitializeMenu() {
    if (this.name == undefined) {
      this.name = "";
    }
    this.links = [
      { name: "Account", icon: "contact", component: "PasswordPage", data: "account" },
      { name: "Bookings", icon: "folder-open", component: "BookingPage", data: "" },
      { name: "Transactions", icon: "card", component: "TransactionsPage", data: "" },
      { name: "Salespoints", icon: "pin", component: "LocationPage", data: "" },
      { name: "Help", icon: "book", component: "GuidePage", data: "" },
      { name: "About Us", icon: "information-circle", component: "AboutPage", data: "" },
      { name: "Contact Us", icon: "call", component: "ContactPage", data: "" },
      { name: "Privacy policy", icon: "lock", component: "PrivacyPage", data: "" }
    ];
    this.arlinks = [
      { name: "حسابي", icon: "contact", component: "PasswordPage", data: "account" },
      { name: "حجوزاتي", icon: "folder-open", component: "BookingPage", data: "" },
      { name: "دفعياتي", icon: "card", component: "TransactionsPage", data: "" },
      { name: "نقاط البيع", icon: "pin", component: "LocationPage", data: "" },
      { name: "مساعدة", icon: "book", component: "GuidePage", data: "" },
      { name: "عن التطبيق", icon: "information-circle", component: "AboutPage", data: "" },
      { name: "تواصل معنا", icon: "call", component: "ContactPage", data: "" },
      { name: "سياسة الخصوصية", icon: "lock", component: "PrivacyPage", data: "" }
    ];
  }

  OpenLink(link) {
    this.nav.push(link.component, link.data);
  }

  IsLoggedIn() {
    if (this.logged == "1") {
      this.rootPage = "TabsPage";
    } else {
      if (this.firsttime == null || this.firsttime == undefined) {
        this.rootPage = "TutorialPage";
      } else {
        this.rootPage = "LoginPage";
      }
    }
  }

  Open() {
    this.nav.push("TutorialPage");
  }

  Logout() {
    localStorage.removeItem("LoggedIn");
    localStorage.removeItem("ID");
    localStorage.removeItem("Token");
    localStorage.removeItem("Name");
    localStorage.removeItem("Gender");
    localStorage.removeItem("Phone");
    localStorage.removeItem("Email");
    localStorage.removeItem("Topic");
    this.nav.setRoot("LoginPage", {}, { animate: true, direction: "back" });
    this.splashScreen.show();
    setTimeout(() => {
      window.location.reload();
    }, 250);
  }

  ChangeLanguage() {
    if (this.language == "ar") {
      this.server.CreateAlert('تغيير اللغة', 'الرجاء الإختيار من اللغات أدناه', [
        {
          text: 'English',
          handler: () => {
            localStorage.setItem("Language", "en");
            this.language = "en";
            this.translate.use("en");
            $(".leftmenubutton").removeClass("hidden");
            $(".rightmenubutton").addClass("hidden");
            if (this.language == "ar") {
              $(".en").addClass("hidden");
              $(".ar").removeClass("hidden");
            } else {
              $(".ar").addClass("hidden");
              $(".en").removeClass("hidden");
            }
          }
        },
        {
          text: 'العربية',
          handler: () => {
            localStorage.setItem("Language", "ar");
            this.language = "ar";
            this.translate.use("ar");
            $(".rightmenubutton").removeClass("hidden");
            $(".leftmenubutton").addClass("hidden");
            if (this.language == "ar") {
              $(".en").addClass("hidden");
              $(".ar").removeClass("hidden");
            } else {
              $(".ar").addClass("hidden");
              $(".en").removeClass("hidden");
            }
          }
        },
        {
          text: 'الغاء',
          role: 'cancel',
        }
      ]);
    } else {
      this.server.CreateAlert('Change Language', 'Choose from the languages below', [
        {
          text: 'English',
          handler: () => {
            localStorage.setItem("Language", "en");
            this.language = "en";
            this.translate.use("en");
            $(".leftmenubutton").removeClass("hidden");
            $(".rightmenubutton").addClass("hidden");
            if (this.language == "ar") {
              $(".en").addClass("hidden");
              $(".ar").removeClass("hidden");
            } else {
              $(".ar").addClass("hidden");
              $(".en").removeClass("hidden");
            }
          }
        },
        {
          text: 'العربية',
          handler: () => {
            localStorage.setItem("Language", "ar");
            this.language = "ar";
            this.translate.use("ar");
            $(".rightmenubutton").removeClass("hidden");
            $(".leftmenubutton").addClass("hidden");
            if (this.language == "ar") {
              $(".en").addClass("hidden");
              $(".ar").removeClass("hidden");
            } else {
              $(".ar").addClass("hidden");
              $(".en").removeClass("hidden");
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
        }
      ]);
    }
  }
}
