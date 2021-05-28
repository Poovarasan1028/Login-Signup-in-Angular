import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseURL1 = 'http://localhost:8080/user';

const baseURL2 = 'http://localhost:8080/usersave';

const baseURL3 = 'http://localhost:8080/position';

const baseURL4 = 'http://localhost:8080/login';

const baseURL5 = 'http://localhost:8080/logout';

const baseURL6 = 'http://localhost:8080/department';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  readAllUsers(data:any): Observable<any> {
    return this.httpClient.post(baseURL1, data);
  }

  readAllPosition(): Observable<any> {
    return this.httpClient.get(baseURL3);
  }

  readAllDepartment(): Observable<any> {
    return this.httpClient.get(baseURL6);
  }

  login(data:any): Observable<any> {
    return this.httpClient.post(baseURL4, data);
  }

  logout(data:any): Observable<any> {
    return this.httpClient.post(baseURL5, data);
  }

  createUsers(data:any): Observable<any> {
  
    return this.httpClient.post(baseURL2, data);
  }

  addDept(data:any): Observable<any> {
    return this.httpClient.post(baseURL6, data);
  }

  // update(id, data): Observable<any> {
  //   return this.httpClient.put(`${baseURL}/${id}`, data);
  // }

  // delete(id): Observable<any> {
  //   return this.httpClient.delete(`${baseURL}/${id}`);
  // }

  // deleteAll(): Observable<any> {
  //   return this.httpClient.delete(baseURL,);
  // }

  searchByName(name:any): Observable<any> {
    return this.httpClient.get(`${baseURL1}/${name}`);
  }
}
