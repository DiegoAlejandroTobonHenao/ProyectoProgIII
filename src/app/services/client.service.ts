import { Injectable } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

declare var openPlatformModalMessage: any;

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  url: String = "http://localhost:3000/api/Users";
  clientList: UserModel[] = [];

  constructor(private http: HttpClient) { }

  loadAllClients(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.url}?filter={"where":{"rol":3}}`);
  }

  saveNewClient(client: UserModel): Observable<UserModel> {
    this.loadAllClients().subscribe(data => { this.clientList = data });
    let exists = this.clientList.find(c => c.identification == client.identification);
    if (!exists) {
      openPlatformModalMessage("Data stored succesfully");
      return this.http.post<UserModel>(`${this.url}`, {
        identification: client.identification,
        firstName: client.firstName,
        lastName: client.lastName,
        address: client.address,
        phone: client.phone,
        email: client.email,
        password: client.password,
        rol: client.rol,
        birthDate: client.birthDate
      },
        {
          headers: new HttpHeaders({
            "content-type": "application/json"
          })
        });
    } else {
      openPlatformModalMessage("The client with this identification already exists!")
    }
  }

  searchClient(identification) {
    this.loadAllClients().subscribe(data => {  
      setTimeout(() => {
        this.clientList = data
      }, 500)
    });
    let client = this.clientList.find(c => c.identification == identification);
    console.log(client);
    return client;
  }

  searchClient2(identification, email){
    this.loadAllClients().subscribe(data => {  
      setTimeout(() => {
        this.clientList = data
      }, 500)
    });
    let client = this.clientList.find(c => c.identification == identification || c.email == email);
    return client != null;
  }

  updateClient(client: UserModel): Observable<UserModel> {
    this.loadAllClients().subscribe(data => {
      this.clientList = data;
    });
    let exists = this.clientList.filter(c => c.identification == client.identification).length == 0;
    if (!exists) {
      let tmp = this.clientList.find(c => c.identification == client.identification);
      openPlatformModalMessage("Data stored successfully");
      return this.http.put<UserModel>(`${this.url}/${tmp.id}`, {
        identification: client.identification,
        realm: client.firstName,
        lastName: client.lastName,
        rol: client.rol,
        address: client.address,
        phone: client.phone,
        password: client.password,
        birthDate: client.birthDate,
        email: client.email
      },
        {
          headers: new HttpHeaders({
            "content-type": "application/json"
          })
        });
    } else {
      openPlatformModalMessage("The client with this identification does not exist");
    }
  }

  deleteClient(identification: String): Observable<UserModel> {
    this.loadAllClients().subscribe(data => { this.clientList = data });
    let client = this.clientList.find(c => c.id == identification);
    return this.http.delete<UserModel>(`${this.url}/${client.id}`)
  }
}
