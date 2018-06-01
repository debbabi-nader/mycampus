import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ActionSheetController, AlertController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { SideMenuControllerService } from './../../../services/side-menu-controller.service';
import { ClubService } from './../../../services/club.service';
import { PhotoService } from './../../../services/photo.service';

import { Club } from './../../../models/club.model';
import { Photo } from './../../../models/photo.model';
import { Staff } from './../../../models/staff.model';
import { AlertInput } from './../../../models/alert-input.model';
import { Contact } from './../../../models/contact.model';

import { AVAILABLE_CONTACTS } from './../../../consts/available-contacts.constant';


@IonicPage()
@Component({
    selector: 'page-club-profile',
    templateUrl: 'club-profile.html',
})
export class ClubProfilePage implements OnInit {

    clubKey: string;
    club: Club = new Club();

    isAdmin = false;

    updateClubDetails = false;
    name: string;
    foundationDate: Date;
    foundationYear: number;
    currentDate: string;
    tag: string;
    tags: string[] = [];
    description: string;
    membersNumber: number;
    eventsNumber: number;

    @ViewChild('staffSlides') staffSlides: Slides;
    staffIndex = -1;
    staff: Staff = new Staff();
    isNewStaff = false;

    @ViewChild('gallerySlides') gallerySlides: Slides;

    availableContacts: string[] = AVAILABLE_CONTACTS.slice(0);


    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public sideMenuControllerService: SideMenuControllerService,
        private clubService: ClubService,
        private storage: Storage,
        public actionSheetCtrl: ActionSheetController,
        private photoService: PhotoService,
        private alertCtrl: AlertController
    ) {
        this.sideMenuControllerService.setupClubSideMenuContent();
        this.clubKey = this.navParams.get('clubKey');
    }

    ngOnInit() {

        if (!this.clubKey || this.clubKey === undefined) {
            this.isAdmin = true;
            this.storage.get('currentClub').then(
                (response) => {
                    this.club = response;

                    if (this.club.foundationDate) {
                        let date = new Date(this.club.foundationDate);
                        this.foundationYear = date.getFullYear();
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
        } else {
            this.isAdmin = false;
            this.clubService.getClubById(this.clubKey).subscribe(
                (response) => {
                    this.club = response;

                    if (this.club.foundationDate) {
                        let date = new Date(this.club.foundationDate);
                        this.foundationYear = date.getFullYear();
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
        }

    }

    ionViewDidLoad() {

    }

    presentCoverPhotoActionSheet() {

        const clubCoverPhotoPath = `club/${this.club.key}/cover`;

        let actionSheet = this.actionSheetCtrl.create({
            title: 'Choisir une photo de couverture',
            buttons: [
                {
                    text: 'Choisir à partir du Gallery',
                    icon: 'md-images',
                    role: 'destructive',
                    handler: () => {

                        this.photoService.takePhoto(0, 600, 400).then(
                            (response) => {
                                const image = `data:image/jpeg;base64,${response}`;
                                this.photoService.uploadPhoto(image, clubCoverPhotoPath).then(
                                    (res) => {
                                        this.club.coverPhoto = res.downloadURL;
                                        this.updateClub();
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
                },
                {
                    text: 'Prendre une photo',
                    icon: 'md-camera',
                    role: 'destructive',
                    handler: () => {

                        this.photoService.takePhoto(1, 600, 400).then(
                            (response) => {
                                const image = `data:image/jpeg;base64,${response}`;
                                this.photoService.uploadPhoto(image, clubCoverPhotoPath).then(
                                    (res) => {
                                        this.club.coverPhoto = res.downloadURL;
                                        this.updateClub();
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
            ]
        });

        actionSheet.present();

    }

    presentLogoActionSheet() {

        const clubLogoPath = `club/${this.club.key}/logo`;

        let actionSheet = this.actionSheetCtrl.create({
            title: 'Choisir un logo',
            buttons: [
                {
                    text: 'Choisir à partir du Gallery',
                    icon: 'md-images',
                    role: 'destructive',
                    handler: () => {

                        this.photoService.takePhoto(0, 500, 500).then(
                            (response) => {
                                const image = `data:image/jpeg;base64,${response}`;
                                this.photoService.uploadPhoto(image, clubLogoPath).then(
                                    (res) => {
                                        this.club.logo = res.downloadURL;
                                        this.updateClub();
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
                },
                {
                    text: 'Prendre une photo',
                    icon: 'md-camera',
                    role: 'destructive',
                    handler: () => {

                        this.photoService.takePhoto(1, 500, 500).then(
                            (response) => {
                                const image = `data:image/jpeg;base64,${response}`;
                                this.photoService.uploadPhoto(image, clubLogoPath).then(
                                    (res) => {
                                        this.club.logo = res.downloadURL;
                                        this.updateClub();
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
            ]
        });

        actionSheet.present();

    }

    onUpdateClubDetails() {

        this.name = this.club.name;
        this.foundationDate = this.club.foundationDate;
        let date = new Date();
        let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) + '' : (date.getMonth() + 1);
        let day = date.getDate() < 10 ? '0' + date.getDate() + '' : date.getDate();
        this.currentDate = [date.getFullYear(), month, day].join('-');
        this.tags = (this.club.tags && this.club.tags.length > 0) ? this.club.tags.slice(0) : [];
        this.description = this.club.description;
        this.membersNumber = this.club.membersNumber;
        this.eventsNumber = this.club.eventsNumber;

        this.updateClubDetails = true;

    }

    addTag() {
        this.tags.push(this.tag.trim());
        this.tag = null;
    }

    deleteTag(index: number) {
        this.tags.splice(index, 1);
    }

    saveClubDetailsUpdate() {

        if (this.name && this.name.length > 0) {
            this.club.name = this.name;
            this.club.foundationDate = this.foundationDate;
            if (this.club.foundationDate) {
                let date = new Date(this.club.foundationDate);
                this.foundationYear = date.getFullYear();
            }
            this.club.tags = this.tags.slice(0);
            this.club.description = this.description;
            this.club.membersNumber = this.membersNumber;
            this.club.eventsNumber = this.eventsNumber;
            this.updateClub();

            this.updateClubDetails = false;
        }

    }

    cancelClubDetailsUpdate() {

        this.name = this.club.name;
        this.foundationDate = this.club.foundationDate;
        this.tags = (this.club.tags && this.club.tags.length > 0) ? this.club.tags.slice(0) : [];
        this.description = this.club.description;
        this.membersNumber = this.club.membersNumber;
        this.eventsNumber = this.club.eventsNumber;

        this.updateClubDetails = false;

    }

    addStaff() {
        this.isNewStaff = true;
        this.staff = new Staff();
        this.staff.key = new Date().getTime();
        this.club.staff = (this.club.staff && this.club.staff.length > 0) ? this.club.staff : [];
        this.club.staff.push(new Staff());
        this.staffIndex = this.club.staff.length - 1;
        if (this.staffSlides) {
            this.staffSlides.update();
            this.staffSlides.slideTo(this.staffIndex);
        }

    }

    updateStaff(index: number) {

        this.staff = JSON.parse(JSON.stringify(this.club.staff[index]));
        this.staffIndex = index;

    }

    presentStaffPhotoActionSheet() {

        let actionSheet = this.actionSheetCtrl.create({
            title: `Choisir une image pour ${(this.staff.staffName && this.staff.staffName.length > 0) ? this.staff.staffName : 'un nouveau Staff'}`,
            buttons: [
                {
                    text: 'Choisir à partir du Gallery',
                    icon: 'md-images',
                    role: 'destructive',
                    handler: () => {

                        this.photoService.takePhoto(0, 500, 500).then(
                            (response) => {
                                this.staff.photo = `data:image/jpeg;base64,${response}`;
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

                        this.photoService.takePhoto(1, 500, 500).then(
                            (response) => {
                                this.staff.photo = `data:image/jpeg;base64,${response}`;
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

    cancelStaffUpdate() {

        if (this.isNewStaff) {
            this.club.staff.pop();
            this.staffSlides.update();
        }

        this.staffIndex = -1;
        this.isNewStaff = false;
        this.staff = new Staff();

    }

    saveStaffUpdate() {

        if (this.staff.staffName && this.staff.staffName.length > 0 && this.staff.responsability && this.staff.responsability.length > 0) {

            if (this.staff.photo && this.staff.photo.length > 0 && this.staff.photo !== this.club.staff[this.staffIndex].photo) {

                const clubStaffPhotoPath = `club/${this.club.key}/staff/${this.staff.key}`;

                this.photoService.uploadPhoto(this.staff.photo, clubStaffPhotoPath).then(
                    (res) => {
                        this.staff.photo = res.downloadURL;
                        this.club.staff[this.staffIndex] = JSON.parse(JSON.stringify(this.staff));
                        this.updateClub();
                        this.isNewStaff = false;
                        this.staff = new Staff();
                        this.staffIndex = -1;
                    },
                    (err) => {
                        console.log(err);
                    }
                );

            } else {

                this.club.staff[this.staffIndex] = JSON.parse(JSON.stringify(this.staff));
                this.updateClub();
                this.isNewStaff = false;
                this.staff = new Staff();
                this.staffIndex = -1;

            }

        }

    }

    deleteStaff() {

        let alert = this.alertCtrl.create({
            title: 'Vous venez de supprimer un Staff!',
            message: 'Êtes-vous sûr?',
            buttons: [
                {
                    text: 'Annuler',
                    handler: () => { }
                },
                {
                    text: 'Supprimer',
                    handler: () => {

                        if (this.club.staff[this.staffIndex].photo && this.club.staff[this.staffIndex].photo.length > 0) {
                            const clubStaffPhotoPath = `club/${this.club.key}/staff/${this.staff.key}`;
                            this.photoService.deletePhoto(clubStaffPhotoPath);
                        }
                        this.club.staff.splice(this.staffIndex, 1);
                        this.staff = new Staff();
                        this.staffIndex = -1;
                        this.staffSlides.update();
                        this.updateClub();

                    }
                }
            ]
        });

        alert.present();

    }

    updateClub() {

        this.clubService.updateClub(this.club).then(
            (response) => {
                this.storage.set('currentClub', this.club);
            },
            (error) => {
                console.log(error);
            }
        );

    }

    presentGalleryPhotoActionSheet() {

        let actionSheet = this.actionSheetCtrl.create({
            title: 'Ajouter une photo au galerie',
            buttons: [
                {
                    text: 'Choisir à partir du Gallery',
                    icon: 'md-images',
                    role: 'destructive',
                    handler: () => {

                        this.photoService.takePhoto(0, null, null).then(
                            (response) => {
                                let newPhoto: Photo = new Photo();
                                newPhoto.storagePath = `club/${this.club.key}/gallery/${new Date().getTime()}`;
                                newPhoto.downloadUrl = `data:image/jpeg;base64,${response}`;
                                this.photoService.uploadPhoto(newPhoto.downloadUrl, newPhoto.storagePath).then(
                                    (res) => {
                                        newPhoto.downloadUrl = res.downloadURL;
                                        this.club.photoGallery = (this.club.photoGallery && this.club.photoGallery.length > 0) ? this.club.photoGallery : [];
                                        this.club.photoGallery.push(newPhoto);
                                        if (this.gallerySlides) {
                                            this.gallerySlides.update();
                                        }
                                        this.updateClub();
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
                },
                {
                    text: 'Prendre une photo',
                    icon: 'md-camera',
                    role: 'destructive',
                    handler: () => {

                        this.photoService.takePhoto(1, null, null).then(
                            (response) => {
                                let newPhoto: Photo = new Photo();
                                newPhoto.storagePath = `club/${this.club.key}/gallery/${new Date().getTime()}`;
                                newPhoto.downloadUrl = `data:image/jpeg;base64,${response}`;
                                this.photoService.uploadPhoto(newPhoto.downloadUrl, newPhoto.storagePath).then(
                                    (res) => {
                                        newPhoto.downloadUrl = res.downloadURL;
                                        this.club.photoGallery.push(newPhoto);
                                        this.gallerySlides.update();
                                        this.updateClub();
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
            ]
        });

        actionSheet.present();

    }

    deleteGalleryPhoto(index: number) {

        let alert = this.alertCtrl.create({
            title: 'Vous venez de supprimer une photo!',
            message: 'Êtes-vous sûr?',
            buttons: [
                {
                    text: 'Annuler',
                    handler: () => { }
                },
                {
                    text: 'Supprimer',
                    handler: () => {
                        this.photoService.deletePhoto(this.club.photoGallery[index].storagePath);
                        this.club.photoGallery.splice(index, 1);
                        this.gallerySlides.update();
                        this.updateClub();
                    }
                }
            ]
        });

        alert.present();

    }

    addContact() {

        this.club.contacts = (this.club.contacts && this.club.contacts.length > 0) ? this.club.contacts.slice(0) : [];
        this.availableContacts = AVAILABLE_CONTACTS.slice(0);

        for (let i = 0; i < this.club.contacts.length; i++) {
            for (let j = 0; j < this.availableContacts.length; j++) {
                if (this.club.contacts[i].name === this.getContactName(this.availableContacts[j])) {
                    this.availableContacts.splice(j, 1);
                    break;
                }
            }
        }

        let contactAlertRadioInputs: AlertInput[] = [];

        this.availableContacts.forEach(availableContact => {
            let alertInput: AlertInput = new AlertInput();
            alertInput.type = 'radio';
            alertInput.checked = false;
            alertInput.label = availableContact;
            alertInput.value = this.getContactName(availableContact);
            contactAlertRadioInputs.push(alertInput);
        });

        let alert = this.alertCtrl.create({
            title: 'Choisissez le type du contact à ajouter',
            inputs: contactAlertRadioInputs,
            buttons: [
                {
                    text: 'Annuler',
                    handler: () => { }
                },
                {
                    text: 'Confirmer',
                    handler: (data) => {

                        if (data && data !== undefined) {
                            this.presentContactValuePrompt(data);
                        }

                    }
                }
            ]
        });

        alert.present();

    }

    presentContactValuePrompt(contactName: string) {

        let alert = this.alertCtrl.create({
            title: `Ajoutez ${this.getContactPlaceholder(contactName)}`,
            inputs: [
                {
                    name: 'value',
                    placeholder: this.getContactPlaceholder(contactName)
                },
            ],
            buttons: [
                {
                    text: 'Annuler',
                    handler: () => {}
                },
                {
                    text: 'Enregistrer',
                    handler: (data) => {
                        
                        if (data.value && data.value !== undefined) {
                            let contact: Contact = new Contact();
                            contact.name = contactName;
                            contact.value = data.value;
                            this.club.contacts.push(contact);
                            this.updateClub();
                        }

                    }
                }
            ]
        });

        alert.present();

    }

    getContactName(contactName: string): string {

        switch (contactName) {
            case 'Telephone': {
                return 'phone';
            }
            default: {
                return contactName.toLowerCase();
            }
        }

    }

    getContactPlaceholder(contactName: string): string {

        switch (contactName) {
            case 'phone': {
                return 'numéro du téléphone';
            }
            case 'email': {
                return 'adresse email';
            }
            default: {
                return `lien ${contactName}`;
            }
        }

    }

    getContactIconUrl(contactName): string {
        return `assets/imgs/${contactName}-logo-green.png`;
    }

    updateContact(index: number) {

        let contact: Contact = new  Contact();
        contact = this.club.contacts[index];

        let alert = this.alertCtrl.create({
            title: `Modifier ${this.getContactPlaceholder(contact.name)}`,
            inputs: [
                {
                    name: 'value',
                    value: contact.value,
                    placeholder: this.getContactPlaceholder(contact.name)
                },
            ],
            buttons: [
                {
                    text: 'Annuler',
                    handler: () => {}
                },
                {
                    text: 'Enregistrer',
                    handler: (data) => {
                        if (data.value && data.value !== undefined) {
                            this.club.contacts[index].value = data.value;
                            this.updateClub();
                        }
                    }
                },
                {
                    text: 'Supprimer',
                    handler: (data) => {
                        this.presentContactDeleteAlert(index);
                    }
                }
            ]
        });

        alert.present();

    }

    presentContactDeleteAlert(index: number) {

        let alert = this.alertCtrl.create({
            title: 'Vous venez de supprimer un contact!',
            message: 'Êtes-vous sûr?',
            buttons: [
                {
                    text: 'Annuler',
                    handler: () => { }
                },
                {
                    text: 'Supprimer',
                    handler: () => {
                        this.club.contacts.splice(index, 1);
                        this.updateClub();
                    }
                }
            ]
        });

        alert.present();

    }

}
