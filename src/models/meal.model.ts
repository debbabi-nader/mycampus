import { Feedback } from './feedback.model';


export class Meal {

    key?: string;
    mealType: string;
    starter: string;
    mainCourse: string;
    dessert: string;
    date: Date;
    quantity: number;
    photoGallery: string[];
    feedbacks: Feedback[];

}