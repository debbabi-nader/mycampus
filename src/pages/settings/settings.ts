import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SideMenuControllerService } from './../../services/side-menu-controller.service';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage implements OnInit {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public sideMenuControllerService: SideMenuControllerService
    ) {
        this.sideMenuControllerService.enableSideMenu(false);
    }

    ngOnInit() {
        
    }

    ionViewDidLoad() {

    }

    ionViewWillLeave() {
        this.sideMenuControllerService.enableSideMenu(true);
    }

}
