import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ComingEventsPage } from './coming-events';


@NgModule({
    declarations: [
        ComingEventsPage,
    ],
    imports: [
        IonicPageModule.forChild(ComingEventsPage),
    ],
})
export class ComingEventsPageModule { }
