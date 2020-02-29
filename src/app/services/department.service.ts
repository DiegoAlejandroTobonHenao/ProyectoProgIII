import { Injectable } from '@angular/core';
import { DepartmentModel } from 'src/app/models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor() { }

  loadAllDepartments(){
    let tb_department = JSON.parse(localStorage.getItem("tb_departments"));
    if (tb_department != undefined && tb_department != null){
      return tb_department;
    }else{
      return [];
    }
  }

  loadAllDepartmentsByCountry(countryId){
    let tb_department = JSON.parse(localStorage.getItem("tb_departments"));
    if (tb_department != undefined && tb_department!= null){
      return tb_department.filter(d => d.countryId == countryId);
    }else {
      return [];
    }
  }

  saveNewDepartment(department: DepartmentModel){
    try {
      let currentRecords = this.loadAllDepartments();
      let exists = currentRecords.filter(d => d.code == department.code).length > 0;
      if (!exists){
        currentRecords.push(department);
        this.saveListInLocalStorage(currentRecords);
        return 1;
      }else {
        return 2;
      }
    }catch(error){
      return 3;
    }
  }

  searchDepartment(code: String){
    let departments = this.loadAllDepartments();
    let department = departments.find(d => d.code == code);
    return department;
  }

  updateDepartment(department: DepartmentModel){
    try {
      let departments = this.loadAllDepartments();
      let exists = departments.filter(d => d.code == department.code).length == 0;
      if (!exists){
        let d = departments.find(d => d.code == department.code);
        departments.splice(departments.indexOf(d), 1, department);
        this.saveListInLocalStorage(department);
        return 1;
      }else {
        return 2;
      }
    }catch (error){
      return 3;
    }
  }

  saveListInLocalStorage(list){
    localStorage.setItem("tb_departments", JSON.stringify(list));
  }

  deleteDepartment(code: String){
    let departments = this.loadAllDepartments();
    let department = departments.find(d => d.code == code);
    departments.splice(departments.indexOf(department), 1);
    this.saveListInLocalStorage(departments);
  }
}
