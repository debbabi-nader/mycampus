import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';


@IonicPage()
@Component({
    selector: 'page-club-profile',
    templateUrl: 'club-profile.html',
})
export class ClubProfilePage {

    sideMenuContent: {name: string, path: string}[] = [
        {name: 'Mon compte', path: 'AccountPage'}
    ];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public events: Events
    ) {
        this.setupSideMenuContent();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ClubProfilePage');
    }

    setupSideMenuContent() {
        this.events.publish('sideMenu:changeContent', this.sideMenuContent);
    }

}
