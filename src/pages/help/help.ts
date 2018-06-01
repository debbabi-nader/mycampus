import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SideMenuControllerService } from './../../services/side-menu-controller.service';


@IonicPage()
@Component({
    selector: 'page-help',
    templateUrl: 'help.html',
})
export class HelpPage implements OnInit {

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
