import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClubProfilePage } from './club-profile';

import { IonicImageViewerModule } from 'ionic-img-viewer';


@NgModule({
    declarations: [
        ClubProfilePage,
    ],
    imports: [
        IonicPageModule.forChild(ClubProfilePage),
        IonicImageViewerModule
    ],
})
export class ClubProfilePageModule { }
