import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import UserInterface from '../interfaces/user.interface';
import jwt_decode from "jwt-decode";
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _sb: MatSnackBar,
    public _r: Router,
    public _server: ServerService
  ) { }

  public loggedUser: UserInterface = {
    isLoggedIn: false
  }

  logout() {
    this.loggedUser = {
      isLoggedIn: false
    }
    this._server.logout("device").subscribe(
      res => console.log("res"),
      err => console.log("err"),
    )
    // delete token from local storage
    localStorage.at = ""
    localStorage.rt = ""
    // redirect user to login page
    this._r.navigateByUrl('/login')
    // snackbar => notify user 
    this.openSnackbar("logout successfully")
  }

  public openSnackbar(msg) {
    this._sb.open(msg, "", {
      duration: 2500,
      verticalPosition: 'top'
    })
  }
  
  public decode(token) {
    const decoded: any = jwt_decode(token)
    console.log(decoded)
    if (Date.now() / 1000 < decoded.exp) {
      // this.loggedUser.id = decoded.user.id
      // this.loggedUser.username = decoded.user.username
      // this.loggedUser.isAdmin = decoded.user.isAdmin
      this.loggedUser.isLoggedIn = true
      this.loggedUser=decoded.user
      console.log(this.loggedUser)
      // redirect to main page
      this._r.navigateByUrl("/main/inbox")
    }
  }
}
