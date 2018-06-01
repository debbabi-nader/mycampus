import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Platform, NavParams, ViewController, AlertController, ModalController, ActionSheetController, Slides } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

declare var google: any;

import { ClubService } from './../../services/club.service';
import { PhotoService } from './../../services/photo.service';
import { UserService } from './../../services/user.service';

import { MapModalComponent } from './../map-modal/map-modal.component';

import { Event } from './../../models/event.model';
import { Club } from './../../models/club.model';
import { Photo } from './../../models/photo.model';
import { User } from './../../models/user.model';


@Component({
    templateUrl: './event-details-modal.component.html'
})
export class EventDetailsModalComponent implements OnInit {

    isAdmin = false;
    isInterested = false;

    club: Club = new Club();
    event: Event = new Event();
    eventUpdate: Event = new Event();
    currentUser: User = new User();

    updateEventDetails = false;

    mainPhoto: string;

    tag: string;

    currentDate: string;
    maxDate: string;

    spin = false;

    showMap = false;
    @ViewChild('map') mapRef: ElementRef;

    @ViewChild('gallerySlides') gallerySlides: Slides;


    constructor(
        public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController,
        public modalCtrl: ModalController,
        public actionSheetCtrl: ActionSheetController,
        private clubService: ClubService,
        private userService: UserService,
        private alertCtrl: AlertController,
        private photoService: PhotoService,
        private geolocation: Geolocation
    ) { }

    ngOnInit() {

        this.isAdmin = this.params.get('isAdmin');
        this.clubService.getClubById(this.params.get('clubKey')).subscribe(
            (club) => {
                this.club = club;
                this.club.events.forEach(event => {
                    if (event.key === this.params.get('eventKey')) {
                        this.event = JSON.parse(JSON.stringify(event));
                        this.mainPhoto = this.event.mainPhoto;
                    }
                });

                if (!this.isAdmin) {
                    this.userService.getUserFromLocalStorage().then(
                        (user) => {
                            this.currentUser = user;
                            this.event.interested = (this.event.interested && this.event.interested.length > 0) ? this.event.interested : [];
                            for (let i = 0 ; i < this.event.interested.length ; i++) {
                                if (this.event.interested[i] === this.currentUser.uid) {
                                    this.isInterested = true;
                                    break;
                                }
                            }
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

    onUpdateEventDetails() {

        this.eventUpdate = JSON.parse(JSON.stringify(this.event));
        this.eventUpdate.tags = (this.eventUpdate.tags && this.eventUpdate.tags.length > 0) ? this.eventUpdate.tags : [];
        this.eventUpdate.photoGallery = (this.eventUpdate.photoGallery && this.eventUpdate.photoGallery.length > 0) ? this.eventUpdate.photoGallery : [];

        let date = new Date();
        let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) + '' : (date.getMonth() + 1);
        let day = date.getDate() < 10 ? '0' + date.getDate() + '' : date.getDate();
        this.currentDate = [date.getFullYear(), month, day].join('-');
        this.maxDate = [date.getFullYear() + 1, 12, 31].join('-');

        this.updateEventDetails = true;

    }

    presentMainPhotoActionSheet() {

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
                                this.mainPhoto = 'data:image/jpeg;base64,' + imageData;
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
                                this.mainPhoto = 'data:image/jpeg;base64,' + imageData;
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

    addTag() {

        this.eventUpdate.tags.push(this.tag.trim());
        this.tag = null;

    }

    deleteTag(i: number) {

        this.eventUpdate.tags.splice(i, 1);

    }

    onShowMap() {

        if (!this.showMap) {

            this.showMap = true;

            this.geolocation.getCurrentPosition().then((resp) => {

                let currentLocation = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
    
                let options = {
                    center: currentLocation,
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                let map = new google.maps.Map(this.mapRef.nativeElement, options);

                let directionsService = new google.maps.DirectionsService();
                let directionsRenderer = new google.maps.DirectionsRenderer();

                directionsRenderer.setMap(map);

                let directionsOptions = {
                    origin: currentLocation,
                    destination: this.event.location.latLang,
                    travelMode: 'DRIVING'
                };

                directionsService.route(directionsOptions, (result, status) => {
                    if (status == 'OK') {
                        directionsRenderer.setDirections(result);
                    }
                });
                
            }).catch((error) => {
    
                console.log('Error getting current location', error);
    
            });

        } else {

            this.showMap = false;

        }

    }

    presentMapModal() {

        let mapModal = this.modalCtrl.create(MapModalComponent, { location: this.eventUpdate.location });

        mapModal.onDidDismiss(selectedPlace => {
            if (selectedPlace === null) {
                console.log('place stays the same');
            } else {
                console.log('place has been chosen');
                this.eventUpdate.location = JSON.parse(JSON.stringify(selectedPlace));
            }
            console.log('returned location', this.eventUpdate.location);
        });

        mapModal.present();

    }

    presentEventGalleryPhotoActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Ajouter une photo au galerie de l\'événement',
            buttons: [
                {
                    text: 'Choisir à partir du Gallery',
                    icon: 'md-images',
                    role: 'destructive',
                    handler: () => {

                        this.photoService.takePhoto(0, null, null).then(
                            (response) => {
                                this.addPhotoToEventGallery(`data:image/jpeg;base64,${response}`);
                            },
                            (error) => {
                                console.log(error);
                            }
                        );

                    }
                },
                {
                    text: 'Prendre une photo',
                    icon: 'md-camera',
                    role: 'destructive',
                    handler: () => {

                        this.photoService.takePhoto(1, null, null).then(
                            (response) => {
                                this.addPhotoToEventGallery(`data:image/jpeg;base64,${response}`);
                            },
                            (error) => {
                                console.log(error);
                            }
                        );

                    }
                }
            ]
        });

        actionSheet.present();
    }

    addPhotoToEventGallery(image: string) {

        let newPhoto: Photo = new Photo();
        newPhoto.storagePath = '';
        newPhoto.downloadUrl = image;
        this.eventUpdate.photoGallery.push(newPhoto);
        if (this.gallerySlides) {
            this.gallerySlides.update();
        }

    }

    deleteEventGalleryPhoto(index: number) {

        this.eventUpdate.photoGallery.splice(index, 1);
        if (this.gallerySlides) {
            this.gallerySlides.update();
        }

    }

    verifyDeletedEventGalleryPhoto() {

        let found = false;

        if (this.event.photoGallery && this.event.photoGallery.length > 0) {

            for (let i = 0; i < this.event.photoGallery.length; i++) {

                found = false;
    
                for (let j = 0; j < this.eventUpdate.photoGallery.length; j++) {
                    if (this.event.photoGallery[i].storagePath === this.eventUpdate.photoGallery[j].storagePath) {
                        found = true;
                        break;
                    }
                }
    
                if (!found) {
                    this.photoService.deletePhoto(this.event.photoGallery[i].storagePath);
                }
    
            }

        }

    }

    cancelEventDetailsUpdate() {

        this.mainPhoto = this.event.mainPhoto;
        this.eventUpdate = new Event();
        this.updateEventDetails = false;

    }

    saveEventDetailsUpdate() {

        if (this.event.mainPhoto !== this.mainPhoto) {

            const eventMainPhotoStoragePath = `club/${this.club.key}/events/${this.event.key}/cover`;
            this.photoService.uploadPhoto(this.mainPhoto, eventMainPhotoStoragePath).then(
                (res) => {
                    this.mainPhoto = res.downloadURL;
                    this.eventUpdate.mainPhoto = this.mainPhoto;
                    this.updateClubEvents();
                    this.updateEventDetails = false;
                },
                (err) => {
                    console.log(err);
                }
            );

        } else {

            this.updateClubEvents();
            this.updateEventDetails = false;

        }

    }

    async asyncForEach(array, callback) {

        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }

    }

    updateClubEvents() {

        const verifyAddedEventGalleryPhoto = async () => {
            await this.asyncForEach(this.eventUpdate.photoGallery, async (photo, index) => {

                if (photo.storagePath.length === 0) {

                    this.spin = true;

                    photo.storagePath = `club/${this.club.key}/events/${this.event.key}/gallery/${new Date().getTime() + index}`;

                    await this.photoService.uploadPhoto(photo.downloadUrl, photo.storagePath).then(
                        (res) => {
                            this.eventUpdate.photoGallery[index].downloadUrl = res.downloadURL;
                        },
                        (err) => {
                            console.log(err);
                            this.eventUpdate.photoGallery.splice(index, 1);
                        }
                    );

                }

            });
        };

        verifyAddedEventGalleryPhoto().then(
            (res) => {
                this.verifyDeletedEventGalleryPhoto();

                this.spin = false;

                this.event = new Event();
                this.event = JSON.parse(JSON.stringify(this.eventUpdate));
                for (let i = 0; i < this.club.events.length; i++) {
                    if (this.club.events[i].key === this.event.key) {
                        this.club.events[i] = JSON.parse(JSON.stringify(this.event));
                    }
                }
                this.clubService.updateClubInLocalStorage(this.club);
            },
            (err) => {
                console.log(err);
            }
        );

    }

    deleteEvent() {

        let alert = this.alertCtrl.create({
            title: 'Vous venez de supprimer un événement!',
            message: 'Êtes-vous sûr?',
            buttons: [
                {
                    text: 'Annuler',
                    handler: () => { }
                },
                {
                    text: 'Supprimer',
                    handler: () => {

                        if (this.event.photoGallery && this.event.photoGallery.length > 0) {
                            this.event.photoGallery.forEach((photo) => {
                                this.photoService.deletePhoto(photo.storagePath);
                            });
                        }

                        this.photoService.deletePhoto(`club/${this.club.key}/events/${this.event.key}/cover`);

                        for (let i = 0 ; i < this.club.events.length ; i++) {
                            if (this.club.events[i].key === this.event.key) {
                                this.club.events.splice(i, 1);
                                break;
                            }
                        }

                        this.clubService.updateClubInLocalStorage(this.club);

                        this.dismissModal();

                    }
                }
            ]
        });

        alert.present();

    }

    dismissModal() {
        this.viewCtrl.dismiss();
    }

    getContactIconUrl(contactName: string): string {
        return `assets/imgs/${contactName}-logo-yellow.png`;
    }

    addInterested() {

        this.event.interested.push(this.currentUser.uid);

        for (let i = 0 ; i < this.club.events.length ; i ++) {
            if(this.club.events[i].key === this.event.key) {
                this.club.events[i] = JSON.parse(JSON.stringify(this.event));
                break;
            }
        }
        
        this.clubService.updateClub(this.club);
        this.isInterested = true;

    }

    removeInterested() {

        for (let i = 0 ; i < this.event.interested.length ; i++) {
            if (this.event.interested[i] === this.currentUser.uid) {
                this.event.interested.splice(i, 1);
                break;
            }
        }

        for (let i = 0 ; i < this.club.events.length ; i ++) {
            if(this.club.events[i].key === this.event.key) {
                this.club.events[i] = JSON.parse(JSON.stringify(this.event));
                break;
            }
        }

        this.clubService.updateClub(this.club);
        this.isInterested = false;

    }

}
