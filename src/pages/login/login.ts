import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { SplashScreen } from '@ionic-native/splash-screen';

import { SideMenuControllerService } from './../../services/side-menu-controller.service';
import { AuthenticationService } from './../../services/authentication.service';
import { ClubService } from './../../services/club.service';
import { UserService } from './../../services/user.service';

import { Credentials } from './../../models/credentials.model';

import { STUDENT, CLUB, CAFETERIA, CANTEEN } from './../../consts/users-types.constant';


@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    credentials: Credentials = new Credentials();

    modules = [
        { name: 'Etudiant', path: 'StudentHomePage' },
        { name: 'Restaurant', path: 'CanteenHomePage' },
        { name: 'Buvette', path: 'CafeteriaHomePage' },
        { name: 'Club', path: 'ClubProfilePage' }
    ];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public sideMenuControllerService: SideMenuControllerService,
        private authenticationService: AuthenticationService,
        private clubService: ClubService,
        private userService: UserService,
        private storage: Storage,
        private splashScreen: SplashScreen,
        private toastCtrl: ToastController,
    ) {
        this.sideMenuControllerService.enableSideMenu(false);
    }

    ionViewDidLoad() {

    }

    navigate(path: string) {
        this.navCtrl.push(path);
    }

    goToHomePage(homePage: string) {
        this.splashScreen.hide();
        this.navCtrl.setRoot(homePage);
    }

    login() {

        let emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (this.credentials.email && this.credentials.email.trim().length > 0 && emailRegEx.test(String(this.credentials.email).toLocaleLowerCase()) && this.credentials.password && this.credentials.password.trim().length > 0) {

            this.splashScreen.show();

            this.authenticationService.signInWithEmailAndPassword(this.credentials).then(
                (result) => {
                    this.userService.getUserByUid(result.uid).subscribe(
                        (response) => {
                            this.storage.set('currentUser', response);
                            switch (response.userType) {
                                case STUDENT: {
                                    this.goToHomePage('StudentHomePage');
                                    break;
                                }
                                case CLUB: {
                                    this.clubService.getClubByAdminUid(response.uid).subscribe(
                                        (response) => {
                                            this.storage.set('currentClub', response[0]);
                                            this.goToHomePage('ClubProfilePage');
                                        },
                                        (error) => {
                                            this.splashScreen.hide();
                                            console.log(error);
                                        }
                                    );
                                    break;
                                }
                                case CAFETERIA: {
                                    this.goToHomePage('CafeteriaHomePage');
                                    break;
                                }
                                case CANTEEN: {
                                    this.goToHomePage('CanteenHomePage');
                                    break;
                                }
                            }
                        },
                        (error) => {
                            this.splashScreen.hide();
                            console.log(error);
                        }
                    );
                },
                (error) => {
                    this.splashScreen.hide();
                    console.log(error);
                    switch (error.code) {
                        case 'auth/user-not-found': {
                            let toast = this.toastCtrl.create({
                                message: 'Vous devez créer un compte d\'abord!',
                                duration: 3000,
                                position: 'top'
                            });
                            toast.present();
                            break;
                        }
                        case 'auth/wrong-password': {
                            let toast = this.toastCtrl.create({
                                message: 'Email ou mot de passe incorrecte!',
                                duration: 3000,
                                position: 'top'
                            });
                            toast.present();
                            break;
                        }
                    }
                }
            );

        } else {
            return;
        }

    }

}
