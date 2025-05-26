import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { Order } from '../classes/order';
import { Product } from '../classes/product';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  currentUser: User | null = null;
  currentOrder: Order | null = null;
  isManager: boolean = false; 
  cart: { product: Product; quantity: number }[] = [];
  canFinish: boolean = false;

  constructor() {}
}
