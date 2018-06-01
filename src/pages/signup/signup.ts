import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ToastController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { SplashScreen } from '@ionic-native/splash-screen';

import { timer } from 'rxjs/observable/timer';

import { SideMenuControllerService } from './../../services/side-menu-controller.service';
import { AuthenticationService } from './../../services/authentication.service';
import { UserService } from './../../services/user.service';
import { ClubService } from './../../services/club.service';

import { Club } from './../../models/club.model';
import { User } from './../../models/user.model';
import { University } from './../../models/university.model';
import { Degree } from './../../models/degree.model';
import { Institution } from './../../models/institution.model';
import { Credentials } from './../../models/credentials.model';

import { UNIVERSITIES } from './../../consts/universities.constant';
import { STUDENT, CLUB, CAFETERIA, CANTEEN } from './../../consts/users-types.constant';


@IonicPage()
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html',
})
export class SignupPage {

    @ViewChild(Slides) signupSlider: Slides;

    user: User = new User();
    club: Club = new Club();
    credentials: Credentials = new Credentials();

    passwordConfirmation: string;

    universities: University[] = UNIVERSITIES.slice(0);
    institutions: Institution[] = [];
    degrees: Degree[] = [];
    grades: string[] = [];

    isSignedUp = false;


    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public sideMenuControllerService: SideMenuControllerService,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private clubService: ClubService,
        private storage: Storage,
        private splashScreen: SplashScreen,
        private toastCtrl: ToastController,
    ) {
        this.sideMenuControllerService.enableSideMenu(false);
    }

    ionViewDidLoad() {
        this.signupSlider.lockSwipes(true);
    }

    selectUserType(n: number) {
        this.user = new User();
        this.club = new Club();
        switch (n) {
            case 1: {
                this.user.userType = STUDENT;
                break;
            }
            case 2: {
                this.user.userType = CLUB;
                break;
            }
            case 3: {
                this.user.userType = CAFETERIA;
                break;
            }
            case 4: {
                this.user.userType = CANTEEN;
                break;
            }
        }
        this.nextSlide();
    }

    slideChanged() {

    }

    nextSlide() {
        this.signupSlider.lockSwipes(false);
        this.signupSlider.slideNext();
        this.signupSlider.lockSwipes(true);
    }

    nextSignupStep() {
        let emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (this.user.firstName && this.user.firstName.trim().length > 0 &&
            this.user.lastName && this.user.lastName.trim().length > 0 &&
            this.user.icn && this.user.icn.trim().length > 0 &&
            this.credentials.email && this.credentials.email.trim().length > 0 && emailRegEx.test(String(this.credentials.email).toLocaleLowerCase()) &&
            this.credentials.password && this.credentials.password.trim().length > 0 &&
            this.passwordConfirmation && this.passwordConfirmation.trim().length > 0 &&
            this.credentials.password === this.passwordConfirmation) {
            
            if (this.credentials.password.trim().length >= 6) {
                this.nextSlide();
            } else {
                let toast = this.toastCtrl.create({
                    message: 'Votre mot de passe doit contenir 6 caractéres au minimum!',
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
                return;
            }
            
        } else {
            return;
        }
    }

    universitySelectChange() {
        this.user.institution = null;
        if (this.user.university && this.user.university !== undefined) {
            this.institutions = this.user.university.institutions;
        } else {
            this.institutions = [];
        }
    }

    institutionSelectChange() {
        this.user.degree = null;
        this.grades = [];
        this.user.grade = null;
        if (this.user.institution && this.user.institution !== undefined) {
            this.degrees = this.user.institution.degrees;
        } else {
            this.degrees = [];
        }
    }

    degreeSelectChange() {
        this.grades = [];
        this.user.grade = null;
        if (this.user.degree && this.user.degree !== undefined) {
            for (let i = 0; i < this.user.degree.grades; i++) {
                if (i === 0) {
                    this.grades.push((i + 1) + 'ère Année');
                } else {
                    this.grades.push((i + 1) + 'ème Année');
                }
            }
        } else {
            this.grades = [];
        }
    }

    goToHomePage(homePage: string) {
        this.isSignedUp = true;
        this.splashScreen.hide();
        timer(3000).subscribe(() => {
            this.navCtrl.setRoot(homePage);
        });
    }

    signup() {
        let validation = false;
        let phoneRegEx = /^[24579]{1}[0-9]{7}$/;

        switch (this.user.userType) {
            case STUDENT: {
                if (this.user.phoneNumber && phoneRegEx.test(String(this.user.phoneNumber)) &&
                    this.user.university && this.user.institution && this.user.degree && this.user.grade > 0) {
                    validation = true;
                }
                break;
            }
            case CLUB: {
                if (this.user.phoneNumber && phoneRegEx.test(String(this.user.phoneNumber)) &&
                    this.club.name && this.club.name.trim().length > 0 &&
                    this.user.university && this.user.institution) {
                    validation = true;
                }
                break;
            }
            case CANTEEN: {
                if (this.user.university) {
                    validation = true;
                }
                break;
            }
            case CAFETERIA: {
                if (this.user.university && this.user.institution) {
                    validation = true;
                }
                break;
            }
        }

        if (validation) {

            this.splashScreen.show();

            this.authenticationService.signUpWithEmailAndPassword(this.credentials).then(
                (result) => {
                    this.user.uid = result.uid;
                    this.user.email = this.credentials.email;
                    this.userService.createUserProfile(this.user).then(
                        (result) => {
                            this.storage.set('currentUser', this.user);
                            switch (this.user.userType) {
                                case STUDENT: {
                                    this.goToHomePage('StudentHomePage');
                                    break;
                                }
                                case CLUB: {
                                    this.club.admin = this.user;
                                    this.clubService.createClub(this.club).then(
                                        (result) => {
                                            this.storage.set('currentClub', this.club);
                                            this.goToHomePage('ClubProfilePage');
                                        },
                                        (error) => {
                                            this.splashScreen.hide();
                                            console.log(error);
                                        }
                                    );
                                    break;
                                }
                                case CANTEEN: {
                                    this.goToHomePage('CanteenHomePage');
                                    break;
                                }
                                case CAFETERIA: {
                                    this.goToHomePage('CafeteriaHomePage');
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
                    if (error.code === 'auth/email-already-in-use') {
                        let toast = this.toastCtrl.create({
                            message: 'Un compte avec l\'email ' + this.credentials.email + ' existe déja!',
                            duration: 3000,
                            position: 'top'
                        });
                        toast.present();
                    }
                }
            );
        } else {
            return;
        }

    }

}
