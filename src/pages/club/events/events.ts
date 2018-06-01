import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SideMenuControllerService } from './../../../services/side-menu-controller.service';


@IonicPage()
@Component({
    selector: 'page-events',
    templateUrl: 'events.html',
})
export class EventsPage implements OnInit {

    pastEventsRoot = 'PastEventsPage';
    comingEventsRoot = 'ComingEventsPage';

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public sideMenuControllerService: SideMenuControllerService
    ) {
        this.sideMenuControllerService.setupClubSideMenuContent();
    }

    ngOnInit() {
        
    }

    ionViewDidLoad() {
        
    }

}
