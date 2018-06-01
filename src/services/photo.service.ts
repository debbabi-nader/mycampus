import { Injectable } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera';

import { AngularFireStorage } from 'angularfire2/storage';


@Injectable()
export class PhotoService {

    constructor(
        private camera: Camera,
        private angularFireStorage: AngularFireStorage
    ) {}

    takePhoto(sourceType: number, width: number, height: number) {

        let optionsWithSize: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: sourceType,
            allowEdit: true,
            correctOrientation: true,
            targetWidth: width,
            targetHeight: height
        }

        let optionsWithoutSize: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: sourceType,
            allowEdit: true,
            correctOrientation: true,
        }
    
        if (width === null || height === null) {
            return this.camera.getPicture(optionsWithoutSize);
        } else {
            return this.camera.getPicture(optionsWithSize);
        }

    }

    uploadPhoto(photo: string, path: string) {

        return this.angularFireStorage.ref(path).putString(photo, 'data_url');

    }

    deletePhoto(path: string) {

        return this.angularFireStorage.ref(path).delete();
        
    }

}
