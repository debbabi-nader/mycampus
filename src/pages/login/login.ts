import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    modules = [
        {name: 'Etudiant', path: 'StudentHomePage'},
        {name: 'Restaurant', path: 'CanteenHomePage'},
        {name: 'Buvette', path: 'CafeteriaHomePage'},
        {name: 'Club', path: 'ClubProfilePage'}
    ];
    
    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    navigate(path: string) {
        this.navCtrl.push(path);
    }

}
