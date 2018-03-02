import { RecruitmentSubmission } from './recruitment-submission.model';
import { RecruitmentQuestion } from './recruitment-question.model';
import { Event } from './event.model';
import { Contact } from './contact.model';
import { Staff } from './staff.model';


export class Club {

    key?: string;
    name: string;
    foundationDate: Date;
    description: string;
    staffNumber: number;
    membersNumber: number;
    eventsNumber: number;
    staff: Staff[];
    events: Event[];
    contacts: Contact[];
    recruitmentSurvey: RecruitmentQuestion[];
    recrutmentSubmissions: RecruitmentSubmission[];
    logo: string;
    coverPhoto: string;
    photoGallery: string[];

}