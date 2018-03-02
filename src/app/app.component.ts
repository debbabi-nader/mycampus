import { Component, ViewChild } from '@angular/core';
import { Platform, Events, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {

    @ViewChild('content') nav: NavController

    rootPage: any = 'LoginPage';

    sideMenuContent: {name: string, path: string}[] = [];

    constructor(
        platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        public events: Events
    ) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();

            this.setupSideMenuContent();
        });
    }

    setupSideMenuContent() {
        this.events.subscribe('sideMenu:changeContent', content => {
            this.sideMenuContent = content;
        });
    }

    navigate(path: string) {
        this.nav.push(path);
    }

}

