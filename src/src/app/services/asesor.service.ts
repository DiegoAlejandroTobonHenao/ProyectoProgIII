import { Injectable } from '@angular/core';
import { AsesorModel } from 'src/app/models/asesor.model';

@Injectable({
  providedIn: 'root'
})
export class AsesorService {

  tmpList: AsesorModel[] = [];

  constructor() { }

  loadAllAsesors(){
    let tb_asesor = JSON.parse(localStorage.getItem("tb_asesors"));
    if (tb_asesor != undefined && tb_asesor != null){
      return tb_asesor;
    }else{
      return [];
    }
  }

  /*loadAllCountries2():Observable<CountryModel[]>{
    return this.http.get<CountryModel[]>(`${this.url}`);
  }*/

  /*saveNewCountry2(country: CountryModel):Observable<CountryModel>{
    this.loadAllCountries2().subscribe(data => {
       this.tmpList = data;
    });
    let exists = this.tmpList.find(c => c.code == country.code)
    if (!exists){
      openPlatformModalMessage("Data stored succesfully");
      return this.http.post<CountryModel>(`${this.url}`, country,
      {
        headers: new HttpHeaders({
          "content-type": "application/json"
        })
      });
    }else {
      openPlatformModalMessage("The country with this code already exist");
    }
  }*/

  saveNewAsesor(asesor: AsesorModel){
    try {
      let currentRecords = this.loadAllAsesors();
      let exists = currentRecords.filter(a => a.identification == asesor.identification).length > 0;
      if (!exists){
        currentRecords.push(asesor);
        this.saveListInLocalStorage(currentRecords);
        return 1;
      }else {
        return 2;
      }
    }catch(error){
      return 3;
    }
  }

  searchAsesor(identification){
    let asesors = this.loadAllAsesors();
    let asesor = asesors.find(a => a.identification == identification);
    return asesor;
  }

  updateAsesor(asesor: AsesorModel){
    try {
      let asesors = this.loadAllAsesors();
      let exists = asesors.filter(a => a.identification == a.identification).length == 0;
      if (!exists){
        let c = asesors.find(c => c.identification == asesor.identification);
        asesors.splice(asesors.indexOf(c), 1, asesor);
        this.saveListInLocalStorage(asesors);
        return 1;
      }else {
        return 2;
      }
    }catch (error){
      return 3;
    }
  }

  /*updateCountry2(country: CountryModel):Observable<CountryModel>{
    this.loadAllCountries2().subscribe(data => {
      this.tmpList = data;
    });
    let exists = this.tmpList.filter(c => c.code == country.code).length == 0;
    if (!exists){
      let tmp = this.tmpList.find(c => c.code == country.code);
      //console.log(tmp);
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
  }*/

  saveListInLocalStorage(list){
    localStorage.setItem("tb_asesors", JSON.stringify(list));
  }

  deleteAsesor(identification){
    let asesors = this.loadAllAsesors();
    let asesor = asesors.find(a => a.identification == identification);
    asesors.splice(asesors.indexOf(asesor), 1);
    this.saveListInLocalStorage(asesors);
  }

  /*deleteCountry2(id: String):Observable<CountryModel>{
    this.loadAllCountries2().subscribe(data => {
      this.tmpList = data;
    });
    let country = this.tmpList.find(c => c.id == id);
    return this.http.delete<CountryModel>(`${this.url}/${country.id}`);
  }*/
}
