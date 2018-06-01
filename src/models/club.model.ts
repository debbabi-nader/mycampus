import { Photo } from './photo.model';
import { RecruitmentSubmission } from './recruitment-submission.model';
import { RecruitmentQuestion } from './recruitment-question.model';
import { Event } from './event.model';
import { Contact } from './contact.model';
import { Staff } from './staff.model';
import { User } from './user.model';


export class Club {

    key?: string;
    name: string;
    admin: User;
    foundationDate: Date;
    description: string;
    tags: string[];
    membersNumber: number;
    eventsNumber: number;
    staff: Staff[];
    events: Event[];
    contacts: Contact[];
    recruitmentSurvey: number[];
    recruitmentQuestions: RecruitmentQuestion[];
    recrutmentSubmissions: RecruitmentSubmission[];
    logo: string;
    coverPhoto: string;
    photoGallery: Photo[];

}
