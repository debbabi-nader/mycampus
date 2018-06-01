import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { NewMembershipApplicationsPage } from './new-membership-applications';


@NgModule({
    declarations: [
        NewMembershipApplicationsPage,
    ],
    imports: [
        IonicPageModule.forChild(NewMembershipApplicationsPage),
    ],
})
export class NewMembershipApplicationsPageModule { }
