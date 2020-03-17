import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';
import { SecurityService } from "src/app/services/security.service";
import { RequestService } from 'src/app/services/request.service';
import { PropertyModel } from 'src/app/models/property.model';
import { UserModel } from 'src/app/models/user.model';
import { RequestModel } from 'src/app/models/request.model';
import { Router } from '@angular/router';

declare var initMaterializeSelect: any;
declare var openPlatformModalMessage: any;
declare var openImageModal: any;

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.css']
})
export class PublicationListComponent implements OnInit {

  propertyList: PropertyModel[];
  currentUser: UserModel;
  propertyImage: String;
  filterPostSearch = '';
  filterPostProperty = '';
  filterPostRequest = '';

  constructor(private propertyService: PropertyService, private secService: SecurityService, private requestService: RequestService, private router: Router) { }

  ngOnInit() {
    this.propertyService.loadAllProperties().subscribe(data => {
      setTimeout(() => {
        this.propertyList = data
      },10)
    });
    this.getUserInfo();
  }

  ngAfterViewInit() {
    initMaterializeSelect();
  }

  getUserInfo() {
    this.secService.getUserInfo().subscribe(data => { 
      this.currentUser = data
      console.log(this.currentUser) 
    })
  }

  openImage(image){
    this.propertyImage = image;
    openImageModal()
  }

  doRequest(p: PropertyModel) {
    var dateDay = new Date();
    var dd = dateDay.getDate();
    var mm = dateDay.getMonth() + 1;
    var yyyy = dateDay.getFullYear();
    dd = this.addZero(dd);
    mm = this.addZero(mm);
    console.log(dd + '/' + mm + '/' + yyyy);
    let today: String = dd + '/' + mm + '/' + yyyy;
    let r: RequestModel = {
      address: this.currentUser.address,
      status: "Send",
      propertyType: p.propertyType,
      image: p.image,
      price: p.price,
      clientCode: this.currentUser.identification,
      dateRequest: today 
    }
    this.requestService.saveRequest(r).subscribe();
    openPlatformModalMessage("Data stored succesfully");
    setTimeout(() => {
      this.router.navigate(['client/request'])
    });
  }

  private addZero(i) {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  }
}
