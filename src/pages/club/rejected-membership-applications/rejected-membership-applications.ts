import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
    selector: 'page-rejected-membership-applications',
    templateUrl: 'rejected-membership-applications.html',
})
export class RejectedMembershipApplicationsPage implements OnInit {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams
    ) { }

    ngOnInit() {
        
    }

    ionViewDidLoad() {

    }

}
