import { Component, OnInit } from '@angular/core';
import { Order } from '../../classes/order';
import { OrderService } from '../../services/order.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../classes/user';

@Component({
  selector: 'app-orders-manager',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './orders-manager.component.html',
  styleUrl: './orders-manager.component.scss'
})
export class OrdersManagerComponent implements OnInit {

  orders: Order[] = []
  users: User[] = []

  constructor(private orderService: OrderService, private userService: UserService) { }

  ngOnInit(): void {
    this.orderService.getAll().subscribe(data => this.orders = data);
    this.userService.getAll().subscribe(data => this.users = data);
  }

  getUserName = (id: string): string => {
    const userName = this.users.find(u => u.id === id);
    return userName ? userName.name : "";
  }

}
