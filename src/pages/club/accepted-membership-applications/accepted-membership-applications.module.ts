import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AcceptedMembershipApplicationsPage } from './accepted-membership-applications';


@NgModule({
    declarations: [
        AcceptedMembershipApplicationsPage,
    ],
    imports: [
        IonicPageModule.forChild(AcceptedMembershipApplicationsPage),
    ],
})
export class AcceptedMembershipApplicationsPageModule { }
