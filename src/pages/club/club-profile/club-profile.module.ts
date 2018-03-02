import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClubProfilePage } from './club-profile';


@NgModule({
    declarations: [
        ClubProfilePage,
    ],
    imports: [
        IonicPageModule.forChild(ClubProfilePage),
    ],
})
export class ClubProfilePageModule { }
