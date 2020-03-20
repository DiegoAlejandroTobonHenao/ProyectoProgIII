import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

declare var openPlatformModalMessage: any;

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  url: String = "http://localhost:3000/api/Users";
  adminList: UserModel[] = [];

  constructor(private http: HttpClient) { }

  loadAllAdministrators(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.url}?filter={"where":{"rol":1}}`);
  }

  saveNewAdministrator(admin: UserModel): Observable<UserModel> {
    this.loadAllAdministrators().subscribe(data => { this.adminList = data });
    let exists = this.adminList.find(a => a.identification == admin.identification);
    if (!exists) {
      openPlatformModalMessage("Data stored succesfully");
      return this.http.post<UserModel>(`${this.url}`, admin,
        {
          headers: new HttpHeaders({
            "content-type": "application/json"
          })
        });
    } else {
      openPlatformModalMessage("The asesor with this identification already exists!")
    }
  }

  searchAdministrator(identification) {
    this.loadAllAdministrators().subscribe(data => { this.adminList = data });
    let administrator = this.adminList.find(a => a.identification == identification);
    return administrator;
  }

  updateAdministrator(admin: UserModel): Observable<UserModel> {
    this.loadAllAdministrators().subscribe(data => {
      this.adminList = data;
    });
    let exists = this.adminList.filter(a => a.identification == admin.identification).length == 0;
    if (!exists) {
      let tmp = this.adminList.find(a => a.identification == admin.identification);
      openPlatformModalMessage("Data stored successfully");
      return this.http.put<UserModel>(`${this.url}/${tmp.id}`, {
        identification: admin.identification,
        firstName: admin.firstName,
        lastName: admin.lastName,
        rol: admin.rol,
        address: admin.address,
        phone: admin.phone,
        password: admin.password,
        birthDate: admin.birthDate,
        email: admin.email,
        secretKey: admin.secretKey
      },
        {
          headers: new HttpHeaders({
            "content-type": "application/json"
          })
        });
    } else {
      openPlatformModalMessage("The asesor with this identification does not exist");
    }
  }

  deleteAdministrator(identification): Observable<UserModel> {
    this.loadAllAdministrators().subscribe(data => { this.adminList = data });
    let administrator = this.adminList.find(a => a.identification == identification);
    return this.http.delete<UserModel>(`${this.url}/${administrator.id}`)
  }
}
