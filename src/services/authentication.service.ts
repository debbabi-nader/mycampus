import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

// import { Observable } from 'rxjs/Observable';

import { Credentials } from './../models/credentials.model';


@Injectable()
export class AuthenticationService {

    constructor(
        private angularFireAuth: AngularFireAuth
    ) {}

    signUpWithEmailAndPassword(credantials: Credentials): Promise<any> {

        return this.angularFireAuth.auth.createUserWithEmailAndPassword(credantials.email, credantials.password);

    }

    signInWithEmailAndPassword(credantials: Credentials): Promise<any> {

        return this.angularFireAuth.auth.signInWithEmailAndPassword(credantials.email, credantials.password);

    }

    signOut(): Promise<any> {

        return this.angularFireAuth.auth.signOut();

    }

    // isSignedIn(): Observable<any> {

    //     return this.angularFireAuth.authState;

    // }

}
