import { Component, OnInit } from '@angular/core';
import { Platform, NavParams, ViewController, ModalController } from 'ionic-angular';

import { ClubService } from './../../services/club.service';

import { Club } from './../../models/club.model';
import { RecruitmentQuestion } from './../../models/recruitment-question.model';


@Component({
    templateUrl: './edit-recruitment-quetions-modal.component.html'
})
export class EditRecruitmentQuestionsModal implements OnInit {

    club: Club = new Club();

    addQuestion: boolean = false;
    recruitmentQuestion: RecruitmentQuestion = new RecruitmentQuestion();
    possibleAnswer: string = '';

    constructor(
        public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController,
        public modalCtrl: ModalController,
        private clubService: ClubService
    ) {}

    ngOnInit() {
        this.clubService.getClubFromLocalStorage().then(
            (club) => {
                this.club = club;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    onAddQuestion() {

        this.recruitmentQuestion = new RecruitmentQuestion();
        this.recruitmentQuestion.possibleAnswers = [];
        this.possibleAnswer = '';
        this.addQuestion = true;

    }

    addPossibleAnswer() {

        this.recruitmentQuestion.possibleAnswers.push(this.possibleAnswer);
        this.possibleAnswer = '';

    }

    deletePossibleAnswer(index: number) {

        this.recruitmentQuestion.possibleAnswers.splice(index, 1);

    }

    dismissModal() {
        this.viewCtrl.dismiss();
    }

}
