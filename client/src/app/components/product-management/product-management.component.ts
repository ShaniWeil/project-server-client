import { Component, OnInit } from '@angular/core';
import { Product } from '../../classes/product';
import { ProductService } from '../../services/product.service';
import { CommonModule, CurrencyPipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from '../../classes/category';
import { CategoryService } from '../../services/category.service';
import { QuantityPipe } from '../../pipes/quantity.pipe';

@Component({
  selector: 'app-product-management',
  imports: [ NgIf, FormsModule, CommonModule, CurrencyPipe, QuantityPipe ],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.scss'
})
export class ProductManagementComponent implements OnInit{

    products : Product[] = [];
    categories : Category[] = [];
    addProduct : boolean = false;
    updateProduct : boolean = false;
    putProductbtn : boolean = true;
    id : number = 0;
    currentProduct :  Product = new Product(0, "", 0, "", 0, 0, "");
  
    constructor(private productService : ProductService, 
      private categoryService : CategoryService) { }
  
    ngOnInit() : void {
      this.productService.getAll().subscribe(data => this.products = data);
      this.categoryService.getAll().subscribe(data => this.categories = data);
    }


    postProductSubmit = (id : number, product : Product) : void => {
       const updatedProduct: Product = {
        id: id,
        name: product.name,
        description: product.description,
        quantityInStock: product.quantityInStock,
        price: product.price,
        categoryId: product.categoryId,
        routingToImage: `assets/images/${product.routingToImage}`
        };
      this.productService.update(id, updatedProduct).subscribe({
        next : () => {
          const index = this.products.findIndex(p => p.id === id);
          if (index !== -1)
            this.products[index] = updatedProduct;
        }, error : (error) => {
          console.log(` error - ${error} `);
        }
      }
      );
      this.updateProduct = false;
    } 

    postProduct = (id : number) : void => {
      const foundProduct = this.products.find(product => product.id === id);
      if (foundProduct)
        this.currentProduct = foundProduct;
      this.id = id;
      this.updateProduct = true;
    }

    addProductSubmit = (product : Product) : void  => {
        if (!product.routingToImage.startsWith("assets/images/")) 
          product.routingToImage = `assets/images/${product.routingToImage}`;

          this.productService.add(product).subscribe({
          next: () => {
            this.products.push(product);
            this.addProduct = false;
          },
          error: (error) => {
              console.error( error );
          }
      });
      this.putProductbtn = true; 
    }

    putProduct = () : void => {
        this.putProductbtn = false;
        this.addProduct = true;
    }


    deleteProduct = (id : number) : void => {
            this.productService.delete(id).subscribe({
          next: () => {
              this.products = this.products.filter(p => p.id !== id);
          },
          error: (err) => {
              console.error('Error deleting product:', err);
          }
      });
    }


  getCategoryName = (categoryId: number) : string => {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : "";
  }

  isCategoryValid(categoryId: number): boolean {
    return this.categories.some(cat => cat.id === categoryId);
  }

  getImageName = (routing: string) : string => {
    if (!routing) return '';
    const parts = routing.split('/');
    return parts[parts.length - 1];
  }

}
