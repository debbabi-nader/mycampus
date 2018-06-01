import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';

import { IonicStorageModule } from '@ionic/storage';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { FIREBASE_CONFIG } from './../environments/firebase.credentials';

import { IonicImageViewerModule } from 'ionic-img-viewer';

import { SideMenuControllerService } from './../services/side-menu-controller.service';
import { PhotoService } from './../services/photo.service';
import { AuthenticationService } from './../services/authentication.service';
import { UserService } from './../services/user.service';
import { ClubService } from './../services/club.service';

import { MyApp } from './app.component';
import { FeedbackModalComponent } from './../components/feedback-modal/feedback-modal.component';
import { CreateEventModalComponent } from './../components/create-event-modal/create-event-modal.component';
import { EventDetailsModalComponent } from './../components/event-details-modal/event-details-modal.component';
import { MapModalComponent } from './../components/map-modal/map-modal.component';
import { EditRecruitmentQuestionsModal } from './../components/edit-recruitment-quetions-modal/edit-recruitment-quetions-modal.component';
import { SideMenuIconsMatcherPipe } from './../pipes/side-menu-icons-matcher.pipe';
import { TextAreaAutosizeDirective } from './../directives/textarea-autosize.directive';


@NgModule({
    declarations: [
        MyApp,
        FeedbackModalComponent,
        CreateEventModalComponent,
        EventDetailsModalComponent,
        MapModalComponent,
        EditRecruitmentQuestionsModal,
        SideMenuIconsMatcherPipe,
        TextAreaAutosizeDirective
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp, {
            backButtonText: '',
            menuType: 'overlay',
            monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            monthShortNames: ['JAN', 'FÉV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOÛ', 'SEP', 'OCT', 'NOV', 'DÉC'],
            dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
            dayShortNames: ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM']
        }),
        IonicStorageModule.forRoot(),
        AngularFireModule.initializeApp(FIREBASE_CONFIG),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        IonicImageViewerModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        FeedbackModalComponent,
        CreateEventModalComponent,
        EventDetailsModalComponent,
        MapModalComponent,
        EditRecruitmentQuestionsModal
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Geolocation,
        Camera,
        PhotoService,
        SideMenuControllerService,
        AuthenticationService,
        UserService,
        ClubService,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule { }
