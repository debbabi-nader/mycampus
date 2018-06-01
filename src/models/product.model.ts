import { Feedback } from './feedback.model';
import { Sale } from './sale.model';


export class Product {
    
    key?: string;
    creatorID: string;
    category: string;
    name: string;
    price: number;
    description: string;
    photo: string;
    sales: Sale[];
    feedbacks: Feedback[];
    type: string;

}