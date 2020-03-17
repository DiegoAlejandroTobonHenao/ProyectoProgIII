import { Injectable } from '@angular/core';
import { CityModel } from '../models/city.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

declare var openPlatformModalMessage: any;

@Injectable({
  providedIn: 'root'
})
export class CityService {

  url: String = "http://localhost:3000/api/cities";
  cityList: CityModel[] = [];

  constructor(private http: HttpClient) { }

  loadAllCities():Observable<CityModel[]>{
    return this.http.get<CityModel[]>(`${this.url}`);
  }

  loadAllCitiesByDepartment(departmentId){
    this.loadAllCities().subscribe(data => {this.cityList = data});
    return this.cityList.filter(c => c._departmentId == departmentId);
  }

  saveNewCity(city: CityModel):Observable<CityModel>{
    this.loadAllCities().subscribe(data => {this.cityList = data});
    let exists = this.cityList.filter(c => c.code == city.code).length > 0;
    if (!exists){
      openPlatformModalMessage("Data stored succesfully");
      return this.http.post<CityModel>(`${this.url}`, city,
      {
        headers: new HttpHeaders({
          "content-type" : "application/json"
        })
      });
    }else {
      openPlatformModalMessage("The city with this code already exists!")
    }
  }

  searchCity(code: String){
    this.loadAllCities().subscribe(data => {this.cityList = data});
    let city = this.cityList.find(c => c.code == code);
    return city;
  }

  updateCity(city: CityModel):Observable<CityModel>{
    this.loadAllCities().subscribe(data => {
      this.cityList = data;
    });
    let exists = this.cityList.filter(c => c.code == city.code).length == 0;
    if (!exists){
      let tmp = this.cityList.find(c => c.code == city.code);
      openPlatformModalMessage("Data stored successfully");
      return this.http.put<CityModel>(`${this.url}/${tmp.id}`, {
        code: city.code,
        name: city.name,
        _departmentId: city._departmentId
      }, 
      {
        headers: new HttpHeaders({
          "content-type": "application/json"
        })
      });
    }else {
      openPlatformModalMessage("The city with this code does not exist");
    }
  }

  deleteCity(code: String):Observable<CityModel>{
    this.loadAllCities().subscribe(data => {this.cityList = data});
    let city = this.cityList.find(c => c.id == code);
    return this.http.delete<CityModel>(`${this.url}/${city.id}`)
  }
}
