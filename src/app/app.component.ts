import { Component, ViewChild } from '@angular/core';
import { Platform, Events, NavController, AlertController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';

import { timer } from 'rxjs/observable/timer';

import { AuthenticationService } from './../services/authentication.service';

import { SideMenuContent } from './../models/side-menu-content.model';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {

    @ViewChild('content') nav: NavController

    rootPage: any = 'LandingPage';

    sideMenuContent: SideMenuContent[] = [];

    constructor(
        public platform: Platform,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen,
        public events: Events,
        public alertCtrl: AlertController,
        private authenticationService: AuthenticationService,
        private storage: Storage
    ) {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.setupSideMenuContent();
        });
    }

    setupSideMenuContent() {
        this.events.subscribe('sideMenu:changeContent', content => {
            this.sideMenuContent = <SideMenuContent[]>content;
        });
    }

    navigate(path: string) {
        this.nav.push(path);
    }

    showLogoutAlert() {
        let logoutAlert = this.alertCtrl.create({
            title: 'Vous venez de se deconnecter!',
            message: 'Êtes-vous sûr?',
            buttons: [
                {
                    text: 'Annuler',
                    handler: () => {}
                },
                {
                    text: 'Se deconnecter',
                    handler: () => {
                        this.splashScreen.show();
                        this.authenticationService.signOut().then(
                            (result) => {
                                this.storage.clear();
                                this.nav.setRoot('LoginPage');
                                this.nav.popToRoot();
                                timer(3000).subscribe(() => {
                                    this.splashScreen.hide();
                                });
                            },
                            (error) => {
                                console.log(error);
                            }
                        );
                    }
                }
            ]
        });
        logoutAlert.present();
    }

}

