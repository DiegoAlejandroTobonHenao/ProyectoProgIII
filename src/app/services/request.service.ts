import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestModel } from '../models/request.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  url: String = "http://localhost:3000/api/requests";
  requestList: RequestModel[];

  constructor(private http: HttpClient) { }

  loadRequests():Observable<RequestModel[]>{
    return this.http.get<RequestModel[]>(`${this.url}`);
  }

  loadRequestsByClient(id):Observable<RequestModel[]>{
    return this.http.get<RequestModel[]>(`${this.url}?filter={"where":{"clientCode":${id}}}`)
  }

  loadRequestByAdvisor(id):Observable<RequestModel[]>{
    return this.http.get<RequestModel[]>(`${this.url}?filter={"where":{"asesorCode":${id}}}`)
  }

  saveRequest(request: RequestModel):Observable<RequestModel>{
    return this.http.post<RequestModel>(`${this.url}`, request, 
    {
      headers: new HttpHeaders({
        "content-type": "application/json"
      })
    })
  }

  updateRequest(request: RequestModel):Observable<RequestModel>{
    return this.http.put<RequestModel>(`${this.url}/${request.id}`, 
    {
      address: request.address,
      dateRequest: request.dateRequest,
      propertyType: request.propertyType,
      status: request.status,
      image: request.image,
      comments: request.comments,
      clientCode: request.clientCode,
      asesorCode: request.asesorCode,
      price: request.price
    },
    {
      headers: new HttpHeaders({
        "content-type": "application/json"
      })
    })
  }

  deleteRequest(id):Observable<RequestModel>{
    this.loadRequests().subscribe(data => {this.requestList = data});
    let request = this.requestList.find(r => r.id == id);
    return this.http.delete<RequestModel>(`${this.url}/${request.id}`);
  }
}
