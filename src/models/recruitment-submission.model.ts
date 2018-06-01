import { RecruitmentAnswer } from './recruitment-answer.model';


export class RecruitmentSubmission {

    userKey: string;
    skills: string[];
    motivation: string;
    surveyAnswer: RecruitmentAnswer[];
    date: Date;
    state: string;

}