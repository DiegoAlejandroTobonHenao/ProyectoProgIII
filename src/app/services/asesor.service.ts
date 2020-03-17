import { Injectable } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

declare var openPlatformModalMessage: any;

@Injectable({
  providedIn: 'root'
})
export class AsesorService {

  url: String = "http://localhost:3000/api/Users";
  asesorList: UserModel[] = [];

  constructor(private http: HttpClient) { }

  loadAllAsesors(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.url}?filter={"where":{"rol":2}}`);
  }

  saveNewAsesor(asesor: UserModel): Observable<UserModel> {
    this.loadAllAsesors().subscribe(data => { this.asesorList = data });
    let exists = this.asesorList.find(a => a.identification == asesor.identification);
    if (!exists) {
      openPlatformModalMessage("Data stored succesfully");
      return this.http.post<UserModel>(`${this.url}`, asesor,
        {
          headers: new HttpHeaders({
            "content-type": "application/json"
          })
        });
    } else {
      openPlatformModalMessage("The asesor with this identification already exists!")
    }
  }

  searchAsesor(identification) {
    this.loadAllAsesors().subscribe(data => { this.asesorList = data });
    let asesor = this.asesorList.find(a => a.identification == identification);
    return asesor;
  }

  searchAsesor2(identification, email){
    this.loadAllAsesors().subscribe(data => {  
      setTimeout(() => {
        this.asesorList = data
      }, 500)
    });
    let asesor = this.asesorList.find(a => a.identification == identification || a.email == email);
    return asesor;
  }

  updateAsesor(asesor: UserModel): Observable<UserModel> {
    this.loadAllAsesors().subscribe(data => {
      this.asesorList = data;
    });
    let exists = this.asesorList.filter(a => a.identification == asesor.identification).length == 0;
    if (!exists) {
      let tmp = this.asesorList.find(a => a.identification == asesor.identification);
      openPlatformModalMessage("Data stored successfully");
      return this.http.put<UserModel>(`${this.url}/${tmp.id}`, {
        identification: asesor.identification,
        firstName: asesor.firstName,
        lastName: asesor.lastName,
        rol: asesor.rol,
        address: asesor.address,
        phone: asesor.phone,
        password: asesor.password,
        birthDate: asesor.birthDate,
        email: asesor.email
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

  deleteAsesor(identification: String): Observable<UserModel> {
    this.loadAllAsesors().subscribe(data => { this.asesorList = data });
    let asesor = this.asesorList.find(a => a.id == identification);
    return this.http.delete<UserModel>(`${this.url}/${asesor.id}`)
  }
}
