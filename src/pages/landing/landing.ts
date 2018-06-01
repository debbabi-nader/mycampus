import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SideMenuControllerService } from './../../services/side-menu-controller.service';


@IonicPage()
@Component({
    selector: 'page-landing',
    templateUrl: 'landing.html',
})
export class LandingPage {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public sideMenuControllerService: SideMenuControllerService,
    ) {
        this.sideMenuControllerService.enableSideMenu(false);
    }

    ionViewDidLoad() {

    }

    navigate(path: string) {
        this.navCtrl.push(path);
    }

}
