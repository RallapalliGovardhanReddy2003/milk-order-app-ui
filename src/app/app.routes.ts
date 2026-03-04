import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';

import { LayoutComponent } from './pages/layout/layout.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductsComponent } from './pages/products/products.component';

import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

{ path: '', redirectTo: 'home', pathMatch: 'full' },

// Public routes
{ path: 'home', component: HomeComponent },
{ path: 'login', component: LoginComponent },
{ path: 'signup', component: SignupComponent },
{ path: 'about', component: AboutComponent },
{ path: 'contact', component: ContactComponent },

// Layout wrapper (Sidebar + Navbar)
{
path: '',
component: LayoutComponent,
children: [

// Public dashboard WITH sidebar
{ path: 'dashboard', component: DashboardComponent },

// Protected routes
{ path: 'users', component: UsersComponent, canActivate: [authGuard] },
{ path: 'orders', component: OrdersComponent, canActivate: [authGuard] },
{ path: 'products', component: ProductsComponent, canActivate: [authGuard] }

]
},

{ path: '**', redirectTo: 'home' }

];
