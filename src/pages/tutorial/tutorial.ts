import { Component, ViewChild } from '@angular/core';
import { IonicPage, MenuController, NavController, Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Slides } from 'ionic-angular';

export interface Slide {
  title: string;
  description: string;
  image: string;
}

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  @ViewChild('slidess') slidess: Slides;
  showSkip = true;
  dir: string = 'ltr';
  language: any = localStorage.getItem("Language");
  constructor(public navCtrl: NavController, public menu: MenuController, public translate: TranslateService, public platform: Platform) {
    this.dir = platform.dir();
    
  }

  startApp() {
    localStorage.setItem("FirstTime", "true");
    this.navCtrl.setRoot('LoginPage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

  SetLanguage(language) {
    localStorage.setItem("Language", language);
    this.language = language;
    this.translate.setDefaultLang(this.language);
    this.translate.use(this.language);
    this.slidess.slideNext();
  }
  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
    this.slidess.startAutoplay();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
