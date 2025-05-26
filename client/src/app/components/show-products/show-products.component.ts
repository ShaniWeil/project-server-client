import { Component, OnInit } from '@angular/core';
import { Product } from '../../classes/product';
import { ProductService } from '../../services/product.service';
import { ShowProductComponent } from "../show-product/show-product.component";
import { CategoryService } from '../../services/category.service';
import { Category } from '../../classes/category';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NgFor, NgIf } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ServiceService } from '../../services/service.service';
import { OrderService } from '../../services/order.service';
import { Order } from '../../classes/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-products',
  imports: [ShowProductComponent, MatTooltipModule, NgIf, NgFor, MatSelectModule, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './show-products.component.html',
  styleUrl: './show-products.component.scss'
})
export class ShowProductsComponent implements OnInit {

  selectedValue: number | null = null;
  searchTerm: string = "";
  categories: Category[] = [];
  products: Product[] = [];
  productsSelected: Product[] = [];
  noProducts: boolean = false;

  constructor(private productService: ProductService,
    private categoryService: CategoryService,
    public service: ServiceService,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe(data => this.products = data);
    this.categoryService.getAll().subscribe(data => this.categories = data);
    this.productService.getAll().subscribe(data => this.productsSelected = data);
  }

  onSearchChange = (): void => {
    const term = this.searchTerm.trim().toLowerCase();
    if (term === '')
      this.productsSelected = this.products;
    else {
      this.productsSelected = this.products.filter(product =>
        product.name?.toLowerCase().includes(term)
      );
      if (this.productsSelected.length == 0)
        this.noProducts = true;
    }
  }

  onCategoryChange = (): void => {
    if (this.selectedValue === null)
      this.productsSelected = this.products;
    else {
      this.productsSelected = this.products.filter(p => p.categoryId === this.selectedValue);
      if (this.productsSelected.length == 0)
        this.noProducts = true;
    }
  }

  finishOrder = (): void => {

    const totalSum = this.service.cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    if (this.service.currentUser) {
      const newOrder = new Order(0, new Date(), this.service.currentUser.id, totalSum);
      this.orderService.add(newOrder).subscribe({
        next: () => {
          for (let item of this.service.cart) {
            item.product.quantityInStock -= item.quantity;
            const id = item.product.id;
            this.productService.update(id, item.product).subscribe(); 
          }

          this.service.cart = [];
          this.router.navigate(["message"]);
          this.service.canFinish = false;
        },
        error: (err) => console.error(err)
      });

    }

  }
}

