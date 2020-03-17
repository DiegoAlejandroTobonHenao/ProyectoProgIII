import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionModel } from '../models/session.model';
import * as CryptoJS from 'crypto-js';
import { EmailModel } from '../models/email.model';
import { VerifyEmail } from '../models/verifyEmail.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  url: String = "http://localhost:3000/api/Users";
  userInfo = new BehaviorSubject<UserModel>(new UserModel());
  sessionInfo = new BehaviorSubject<SessionModel>(new SessionModel());

  tokenFromUI: String = "0123456789123456";

  constructor(private http: HttpClient) {
    this.verifyUserInSession();
  }

  verifyUserInSession() {
    let session = localStorage.getItem("activeUser");
    if (session != undefined) {
      this.userInfo.next(JSON.parse(session));
    }
  }

  getUserInfo() {
    return this.userInfo.asObservable();
  }

  getSessionInfo() {
    return this.sessionInfo.asObservable();
  }

  loginUser(username: String, pass: String): Observable<SessionModel> {
    return this.http.post<SessionModel>(`${this.url}/login?include=User`, {
      email: username,
      password: pass
    },
      {
        headers: new HttpHeaders({
          "content-type": "application/json"
        })
      });
  }

  saveLoginInfo(data: SessionModel) {
    data.user.isLogged = true;
    this.sessionInfo.next(data);
    this.userInfo.next(data.user);
    localStorage.setItem("accessToken", JSON.stringify(data.id))
    localStorage.setItem("activeUser", JSON.stringify(data.user));
  }

  isActiveSession() {
    return this.userInfo.getValue().isLogged;
  }

  logoutUser(token: String): Observable<SessionModel> {
    localStorage.removeItem("activeUser");
    localStorage.removeItem("accessToken");
    this.sessionInfo.next(new SessionModel);
    this.userInfo.next(new UserModel);
    return this.http.post<SessionModel>(`${this.url}/logout?access_token=${token}`, {
      headers: new HttpHeaders({
        "content-type": "application/json"
      })
    });
  }

  encrypt(password: String) {
    let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(password), _key, {
      keySize: 16,
      iv: _iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString();
    console.log(encrypted);
    return encrypted;
  }

  loadUser(email):Observable<UserModel>{
    return this.http.get<UserModel>(`${this.url}?filter={"where":{"email":${email}}}`)
  }

  getUserByEmail(email){
    let user: UserModel;
    this.loadUser(email).subscribe(data => {user = data});
    return user;
  }

  verifyEmail(email, userId, token):Observable<VerifyEmail>{
    return this.http.get<VerifyEmail>(`${this.url}/sendEmailVerification?email=${email}&userId=${userId}&token=${token}`)
  }

  sendEmail(email, subject, message):Observable<EmailModel> {
    return this.http.get<EmailModel>(`${this.url}/sendEmail?emailAddresses=${email}&subject=${subject}&message=${message}`)
  }

  generateToken() {
    return Math.random().toString(36).substr(2); // Eliminar `0.`
  };

  /*decrypt(encryptedPass: String) {
    let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);

    let decrypted = CryptoJS.AES.decrypt(
      encryptedPass, _key, {
      keySize: 16,
      iv: _iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);
    console.log(decrypted);
    return decrypted;
  }*/
}

