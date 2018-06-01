import { OnInit, Component, ViewChild, ElementRef } from '@angular/core';

import { Platform, NavParams, ViewController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

declare var google: any;

import { Address } from './../../models/address.model';


@Component({
    templateUrl: './map-modal.component.html'
})
export class MapModalComponent implements OnInit {

    @ViewChild('map') mapRef: ElementRef;
    map: any;
    marker: any;
    currentLocation: any;
    selectedPlace: Address = new Address();
    results: any[] = [];


    constructor(
        public platform: Platform,
        private params: NavParams,
        private viewCtrl: ViewController,
        private geolocation: Geolocation
    ) {
        console.log('initial location', params.get('location'));
    }

    ngOnInit() {

        this.initMap();

    }

    initMap() {

        this.geolocation.getCurrentPosition().then((resp) => {

            this.currentLocation = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

            let options = {
                center: this.currentLocation,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            this.map = new google.maps.Map(this.mapRef.nativeElement, options);

            this.map.addListener('click', (e) => this.selectPlace(e.latLng, e.placeId));
            
            if (JSON.stringify(this.params.get('location')) === '{}') {
                this.placeMarker(this.currentLocation);
                console.log('OK');
            } else {
                this.selectedPlace = JSON.parse(JSON.stringify(this.params.get('location')));
                this.placeMarker(this.selectedPlace.latLang);
                console.log('KO');
                console.log(this.selectedPlace);
            }
            
        }).catch((error) => {

            console.log('Error getting current location', error);

        });

    }

    placeMarker(latLng: any) {

        if (this.marker) {
            this.marker.setMap(null);
        }

        this.marker = new google.maps.Marker({
            position: latLng,
            visible: true,
            map: this.map
        });
        this.map.panTo(latLng);

    }

    selectPlace(latLng: any, placeId: string) {

        this.placeMarker(latLng);

        let service = new google.maps.places.PlacesService(this.map);

        if (placeId) {

            let request = {
                placeId: placeId
            };

            service.getDetails(request, (place, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {

                    this.selectedPlace.name = place.name;
                    this.selectedPlace.adress = place.formatted_address;
                    this.selectedPlace.placeId = place.place_id;
                    this.selectedPlace.latLang = place.geometry.location;

                } else {

                    console.log('get place details request failed');

                }
            });

        } else {

            console.log('unknown location, getting the nearest known place details');

            var request = {
                location: latLng,
                radius: 200,
            };

            service.nearbySearch(request, (results, status) => {
                if (status == google.maps.places.PlacesServiceStatus.OK) {

                    this.selectedPlace.name = results[0].name;
                    this.selectedPlace.adress = results[0].formatted_address;
                    this.selectedPlace.placeId = results[0].place_id;
                    this.selectedPlace.latLang = results[0].geometry.location;

                    this.placeMarker(this.selectedPlace.latLang);

                } else {

                    console.log('get nearby place request failed');

                }
            });

        }

    }

    searchPlace(event: any) {

        if (event.target.value && event.target.value.trim().length > 0) {

            let request = {
                location: this.currentLocation,
                radius: '5000',
                query: event.target.value
            };

            let service = new google.maps.places.PlacesService(this.map);
            service.textSearch(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    this.results = results.slice(0);
                } else {
                    console.log('search places request failed');
                }
            });

        } else {

            this.clearSearch();

        }

    }

    clearSearch() {

        this.results = [];

    }

    selectResult(index: number) {

        let place = this.results[index];
        this.clearSearch();
        this.placeMarker(place.geometry.location);
        this.selectedPlace.name = place.name;
        this.selectedPlace.adress = place.formatted_address;
        this.selectedPlace.placeId = place.place_id;
        this.selectedPlace.latLang = place.geometry.location;

    }

    dismissModal() {

        this.viewCtrl.dismiss(null);

    }

    choosePlace() {

        this.viewCtrl.dismiss(this.selectedPlace);

    }

}
