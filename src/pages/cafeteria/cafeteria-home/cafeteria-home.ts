import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';


@IonicPage()
@Component({
    selector: 'page-cafeteria-home',
    templateUrl: 'cafeteria-home.html',
})
export class CafeteriaHomePage {

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
        console.log('ionViewDidLoad CafeteriaHomePage');
    }

    setupSideMenuContent() {
        this.events.publish('sideMenu:changeContent', this.sideMenuContent);
    }

}
