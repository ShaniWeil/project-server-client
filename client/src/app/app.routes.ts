import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ManagerComponent } from './components/manager/manager.component';
import { ShowProductsComponent } from './components/show-products/show-products.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { ProductManagementComponent } from './components/product-management/product-management.component';
import { CategoryManagementComponent } from './components/category-management/category-management.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { managerGuard } from './guard/manager.guard';
import { ShowProductDetialsComponent } from './components/show-product-detials/show-product-detials.component';
import { OrdersManagerComponent } from './components/orders-manager/orders-manager.component';
import { MessageComponent } from './components/message/message.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path : "home", component : HomeComponent },
    { path : "register", component : RegisterComponent},
    { path : "login", component : LoginComponent},
    { path : "profile", component : ProfileComponent},
    { path : "cart", component : ShoppingCartComponent},
    { path : "show", component : ShowProductsComponent},
    { path: 'product/:id', component: ShowProductDetialsComponent },
    { path: 'message', component: MessageComponent },
    { path : "manager", component : ManagerComponent,
        children:[
            { path : "users", component : UserManagementComponent},
            { path : "products", component : ProductManagementComponent},
            { path : "categories", component : CategoryManagementComponent},
            { path : "orders", component : OrdersManagerComponent}
        ]
        , canActivate : [managerGuard]
    },
    { path: "about", component: AboutComponent },
    { path: "**", component: NotFoundComponent }
];
