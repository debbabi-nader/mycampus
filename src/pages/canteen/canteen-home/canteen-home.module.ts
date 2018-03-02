import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CanteenHomePage } from './canteen-home';


@NgModule({
    declarations: [
        CanteenHomePage,
    ],
    imports: [
        IonicPageModule.forChild(CanteenHomePage),
    ],
})
export class CanteenHomePageModule { }
