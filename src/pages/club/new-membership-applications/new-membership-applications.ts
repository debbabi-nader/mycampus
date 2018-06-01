import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { EditRecruitmentQuestionsModal } from './../../../components/edit-recruitment-quetions-modal/edit-recruitment-quetions-modal.component';

import { ClubService } from './../../../services/club.service';

import { Club } from './../../../models/club.model';


@IonicPage()
@Component({
    selector: 'page-new-membership-applications',
    templateUrl: 'new-membership-applications.html',
})
export class NewMembershipApplicationsPage implements OnInit {

    club: Club = new Club();

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public modalCtrl: ModalController,
        private clubService: ClubService
    ) { }

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

    ionViewDidLoad() {

    }

    presentEditRecruitmentQuestionsModal() {
        let editRecruitmentQuestionsModal = this.modalCtrl.create(EditRecruitmentQuestionsModal);
        editRecruitmentQuestionsModal.present();
    }

}
