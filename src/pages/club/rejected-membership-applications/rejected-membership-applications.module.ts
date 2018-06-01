import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { RejectedMembershipApplicationsPage } from './rejected-membership-applications';


@NgModule({
    declarations: [
        RejectedMembershipApplicationsPage,
    ],
    imports: [
        IonicPageModule.forChild(RejectedMembershipApplicationsPage),
    ],
})
export class RejectedMembershipApplicationsPageModule { }
