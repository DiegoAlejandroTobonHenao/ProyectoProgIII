import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './public/master-page/navbar/navbar.component';
import { HeroComponent } from './public/master-page/hero/hero.component';
import { FooterComponent } from './public/master-page/footer/footer.component';
import { HomeComponent } from './public/home/home.component';
import { PageNotFoundComponent } from './public/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { PublicationListComponent } from './public/publication-list/publication-list.component';
import { SearchBarFilterPipe } from './pipes/search-bar-filter.pipe';
import { ContactComponent } from './public/contact/contact.component';
import { SelectPropertyFilterPipe } from './pipes/select-property-filter.pipe';
import { SelectRequestFilterPipe } from './pipes/select-request-filter.pipe';
import { CompanyInformationComponent } from './public/company-information/company-information.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeroComponent,
    FooterComponent,
    HomeComponent,
    PageNotFoundComponent,
    PublicationListComponent,
    SearchBarFilterPipe,
    ContactComponent,
    SelectPropertyFilterPipe,
    SelectRequestFilterPipe,
    CompanyInformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
