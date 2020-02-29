import { Injectable } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  tmpList: UserModel[] = [];

  constructor() { }

  loadAllClients(){
    let tb_client = JSON.parse(localStorage.getItem("tb_clients"));
    if (tb_client != undefined && tb_client != null){
      return tb_client;
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

  saveNewClient(client: UserModel){
    try {
      let currentRecords = this.loadAllClients();
      let exists = currentRecords.filter(c => c.identification == client.identification).length > 0;
      if (!exists){
        currentRecords.push(client);
        this.saveListInLocalStorage(currentRecords);
        return 1;
      }else {
        return 2;
      }
    }catch(error){
      return 3;
    }
  }

  searchClient(identification){
    let clients = this.loadAllClients();
    let client = clients.find(c => c.identification == identification);
    return client;
  }

  updateClient(client: UserModel){
    try {
      let clients = this.loadAllClients();
      let exists = clients.filter(c => c.identification == client.identification).length == 0;
      if (!exists){
        let c = clients.find(c => c.identification == client.identification);
        clients.splice(clients.indexOf(c), 1, client);
        this.saveListInLocalStorage(clients);
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
    localStorage.setItem("tb_clients", JSON.stringify(list));
  }

  deleteClient(identification){
    let clients = this.loadAllClients();
    let client = clients.find(c => c.identification == identification);
    clients.splice(clients.indexOf(client), 1);
    this.saveListInLocalStorage(clients);
  }

  /*deleteCountry2(id: String):Observable<CountryModel>{
    this.loadAllCountries2().subscribe(data => {
      this.tmpList = data;
    });
    let country = this.tmpList.find(c => c.id == id);
    return this.http.delete<CountryModel>(`${this.url}/${country.id}`);
  }*/
}
