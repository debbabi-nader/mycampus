import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs/Observable';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Club } from './../models/club.model';


@Injectable()
export class ClubService {

    private clubListRef: AngularFireList<Club> = null;

    constructor(
        private angularFireDatabase: AngularFireDatabase,
        private storage: Storage
    ) {
        this.clubListRef = this.angularFireDatabase.list<Club>('/club');
    }

    getClubs(): Observable<Club[]> {

        return this.clubListRef.snapshotChanges().map(
            changes => {
                return changes.map(c => ({
                    key: c.payload.key, ...c.payload.val()
                }));
            }
        );

    }

    getClubById(key: string): Observable<Club> {

        return this.angularFireDatabase.object('/club/'+key).snapshotChanges().map(
            changes => {
                return {key: changes.payload.key, ...changes.payload.val()} as Club;
            }
        );

    }

    getClubByAdminUid(uid: string): Observable<Club[]> {

        return this.angularFireDatabase.list<Club>('/club', ref => ref.orderByChild('admin/uid').equalTo(uid)).snapshotChanges().map(
            changes => {
                return changes.map(c => ({
                    key: c.payload.key, ...c.payload.val()
                }));
            }
        );

    }

    createClub(club: Club) {
        
        return this.clubListRef.push(club);

    }

    updateClub(club: Club) {

        return this.clubListRef.update(club.key, club);

    }

    updateClubInLocalStorage(club: Club) {

        this.updateClub(club).then(
            (response) => {
                this.storage.set('currentClub', club);
            },
            (error) => {
                console.log(error);
            }
        );

    }

    getClubFromLocalStorage(): Promise<Club> {

        return this.storage.get('currentClub');

    }

}
