import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Product } from './../models/product.model';


@Injectable()
export class ProductListService{
    private productListRef= this.db.list<Product> ('product');
    
    constructor(private db : AngularFireDatabase){
    }

    getProductList(){
        return this.productListRef;
    }
    
    addItem(p: Product){
        return this.productListRef.push(p);
    }

    editItem(p:Product){
        this.productListRef.update(p.key,p);
    }

    remove(p:Product){
        return this.productListRef.remove(p.key);
    }
}