import { Injectable } from '@angular/core';
import { CityModel } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor() { }

  loadAllCities(){
    let tb_city = JSON.parse(localStorage.getItem("tb_cities"));
    if (tb_city != undefined && tb_city != null){
      return tb_city;
    }else{
      return [];
    }
  }

  loadAllCitiesByCountry(countryId){
    let tb_city = JSON.parse(localStorage.getItem("tb_cities"));
    if (tb_city != undefined && tb_city != null){
      return tb_city.filter(c => c.countryId == countryId);
    }else {
      return [];
    }
  }

  saveNewCity(city: CityModel){
    try {
      let currentRecords = this.loadAllCities();
      let exists = currentRecords.filter(c => c.code == city.code).length > 0;
      if (!exists){
        currentRecords.push(city);
        this.saveListInLocalStorage(currentRecords);
        return 1;
      }else {
        return 2;
      }
    }catch(error){
      return 3;
    }
  }

  searchCity(code: String){
    let cities = this.loadAllCities();
    let city = cities.find(c => c.code == code);
    return city;
  }

  updateCity(city: CityModel){
    try {
      let cities = this.loadAllCities();
      let exists = cities.filter(c => c.code == city.code).length == 0;
      if (!exists){
        let c = cities.find(c => c.code == city.code);
        cities.splice(cities.indexOf(c), 1, city);
        this.saveListInLocalStorage(cities);
        return 1;
      }else {
        return 2;
      }
    }catch (error){
      return 3;
    }
  }

  saveListInLocalStorage(list){
    localStorage.setItem("tb_cities", JSON.stringify(list));
  }

  deleteCity(code: String){
    let cities = this.loadAllCities();
    let city = cities.find(c => c.code == code);
    cities.splice(cities.indexOf(city), 1);
    this.saveListInLocalStorage(cities);
  }
}
