import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../classes/product';
import { CurrencyPipe, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../classes/category';
import { ServiceService } from '../../services/service.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-show-product-detials',
  imports: [NgIf, CurrencyPipe, MatIconModule, MatTooltipModule],
  templateUrl: './show-product-detials.component.html',
  styleUrl: './show-product-detials.component.scss'
})
export class ShowProductDetialsComponent implements OnInit {

  product?: Product;
  categories: Category[] = [];
  order: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    public service: ServiceService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getById(id).subscribe(p => this.product = p);
    this.categoryService.getAll().subscribe(data => this.categories = data);
  }

  getCategoryName = (id: number): string => {
    const category = this.categories.find(c => c.id === id);
    return category ? category.name : "";
  }

  toProducts = (): void => {
    this.router.navigate(["show"])
  }

  addToCart = (): void => {
    this.order = true;
  }

  ok = (qty1: number, qty2: string, p: Product): void => {
    const qty = parseInt(qty2);
    if (qty1 < qty)
      alert(` אופס! הכמות המקסימלית להזמנה היא ${qty1}. `)
    else {
      const sum = qty * p.price;
      this.service.cart.push({ product: p, quantity: qty });
      this.order = false;
      this.service.canFinish =  true;
    }

  // // ...input & output לצערי, לא הצלחתי עם 
  // @Input() selectedProduct: Product = new Product(0, "", 0, "", 0, 0, "");
  }
}
