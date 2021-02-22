import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(
    private http: HttpClient
  ) { }

  login(body) {
    return this.http.post('http://localhost:1000/login', body, {
      headers: { 'Content-Type': 'application/json' }
    })
    // fetch('url',{
    //   headers: { 'Content-Type': 'application/json' },
    //   method:"post",
    //   body:JSON.stringify(buddy)
    // })
  }

  regiser(body) {
    return this.http.post('http://localhost:1000/signup', body, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  secret() {
    return this.http.get('http://localhost:1001/secret', {
      headers: { 'Authorization': localStorage.at }
    })
  }

  logout(type) {
    return this.http.get(`http://localhost:1000/logout?rt=${localStorage.rt}&type=${type}`)
  }
}
