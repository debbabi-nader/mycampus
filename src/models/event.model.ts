import { Photo } from './photo.model';
import { Address } from './address.model';
import { Feedback } from './feedback.model';


export class Event {

    key: number;
    name: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    location: Address;
    organizator: string;
    description: string;
    tags: string[];
    mainPhoto: string;
    photoGallery: Photo[];
    interested: string[];
    feedbacks: Feedback[];

}