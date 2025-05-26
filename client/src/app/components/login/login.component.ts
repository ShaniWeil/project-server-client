import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../classes/user';
import { ServiceService } from '../../services/service.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgIf, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  correctUser: boolean = false;
  data: User[] = [];
  showPassword: boolean = false;

  constructor(
    private userService: UserService,
    private service: ServiceService,
    private loginService: LoginService,
    private router: Router
  ) { }


  /*   loginSubmit = (user: User): void => {
      if (user.name === "manager" && user.password === "manager328412598") {
        const completeUser: User = {
          id: "",
          name: user.name,
          password: user.password,
          email: "",
          phone: "",
          address: ""
        };
        this.service.currentUser = completeUser;
        this.loginService.login(completeUser).subscribe({
          next: (response) => {
            localStorage.setItem('token', response.token);
            console.log(` name - ${completeUser.name} | password - ${completeUser.password} `);
            this.router.navigate(["manager"]);
          },
          error: (err) => {
            console.error('Login manager failed:', err);
            console.log(` name - ${completeUser.name} | password - ${completeUser.password} `);
          }
        });
      }
      else {
        this.userService.getByNamePassword(user.name, user.password).subscribe({
          next: () => {
            console.log(`User logined ${user.id} successfully!`);
            this.userService.getAll().subscribe((value) => {
              this.data = value;
              for (let i = 0; i < this.data.length; i++) {
                if (user.name === this.data[i].name && user.password === this.data[i].password) {
                  this.service.currentUser = this.data[i];
                  break;
                }
              }
  
              if (this.service.currentUser)
                this.router.navigate(["profile"]);
  
            });
          },
          error: (err) => {
            this.correctUser = true;
            console.error('Error logined user:', err);
          }
        });
  
        // this.userService.getAll().subscribe((value) => {
        //   this.data = value;
        //   for (let i = 0; i < this.data.length; i++) {
        //     if (user.name === this.data[i].name && user.password === this.data[i].password) {
        //       this.service.currentUser = this.data[i];
        //       break; 
        //     }
        //   }
        // 
        //   if (this.service.currentUser)
        //     this.router.navigate(["profile"]);
        //  
        // });
      }
    } */

  //
  // שפור הפונקציה שלי ע"י הצ'אט... :) :)
  //

  /* 💖 */
  // this.userService.getAll() is Authorize... 
  /* 💖 */

  /*   loginSubmit = (user: User): void => {
        const completeUser: User = {
            id: "", 
            name: user.name,
            password: user.password,
            email: "", 
            phone: "",
            address: "" 
        };
  
        this.loginService.login(completeUser).subscribe({
            next: (response) => {
                localStorage.setItem('token', response.token);
                console.log(`name - ${completeUser.name} | password - ${completeUser.password}`);
                this.service.isManager = true;
                this.service.currentUser = user;
                this.router.navigate(["manager"]);
            },
            error: (err) => {
                console.error('Login failed:', err);
                this.userService.getByNamePassword(user.name, user.password).subscribe({
                    next: () => {
                        console.log(`User logged in ${user.id} successfully!`);
                        this.userService.getAll().subscribe((value) => {
                            this.data = value;
                            for (let i = 0; i < this.data.length; i++) {
                                if (user.name === this.data[i].name && user.password === this.data[i].password) {
                                    this.service.currentUser = this.data[i];
                                    break;
                                }
                            }
                            if (this.service.currentUser) {
                                this.router.navigate(["profile"]);
                            }
                        });
                    },
                    error: (err) => {
                        this.correctUser = true;
                        console.error('Error logging in user:', err);
                    }
                });
            }
        });
    } */

  loginSubmit = (user: User): void => {
    const completeUser: User = {
      id: "",
      name: user.name,
      password: user.password,
      email: "",
      phone: "",
      address: ""
    };

    this.loginService.login(completeUser).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        console.log(`name - ${completeUser.name} | password - ${completeUser.password}`);
        this.service.isManager = true;
        this.service.currentUser = user;
        this.router.navigate(["manager"]);
      },
      error: (err) => {
        console.error('Login failed:', err);

        this.userService.getByNamePassword(user.name, user.password).subscribe({
          next: (userFromServer) => {
            console.log(`User logged in ${userFromServer.id} successfully!`);

            // בדיקה אם המשתמש באמת קיים לפי ID:
            this.userService.userExists(userFromServer.id).subscribe({
              next: (exists) => {
                if (exists) {
                  this.service.currentUser = userFromServer;
                  this.router.navigate(["profile"]);
                } else {
                  this.correctUser = true;
                  console.error('User does not exist');
                }
              },
              error: (existErr) => {
                console.error('Error checking if user exists:', existErr);
              }
            });
          },
          error: (getErr) => {
            this.correctUser = true;
            console.error('Error getting user by name and password:', getErr);
          }
        });
      }
    });
  }


  togglePasswordVisibility = (): void => {
    this.showPassword = !this.showPassword;
  }

  toRegister = (): void => {
    this.router.navigate(["register"])
  }

  togglePassword = (): void => {
    this.showPassword = !this.showPassword;
  }

}
