import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Order } from '../../classes/order';
import { OrderService } from '../../services/order.service';
import { Product } from '../../classes/product';
import { CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-shopping-cart',
  imports: [NgFor, NgIf, CurrencyPipe, DatePipe],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit {


  orders: Order[] = []
  order?: Order;
  cart: any[] = [];
  totalSum = 0;

  constructor(
    public service: ServiceService,
    private orderService: OrderService,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.service.currentUser != null) {
      this.orderService.getByUserId(this.service.currentUser.id).subscribe(data => this.orders = data);
    }
    this.cart = this.service.cart;
    this.totalSum = this.cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }

  currentOrder = (): void => {
    const currentOrder = this.service.currentOrder;
    if (currentOrder !== null)
      this.order = currentOrder;
  }

  increase(item: { product: Product; quantity: number }) {
    if (item.quantity < item.product.quantityInStock) {
      item.quantity++;
      this.updateSum();
    }
  }

  decrease(item: { product: Product; quantity: number }) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateSum();
    }
  }

  remove(item: { product: Product; quantity: number }) {
    this.cart = this.cart.filter(i => i !== item);
    this.service.cart = this.cart;
    this.updateSum();
  }

  updateSum() {
    this.totalSum = this.cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }

  toRegister = (): void => {
    this.router.navigate(["/register"]);
  }

  toLogin = (): void => {
    this.router.navigate(["/login"]);
  }
  toShow = (): void => {
    this.router.navigate(["/show"]);
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

