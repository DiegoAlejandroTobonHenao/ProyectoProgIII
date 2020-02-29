import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  userInfo = new BehaviorSubject<UserModel>(new UserModel());

  constructor() {
    this.verifyUserInSession();
  }

  verifyUserInSession(){
    let session = localStorage.getItem("activeUser");
    if (session != undefined){
      this.userInfo.next(JSON.parse(session));
    }
  }

  getUserInfo(){
    return this.userInfo.asObservable();
  }

  saveNewPerson(person: UserModel){
    try {
      let currentRecords = this.loadAllPeople();
      let exists = currentRecords.filter(p => p.identification == person.identification).length > 0;
      if (!exists){
        currentRecords.push(person);
        this.saveListInLocalStorage(currentRecords);
        return 1;
      }else {
        return 2;
      }
    }catch(error){
      return 3;
    }
  }

  loadAllPeople(){
    let tb_user = JSON.parse(localStorage.getItem("tb_users"));
    if (tb_user != undefined && tb_user != null){
      return tb_user;
    }else{
      return [];
    }
  }

  saveListInLocalStorage(list){
    localStorage.setItem("tb_users", JSON.stringify(list));
  }

  loginUser(username: String, pass: String){
    let tb_user = JSON.parse(localStorage.getItem("tb_users"));
    let user = tb_user.find(u => u.email == username && u.password == pass);
    if (user != undefined){
      user.isLogged = true;
      this.userInfo.next(user);
      localStorage.setItem("activeUser", JSON.stringify(user));
    }
    return user;
  }

  loginClient(username: String, pass: String){
    let tb_client = JSON.parse(localStorage.getItem("tb_clients"));
    let client = tb_client.find(u => u.email == username && u.password == pass);
    if (client != undefined){
      client.isLogged = true;
      this.userInfo.next(client);
      localStorage.setItem("activeUser", JSON.stringify(client));
    }
    return client;
  }

  isActiveSession(){
    return this.userInfo.getValue().isLogged;
  }

  logoutUser(){
    localStorage.removeItem("activeUser");
    this.userInfo.next(new UserModel);
  }
}

