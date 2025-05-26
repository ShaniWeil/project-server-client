import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../classes/product';
import { ServiceService } from '../../services/service.service';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-show-product',
  imports: [MatIconModule, CurrencyPipe, NgIf, MatTooltipModule, ReactiveFormsModule],
  templateUrl: './show-product.component.html',
  styleUrl: './show-product.component.scss'
})
export class ShowProductComponent {

  order: boolean = false;
  amountFromControl = new FormControl(0);

  @Input() product: Product = new Product(0, "", 0, "", 0, 0, "");

  constructor(public service: ServiceService,
    private router: Router) { }

  // // ...input & output לצערי, לא הצלחתי עם 
  // onSelectProduct() {
  //   this.productSelected.emit(this.product);
  // }

  showDetials = (id: number) => {
    this.router.navigate([`product/${id}`]);
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
      this.service.canFinish = true;
    }

  }
}
