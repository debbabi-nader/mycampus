import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FIREBASE_CONFIG } from './../environments/firebase.credentials';

import { MyApp } from './app.component';


@NgModule({
    declarations: [
        MyApp,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp, {
            backButtonText: '',
            menuType: 'overlay'
        }),
        AngularFireModule.initializeApp(FIREBASE_CONFIG),
        AngularFireDatabaseModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule { }
