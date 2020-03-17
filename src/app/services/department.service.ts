import { Injectable } from '@angular/core';
import { DepartmentModel } from 'src/app/models/department.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

declare var openPlatformModalMessage: any;

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  url: String = "http://localhost:3000/api/departments";
  deparmentList: DepartmentModel[] = [];

  constructor(private http: HttpClient) { }

  loadAllDepartments():Observable<DepartmentModel[]>{
    return this.http.get<DepartmentModel[]>(`${this.url}`);
  }

  loadAllDepartmentsByCountry(countryId){
    this.loadAllDepartments().subscribe(data => {this.deparmentList = data});
    return this.deparmentList.filter(d => d._countryId == countryId);
  }

  saveNewDepartment(department: DepartmentModel):Observable<DepartmentModel>{
    this.loadAllDepartments().subscribe(data => {this.deparmentList = data});
    let exists = this.deparmentList.filter(d => d.code == department.code).length > 0;
    if (!exists){
      openPlatformModalMessage("Data stored succesfully");
      return this.http.post<DepartmentModel>(`${this.url}`, department,
      {
        headers: new HttpHeaders({
          "content-type" : "application/json"
        })
      });
    }else {
      openPlatformModalMessage("The department with this code already exists!")
    }
  }

  searchDepartment(code: String){
    this.loadAllDepartments().subscribe(data => {this.deparmentList = data});
    let department = this.deparmentList.find(d => d.code == code);
    return department;
  }

  updateDepartment(department: DepartmentModel):Observable<DepartmentModel>{
    this.loadAllDepartments().subscribe(data => {
      this.deparmentList = data;
    });
    let exists = this.deparmentList.filter(d => d.code == department.code).length == 0;
    if (!exists){
      let tmp = this.deparmentList.find(d => d.code == department.code);
      openPlatformModalMessage("Data stored successfully");
      return this.http.put<DepartmentModel>(`${this.url}/${tmp.id}`, {
        code: department.code,
        name: department.name,
        _countryId: department._countryId
      }, 
      {
        headers: new HttpHeaders({
          "content-type": "application/json"
        })
      });
    }else {
      openPlatformModalMessage("The department with this code does not exist");
    }
  }

  deleteDepartment(code: String):Observable<DepartmentModel>{
    this.loadAllDepartments().subscribe(data => {this.deparmentList = data});
    let department = this.deparmentList.find(d => d.id == code);
    return this.http.delete<DepartmentModel>(`${this.url}/${department.id}`)
  }
}
