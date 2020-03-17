import { Injectable } from '@angular/core';
import { CountryModel } from '../models/country.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

declare var openPlatformModalMessage:any;

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  url: String = "http://localhost:3000/api/countries";
  countryList: CountryModel[] = [];

  constructor(private http: HttpClient) { }

  loadAllCountries():Observable<CountryModel[]>{
    return this.http.get<CountryModel[]>(`${this.url}`);
  }

  saveNewCountry(country: CountryModel):Observable<CountryModel>{
    this.loadAllCountries().subscribe(data => {this.countryList = data});
    let exists = this.countryList.find(c => c.code == country.code);
    if (!exists){
      openPlatformModalMessage("Data stored succesfully");
      return this.http.post<CountryModel>(`${this.url}`, country,
      {
        headers: new HttpHeaders({
          "content-type" : "application/json"
        })
      });
    }else {
      openPlatformModalMessage("The country with this code already exists!")
    }
  }

  searchCountry(code: String){
    this.loadAllCountries().subscribe(data => {this.countryList = data});
    let country = this.countryList.find(c => c.code == code);
    return country;
  }

  updateCountry(country: CountryModel):Observable<CountryModel>{
    this.loadAllCountries().subscribe(data => {
      this.countryList = data;
    });
    let exists = this.countryList.filter(c => c.code == country.code).length == 0;
    if (!exists){
      let tmp = this.countryList.find(c => c.code == country.code);
      openPlatformModalMessage("Data stored successfully");
      return this.http.put<CountryModel>(`${this.url}/${tmp.id}`, {
        code: country.code,
        name: country.name
      }, 
      {
        headers: new HttpHeaders({
          "content-type": "application/json"
        })
      });
    }else {
      openPlatformModalMessage("The country with this code does not exist");
    }
  }

  deleteCountry(code: String):Observable<CountryModel>{
    this.loadAllCountries().subscribe(data => {this.countryList = data});
    let country = this.countryList.find(c => c.id == code);
    return this.http.delete<CountryModel>(`${this.url}/${country.id}`)
  }
}
