import { Injectable } from '@angular/core';
import { Events, MenuController } from 'ionic-angular';

import { SideMenuContent } from './../models/side-menu-content.model';


@Injectable()
export class SideMenuControllerService {

    constructor(
        public events: Events,
        public menuCtrl: MenuController
    ) {}

    setupClubSideMenuContent() {

        let clubSideMenuContents: SideMenuContent[] = [
            {name: 'Votre vitrine', path: 'ClubProfilePage'},
            {name: 'Vos événements', path: 'EventsPage'},
            {name: 'Demandes d\'Adhésion', path: 'MembershipApplicationsPage'}
        ];
        
        this.enableSideMenu(true);
        this.events.publish('sideMenu:changeContent', clubSideMenuContents);

    }

    enableSideMenu(isEnabled: boolean) {
        this.menuCtrl.enable(isEnabled);
    }

}
