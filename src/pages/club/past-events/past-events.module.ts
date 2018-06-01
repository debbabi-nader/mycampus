import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { PastEventsPage } from './past-events';


@NgModule({
    declarations: [
        PastEventsPage,
    ],
    imports: [
        IonicPageModule.forChild(PastEventsPage),
    ],
})
export class PastEventsPageModule { }
