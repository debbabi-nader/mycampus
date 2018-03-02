import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';


@IonicPage()
@Component({
    selector: 'page-canteen-home',
    templateUrl: 'canteen-home.html',
})
export class CanteenHomePage {

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
        console.log('ionViewDidLoad CanteenHomePage');
    }

    setupSideMenuContent() {
        this.events.publish('sideMenu:changeContent', this.sideMenuContent);
    }

}
