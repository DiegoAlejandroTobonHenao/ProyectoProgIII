import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'src/app/services/security.service';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userInfo: UserModel;
  userLogged: boolean = false;
  userName: String;

  subscription: Subscription;

  constructor(private secService: SecurityService) { }

  ngOnInit() {
    this.verifyUserSession();
  }

  verifyUserSession(){
    this.subscription = this.secService.getUserInfo().subscribe(user =>{
      this.userInfo = user;
      this.updateInfo();
    });
  }

  updateInfo(){
    let msg = "In session: ";
    this.userLogged = this.userInfo.isLogged;
    this.userName = `${msg} ${this.userInfo.firstName} ${this.userInfo.lastName}`;
  }

}
