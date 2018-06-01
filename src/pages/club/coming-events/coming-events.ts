import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import * as moment from 'moment';

import { ClubService } from './../../../services/club.service';

import { CreateEventModalComponent } from './../../../components/create-event-modal/create-event-modal.component';
import { EventDetailsModalComponent } from './../../../components/event-details-modal/event-details-modal.component';
import { FeedbackModalComponent } from './../../../components/feedback-modal/feedback-modal.component';

import { Club } from './../../../models/club.model';
import { Event } from './../../../models/event.model';


@IonicPage()
@Component({
    selector: 'page-coming-events',
    templateUrl: 'coming-events.html',
})
export class ComingEventsPage implements OnInit {

    clubKey: string;
    club: Club = new Club();

    isAdmin = false;

    comingEvents: Event[] = [];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public modalCtrl: ModalController,
        private clubService: ClubService
    ) {
        this.clubKey = this.navParams.get('clubKey');
    }

    ngOnInit() {
        
        if (!this.clubKey || this.clubKey === undefined) {
            this.isAdmin = true;
            this.clubService.getClubFromLocalStorage().then(
                (club) => {
                    this.club = club;
                    this.getComingEvents();
                },
                (error) => {
                    console.log(error);
                }
            );
        } else {
            this.isAdmin = false;
            this.clubService.getClubById(this.clubKey).subscribe(
                (club) => {
                    this.club = club;
                    this.getComingEvents();
                },
                (error) => {
                    console.log(error);
                }
            );
        }

    }

    ionViewDidLoad() {
        
    }

    getComingEvents() {

        this.club.events.forEach(event => {
            let endEventMoment = moment(`${event.endDate} ${event.endTime}`, 'YYYY-MM-DD HH:mm');
            if (endEventMoment.isAfter(moment())) {
                this.comingEvents.push(JSON.parse(JSON.stringify(event)));
            }
        });

    }

    presentFeedbackModal(event: any, index: number) {
        event.stopPropagation();
        let feedbackModal = this.modalCtrl.create(FeedbackModalComponent, { clubKey: this.club.key, eventKey: this.club.events[index].key, isAdmin: this.isAdmin });
        feedbackModal.present();
    }

    presentDetailsModal(index: number) {
        let detailsModal = this.modalCtrl.create(EventDetailsModalComponent, { clubKey: this.club.key, eventKey: this.club.events[index].key, isAdmin: this.isAdmin });
        detailsModal.present();
    }

    presentCreatEventModal() {
        let creatEventModal = this.modalCtrl.create(CreateEventModalComponent);
        creatEventModal.present();
    }

}
