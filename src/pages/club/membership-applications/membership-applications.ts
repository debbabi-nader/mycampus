import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SideMenuControllerService } from './../../../services/side-menu-controller.service';


@IonicPage()
@Component({
    selector: 'page-membership-applications',
    templateUrl: 'membership-applications.html',
})
export class MembershipApplicationsPage implements OnInit {

    newMembershipApplicationsPageRoot = 'NewMembershipApplicationsPage';
    acceptedMembershipApplicationsPageRoot = 'AcceptedMembershipApplicationsPage';
    rejectedMembershipApplicationsPageRoot = 'RejectedMembershipApplicationsPage';

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
