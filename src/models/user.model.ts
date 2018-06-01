import { Degree } from './degree.model';
import { Institution } from './institution.model';
import { University } from './university.model';

export class User {

    uid: string;
    userType: string;
    firstName: string;
    lastName: string;
    icn: string;
    email: string;
    phoneNumber: number;
    profilePicture: string;
    university: University;
    institution: Institution;
    degree: Degree;
    grade: number;

}
