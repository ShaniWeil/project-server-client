import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../classes/user';
import { PhonePipe } from '../../pipes/phone.pipe';
import { LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-user-management',
  imports: [ PhonePipe, LowerCasePipe ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent implements OnInit{

  users : User[] = [];

  constructor(private userService : UserService) { }

  ngOnInit() : void {
    this.userService.getAll().subscribe(data => this.users = data)
  }

  deleteUser = (id: string): void => {
      this.userService.delete(id).subscribe({
          next: () => {
              this.users = this.users.filter(user => user.id !== id);
          },
          error: (err) => {
              console.error('Error deleting user:', err);
          }
      });
  }

}
