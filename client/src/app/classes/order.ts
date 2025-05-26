import { Product } from "./product";

export class Order {

    constructor(
        public id : number,
        public date : Date,
        public userId : string,
        public sum : number,
        //public product: Product[]
    )   {   }

}
