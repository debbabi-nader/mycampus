import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs/Observable';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { User } from './../models/user.model';


@Injectable()
export class UserService {

    private usersListRef: AngularFireList<User> = null;

    constructor(
        private angularFireDatabase: AngularFireDatabase,
        private storage: Storage
    ) {
        this.usersListRef = this.angularFireDatabase.list<User>('/user');
    }

    getUsers(): Observable<User[]> {

        return this.usersListRef.snapshotChanges().map(
            changes => {
                return changes.map(c => ({
                    key: c.payload.key, ...c.payload.val()
                }));
            }
        );

    }

    getUserByUid(uid: string): Observable<User> {

        return this.angularFireDatabase.object('/user/'+uid).snapshotChanges().map(
            changes => {
                return {key: changes.payload.key, ...changes.payload.val()} as User;
            }
        );

    }

    createUserProfile(user: User): Promise<any> {

        return this.angularFireDatabase.object('/user/'+user.uid).set(user);

    }

    updateUserProfile(user: User): Promise<any> {

        return this.angularFireDatabase.object('/user/'+user.uid).update(user);

    }

    updateClubInLocalStorage(user: User) {

        this.updateUserProfile(user).then(
            (response) => {
                this.storage.set('currentUser', user);
            },
            (error) => {
                console.log(error);
            }
        );

    }

    getUserFromLocalStorage(): Promise<User> {

        return this.storage.get('currentUser');

    }

}
