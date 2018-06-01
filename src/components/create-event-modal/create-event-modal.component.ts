import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform, NavParams, ViewController, Slides, ModalController, ActionSheetController } from 'ionic-angular';

import { PhotoService } from './../../services/photo.service';
import { ClubService } from './../../services/club.service';

import { MapModalComponent } from './../map-modal/map-modal.component';

import { Club } from './../../models/club.model';
import { Address } from './../../models/address.model';
import { Event } from './../../models/event.model';


@Component({
    templateUrl: './create-event-modal.component.html'
})
export class CreateEventModalComponent implements OnInit {

    showModalHeader = true;

    @ViewChild(Slides) slides: Slides;
    activeSlideIndex = 0;

    event: Event = new Event();

    tag: string;

    currentDate: string;
    maxDate: string;

    club: Club = new Club();

    constructor(
        public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController,
        public modalCtrl: ModalController,
        public actionSheetCtrl: ActionSheetController,
        private photoService: PhotoService,
        private clubService: ClubService
    ) { }

    ngOnInit() {
        this.event = new Event();
        this.event.tags = [];
        this.event.location = new Address();
        let date = new Date();
        let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) + '' : (date.getMonth() + 1);
        let day = date.getDate() < 10 ? '0' + date.getDate() + '' : date.getDate();
        this.currentDate = [date.getFullYear(), month, day].join('-');
        this.maxDate = [date.getFullYear() + 1, 12, 31].join('-');
    }

    dismissModal() {
        this.viewCtrl.dismiss();
    }

    onShowModalHeader() {
        this.showModalHeader = true;
    }

    onHideModalHeader() {
        this.showModalHeader = false;
    }

    slideChanged() {
        this.activeSlideIndex = this.slides.getActiveIndex();
    }

    addTag() {
        this.event.tags.push(this.tag.trim());
        this.tag = null;
    }

    deleteTag(i: number) {
        this.event.tags.splice(i, 1);
    }

    presentMapModal() {

        let mapModal = this.modalCtrl.create(MapModalComponent, { location: this.event.location });

        mapModal.onDidDismiss(selectedPlace => {
            if (selectedPlace === null) {
                console.log('place stays the same');
            } else {
                console.log('place has been chosen');
                this.event.location = JSON.parse(JSON.stringify(selectedPlace));
            }
            console.log('returned location', this.event.location);
        });

        mapModal.present();

    }

    presentPhotoActionSheet() {

        let actionSheet = this.actionSheetCtrl.create({
            title: 'Ajouter une photo de couverture à votre événement',
            buttons: [
                {
                    text: 'Choisir à partir du Gallery',
                    icon: 'md-images',
                    role: 'destructive',
                    handler: () => {
                        this.photoService.takePhoto(0, 600, 500).then(
                            (imageData) => {
                                this.event.mainPhoto = 'data:image/jpeg;base64,' + imageData;
                            },
                            (error) => {
                                console.log('something wrong', error);
                            }
                        );
                    }
                },
                {
                    text: 'Prendre une photo',
                    icon: 'md-camera',
                    role: 'destructive',
                    handler: () => {
                        this.photoService.takePhoto(1, 600, 500).then(
                            (imageData) => {
                                this.event.mainPhoto = 'data:image/jpeg;base64,' + imageData;
                            },
                            (error) => {
                                console.log('something wrong', error);
                            }
                        );
                    }
                }
            ]
        });

        actionSheet.present();

    }

    createEvent() {

        let location = new Address();
        location.name = 'Campus Universitaire de La Manouba';
        location.adress = 'Campus Universitaire de La, Manouba 2010, Tunisie';
        location.placeId = 'ChIJHVh6LZct_RIRIjXaJi2nJxw';
        location.latLang = {
            lat: 36.8160304,
            lng: 10.061551099999974
        };
        this.event.location = location;

        if (this.event.name && this.event.name.trim().length > 0 &&
            this.event.startDate && this.event.startDate.length > 0 &&
            this.event.startTime && this.event.startTime.length > 0 &&
            this.event.endDate && this.event.endDate.length > 0 &&
            this.event.endTime && this.event.endTime.length > 0 &&
            this.event.mainPhoto && this.event.mainPhoto.length > 0 &&
            JSON.stringify(this.event.location) !== '{}') {

            this.clubService.getClubFromLocalStorage().then(
                (club) => {
                    this.club = club;
                    this.event.key = new Date().getTime();
                    this.event.organizator = this.club.key;
                    const eventMainPhotoStoragePath = `club/${this.club.key}/events/${this.event.key}/cover`;
                    this.photoService.uploadPhoto(this.event.mainPhoto, eventMainPhotoStoragePath).then(
                        (res) => {
                            this.event.mainPhoto = res.downloadURL;
                            this.club.events = (this.club.events && this.club.events.length > 0) ? this.club.events : [];
                            this.club.events.push(this.event);
                            this.clubService.updateClubInLocalStorage(this.club);
                            this.dismissModal();
                        },
                        (err) => {
                            console.log(err);
                        }
                    );
                },
                (error) => {
                    console.log(error);
                }
            );

        }

    }

}