import { User } from './user.model';
import { RecruitmentAnswer } from './recruitment-answer.model';


export class RecruitmentSubmission {

    user: User;
    academicDegree: string;
    studyLevel: string;
    skills: string[];
    motivation: string;
    surveyAnswer: RecruitmentAnswer[];
    date: Date;

}