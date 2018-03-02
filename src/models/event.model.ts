import { Club } from './club.model';
import { Feedback } from './feedback.model';
import { User } from './user.model';


export class Event {

    key?: string;
    name: string;
    startDate: Date;
    endDate: Date;
    location: string;
    organizator: Club;
    description: string;
    mainPhoto: string;
    photoGallery: string[];
    interested: User[];
    feedbacks: Feedback[];

}