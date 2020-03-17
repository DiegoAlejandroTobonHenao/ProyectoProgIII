import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { PageNotFoundComponent } from './public/page-not-found/page-not-found.component';
import { AuthenticationRequiredGuard } from './helpers/guards/authentication-required.guard';
import { PublicationListComponent } from './public/publication-list/publication-list.component';
import { ContactComponent } from './public/contact/contact.component';
import { CompanyInformationComponent } from './public/company-information/company-information.component';


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
    path:'posts',
    component: PublicationListComponent
  },
  {
    path:'contact',
    component: ContactComponent
  },
  {
    path:'company-information',
    component: CompanyInformationComponent
  },
  {
    path: 'administrator',
    loadChildren:'./modules/administrator/administrator-admin/administrator-admin.module#AdministratorAdminModule',
    canActivate: [AuthenticationRequiredGuard]
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
    path: 'asesor',
    loadChildren: './modules/asesor/asesor.module#AsesorModule',
    canActivate: [AuthenticationRequiredGuard]
  },
  {
    path: 'country',
    loadChildren:'./modules/administrator/inmobiliary/parameters/country-admin/country-admin.module#CountryAdminModule',
    canActivate: [AuthenticationRequiredGuard]
  },
  {
    path: 'city',
    loadChildren: './modules/administrator/inmobiliary/parameters/city-admin/city-admin.module#CityAdminModule',
    canActivate: [AuthenticationRequiredGuard]
  },
  {
    path: 'department',
    loadChildren: './modules/administrator/inmobiliary/parameters/department-admin/department-admin.module#DepartmentAdminModule',
    canActivate: [AuthenticationRequiredGuard]
  },
  {
    path: 'property',
    loadChildren: './modules/administrator/inmobiliary/parameters/property-admin/property-admin.module#PropertyAdminModule',
    canActivate: [AuthenticationRequiredGuard]
  },
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
