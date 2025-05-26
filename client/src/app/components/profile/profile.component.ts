import { Component, ChangeDetectorRef } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { User } from '../../classes/user';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [ MatIconModule, ReactiveFormsModule, NgIf, MatIconModule ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  user: boolean = false;
  userConnected : User = new User("", "", "", "", "", "");
  userProfile = false;
  showPassword: boolean = false;

  constructor(
    private userService : UserService,
    private service: ServiceService,
    private router : Router,
    private changeDetectorRef: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    if (this.service.currentUser == null) {
      this.user = true;
    }
    else{
      this.userConnected = this.service.currentUser;
    }
  }

  updateForm : FormGroup = new FormGroup({
      id : new FormControl("", Validators.pattern('^[0-9]+$')),
      name : new FormControl(""),
      password : new FormControl("", Validators.minLength(4)),
      email : new FormControl("", Validators.email),
      address : new FormControl(),
      phone : new FormControl("", Validators.pattern('^[0-9]+$'))
    })

    updateSubmit = (): void => {
      const user: User = new User(
        this.service.currentUser!.id,
        this.updateForm.get("name")?.value || this.service.currentUser!.name,
        this.updateForm.get("password")?.value || this.service.currentUser!.password,
        this.updateForm.get("email")?.value || this.service.currentUser!.email,
        this.updateForm.get("address")?.value || this.service.currentUser!.address,
        this.updateForm.get("phone")?.value || this.service.currentUser!.phone
      );
    
      this.userService.update(this.service.currentUser!.id, user).subscribe(() => {
        this.service.currentUser = user;
        this.userConnected = user;

        this.changeDetectorRef.detectChanges();

        this.router.navigate(["profile"]);
        this.userProfile = false;
      });
    };

    toProducts = () : void => {
      this.router.navigate(["show"]);
    }

    toRegister = () : void => {
      this.router.navigate(["register"]);
    }

    toLogin = () : void => {
      this.router.navigate(["login"]);
    }

    breakAway = () : void  => {
    if (confirm(`${this.userConnected.name} את/ה רוצה לצאת עכשיו מהאתר?`)) {
      this.service.currentUser = null;
      this.service.isManager = false;
      this.router.navigate(["/"]);
    }
  }

  updateUser = () : void => {
    this.userProfile = true;
  }

  togglePassword = () : void => {
    this.showPassword = !this.showPassword;
  }

}
