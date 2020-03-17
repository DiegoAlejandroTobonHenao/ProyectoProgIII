import { Injectable } from '@angular/core';
import { PropertyModel } from '../models/property.model';
import { EmailModel } from 'src/app/models/email.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

declare var openPlatformModalMessage: any;

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  url: String = "http://localhost:3000/api/properties";
  propertyList: PropertyModel[] = [];

  constructor(private http: HttpClient) { }

  loadAllProperties(): Observable<PropertyModel[]> {
    return this.http.get<PropertyModel[]>(`${this.url}`);
  }

  saveNewProperty(property: PropertyModel): Observable<PropertyModel> {
    this.loadAllProperties().subscribe(data => { this.propertyList = data });
    if (this.propertyList.length > 0) {
      let exists = this.propertyList.find(p => p.code == property.code);
      if (!exists) {
        openPlatformModalMessage("Data stored succesfully");
        return this.http.post<PropertyModel>(`${this.url}`, property,
          {
            headers: new HttpHeaders({
              "content-type": "application/json"
            })
          });
      } else {
        openPlatformModalMessage("The property with this code already exists!")
      }
    } else {
      openPlatformModalMessage("Data stored succesfully");
      return this.http.post<PropertyModel>(`${this.url}`, property,
        {
          headers: new HttpHeaders({
            "content-type": "application/json"
          })
        });
    }
  }

  searchProperty(code: String) {
    this.loadAllProperties().subscribe(data => { this.propertyList = data });
    let property = this.propertyList.find(p => p.code == code);
    return property;
  }

  updateProperty(property: PropertyModel): Observable<PropertyModel> {
    this.loadAllProperties().subscribe(data => {
      this.propertyList = data;
    });
    let exists = this.propertyList.filter(p => p.code == property.code).length == 0;
    if (!exists) {
      let tmp = this.propertyList.find(c => c.code == property.code);
      openPlatformModalMessage("Data stored successfully");
      return this.http.put<PropertyModel>(`${this.url}/${tmp.id}`, {
        code: property.code,
        name: property.name,
        price: property.price,
        description: property.description,
        requestType: property.requestType,
        propertyType: property.propertyType,
        image: property.image
      },
        {
          headers: new HttpHeaders({
            "content-type": "application/json"
          })
        });
    } else {
      openPlatformModalMessage("The property with this code does not exist");
    }
  }

  deleteProperty(code): Observable<PropertyModel> {
    this.loadAllProperties().subscribe(data => { this.propertyList = data });
    let property = this.propertyList.find(p => p.code == code);
    return this.http.delete<PropertyModel>(`${this.url}/${property.id}`)
  }

  sendEmail(email, subject, message):Observable<EmailModel> {
    return this.http.get<EmailModel>(`${this.url}/sendEmail?emailAddresses=${email}&subject=${subject}&message=${message}`)
  }
}
