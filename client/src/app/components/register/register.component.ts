import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../classes/user';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgIf, MatIconModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  userExists: boolean = false;
  showPassword: boolean = false;
  data: User[] = [];

  ngOnInit(): void {
    this.registerForm.valueChanges.subscribe((value) => { console.log(value) });
  }

  constructor(
    private userService: UserService,
    private service: ServiceService,
    private router: Router
  ) { }

  registerForm: FormGroup = new FormGroup({
    id: new FormControl("", [Validators.required, Validators.pattern('^[0-9]+$')]),
    name: new FormControl("", Validators.required),
    password: new FormControl("", [Validators.required, Validators.minLength(4)]),
    email: new FormControl("", Validators.email),
    address: new FormControl(),
    phone: new FormControl("", Validators.pattern('^[0-9]+$'))
  })

  registerSubmit = (): void => {
    const password = this.registerForm.get('password')?.value;
    const email = this.registerForm.get('email')?.value || "אין-מייל";
    const address = this.registerForm.get('address')?.value || "אין-כתובת";
    const phone = this.registerForm.get('phone')?.value || "אין-טלפון";

    const user: User = new User(
      this.registerForm.get('id')?.value,
      this.registerForm.get('name')?.value,
      password ? password.toString() : '',
      email,
      address,
      phone
    );

    this.userExists = false;

    /* 💖 */
    // this.userService.getAll() is Authorize... 
    /* 💖 */

    /* this.userService.getAll().subscribe((value) => {
      this.data = value;
  
      for (let i = 0; i < this.data.length; i++) {
        if (user.id === this.data[i].id) {
          this.userExists = true;
          break; 
        }
      }
  
      if (!this.userExists) {
        this.userService.add(user).subscribe({
          next: () => {
            console.log(`User added successfully: ${this.registerForm.get('name')?.value}`);
            this.service.currentUser = user;
            this.router.navigate(["profile"]);
          },
          error: (err) => {
            console.error('Error adding user:', err);
          }
        });
      }
    } );*/

    this.userService.userExists(user.id).subscribe((exists: boolean) => {
      this.userExists = exists;

      if (!this.userExists) {
        this.userService.add(user).subscribe({
          next: () => {
            console.log(`User added successfully: ${this.registerForm.get('name')?.value}`);
            this.service.currentUser = user;
            this.router.navigate(["profile"]);
          },
          error: (err) => {
            console.error('Error adding user:', err);
          }
        });
      }
    });
  };

  toLogin = (): void => {
    this.router.navigate(["login"]);
  }

  togglePassword = (): void => {
    this.showPassword = !this.showPassword;
  }


}
