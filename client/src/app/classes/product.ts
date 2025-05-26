export class Product {

    constructor(
        public id : number,
        public name : string,
        public categoryId : number,
        public description : string,
        public price : number,
        public quantityInStock : number,
        public routingToImage : string
    )   {   }

}
