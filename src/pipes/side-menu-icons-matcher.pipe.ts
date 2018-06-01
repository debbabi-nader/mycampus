import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'sideMenuIconsMatcher'
})
export class SideMenuIconsMatcherPipe implements PipeTransform {

    transform(value: string): string {

        switch (value) {
            case 'Votre vitrine': { return 'fas fa-id-card'; }
            case 'Vos événements': { return 'far fa-calendar-alt'; }
            case 'Demandes d\'Adhésion': { return 'fas fa-user-plus'; }
        }

    }

}
