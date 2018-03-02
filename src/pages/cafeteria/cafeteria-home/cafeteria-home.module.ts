import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CafeteriaHomePage } from './cafeteria-home';


@NgModule({
    declarations: [
        CafeteriaHomePage,
    ],
    imports: [
        IonicPageModule.forChild(CafeteriaHomePage),
    ],
})
export class CafeteriaHomePageModule { }
