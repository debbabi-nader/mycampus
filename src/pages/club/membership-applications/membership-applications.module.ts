import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MembershipApplicationsPage } from './membership-applications';


@NgModule({
    declarations: [
        MembershipApplicationsPage,
    ],
    imports: [
        IonicPageModule.forChild(MembershipApplicationsPage),
    ],
})
export class MembershipApplicationsPageModule { }
