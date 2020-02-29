import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { PageNotFoundComponent } from './public/page-not-found/page-not-found.component';
import { AuthenticationRequiredGuard } from './helpers/guards/authentication-required.guard';


const routes: Routes = [
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'',
    pathMatch:'full',
    redirectTo:'/home'
  },
  {
    path:'security',
    loadChildren:'./modules/security/security.module#SecurityModule',
  },
  {
    path:'client',
    loadChildren:'./modules/client/client.module#ClientModule',
  },
  {
    path:'asesor',
    loadChildren:'./modules/asesor/asesor.module#AsesorModule',
  },
  {
    path: 'country',
    loadChildren:'./modules/parameters/country-admin/country-admin.module#CountryAdminModule',
    canActivate: [AuthenticationRequiredGuard]
  },
  {
    path: 'city',
    loadChildren: './modules/parameters/city-admin/city-admin.module#CityAdminModule',
    canActivate: [AuthenticationRequiredGuard]
  },
  {
    path: 'department',
    loadChildren: './modules/parameters/department-admin/department-admin.module#DepartmentAdminModule',
    canActivate: [AuthenticationRequiredGuard]
  },
  /*{
    path: 'hotel',
    loadChildren: './modules/administrator/hotel/hotel.module#HotelModule',
    canActivate: [AuthenticationRequiredGuard]
  },*/
  {
    path:'**',
    component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
