import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { Product } from '../../classes/product';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-message',
  imports: [DatePipe],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent{

  date: Date = new Date(Date.now());

  constructor(private router: Router, public service: ServiceService) { }

  toProducts = (): void => {
    this.service.currentOrder = null;
    this.router.navigate(["show"]);
  }

  breakAway = (): void => {
    this.service.currentOrder = null;
    this.service.currentUser = null;
    this.service.isManager = false;
    this.router.navigate(["/"]);
  }

}
