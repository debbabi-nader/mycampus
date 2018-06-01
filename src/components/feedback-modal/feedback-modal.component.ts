import { Component, OnInit } from '@angular/core';

import { Platform, NavParams, ViewController } from 'ionic-angular';

import { UserService } from './../../services/user.service';
import { ClubService } from './../../services/club.service';

import { Feedback } from './../../models/feedback.model';
import { User } from './../../models/user.model';
import { Event } from './../../models/event.model';
import { Club } from './../../models/club.model';


@Component({
    templateUrl: './feedback-modal.component.html',
})
export class FeedbackModalComponent implements OnInit {
    
    isAdmin = false;

    club: Club = new Club();
    event: Event = new Event();
    currentUser: User = new User();
    feedBack: Feedback = new Feedback();

    averageRate: number = 0;
    averageRatePercentage: string = '';


    constructor(
        public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController,
        private clubService: ClubService,
        private userService: UserService
    ) {}

    ngOnInit() {

        this.isAdmin = this.params.get('isAdmin');
        this.clubService.getClubById(this.params.get('clubKey')).subscribe(
            (club) => {
                this.club = club;
                this.club.events.forEach((event) => {
                    if (event.key === this.params.get('eventKey')) {
                        this.event = JSON.parse(JSON.stringify(event));
                    }
                });

                this.calculateAverageRate();

                if (!this.isAdmin) {
                    this.userService.getUserFromLocalStorage().then(
                        (user) => {
                            this.currentUser = user;
                        },
                        (error) => {
                            console.log(error);
                        }
                    );
                }
            },
            (error) => {
                console.log(error);
            }
        );

    }

    calculateAverageRate() {

        this.averageRate = 0;
        this.event.feedbacks = (this.event.feedbacks && this.event.feedbacks.length > 0) ? this.event.feedbacks : [];

        for (let i = 0 ; i < this.event.feedbacks.length ; i++) {
            this.averageRate = this.averageRate + this.event.feedbacks[i].rate;
        }

        this.averageRate = this.averageRate / this.event.feedbacks.length;
        this.averageRatePercentage = `${this.averageRate*20}%`;

    }

    getRatePercentage(rate: number): string {

        return `${rate*20}%`;

    }

    onAddFeedback() {

    }

    addFeedback() {

    }

    deleteFeedback() {
        
    }

    dismissModal() {
        this.viewCtrl.dismiss();
    }

}
